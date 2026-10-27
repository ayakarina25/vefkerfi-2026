'use strict';

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const projectRoot = path.resolve(__dirname, '..', '..');
const datasetPath = path.join(
  projectRoot,
  '00_GOGN_OG_SKILGREININGAR',
  'games_master_dataset.json'
);
const databasePath = path.join(__dirname, 'database.sqlite');

function readDataset() {
  let rawData;

  try {
    rawData = fs.readFileSync(datasetPath, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read dataset at ${datasetPath}: ${error.message}`);
  }

  let data;
  try {
    data = JSON.parse(rawData);
  } catch (error) {
    throw new Error(`Failed to parse dataset at ${datasetPath}: ${error.message}`);
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Dataset must contain a non-empty array of games.');
  }

  return data;
}

function uniqueGames(data) {
  const seenIds = new Set();
  const games = [];

  for (const game of data) {
    const gameId = typeof game.game_id === 'string'
      ? game.game_id.trim()
      : game.game_id;

    if (gameId === null || gameId === undefined || gameId === '') {
      throw new Error('Dataset contains a game without a valid game_id.');
    }

    if (seenIds.has(gameId)) {
      continue;
    }

    seenIds.add(gameId);
    games.push({
      game_id: gameId,
      title: game.title,
      platform_name: game.platform_name,
      genre_category: game.genre_category,
      release_year: game.release_year,
      rating_score_pct: game.rating_score_pct
    });
  }

  return games;
}

function run(database, sql, parameters = []) {
  return new Promise((resolve, reject) => {
    database.run(sql, parameters, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }
      resolve(this);
    });
  });
}

function close(database) {
  return new Promise((resolve, reject) => {
    database.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function setupDatabase() {
  const data = readDataset();
  const games = uniqueGames(data);
  const database = new sqlite3.Database(databasePath);

  try {
    await run(database, 'PRAGMA foreign_keys = ON');
    await run(database, 'DROP TABLE IF EXISTS GAME');
    await run(database, `
      CREATE TABLE GAME (
        game_id TEXT PRIMARY KEY,
        title TEXT,
        platform_name TEXT,
        genre_category TEXT,
        release_year INTEGER,
        rating_score_pct INTEGER
      )
    `);
    await run(database, 'BEGIN TRANSACTION');

    for (const game of games) {
      await run(
        database,
        `
          INSERT INTO GAME (
            game_id,
            title,
            platform_name,
            genre_category,
            release_year,
            rating_score_pct
          ) VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          game.game_id,
          game.title ?? null,
          game.platform_name ?? null,
          game.genre_category ?? null,
          game.release_year ?? null,
          game.rating_score_pct ?? null
        ]
      );
    }

    await run(database, 'COMMIT');
    console.log(`Inserted ${games.length} unique games into ${databasePath}`);
  } catch (error) {
    try {
      await run(database, 'ROLLBACK');
    } catch (rollbackError) {
      console.error(`Failed to roll back database setup: ${rollbackError.message}`);
    }
    throw new Error(`Failed to set up database: ${error.message}`);
  } finally {
    await close(database);
  }
}

setupDatabase().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
