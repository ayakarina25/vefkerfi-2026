'use strict';

const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;
const databasePath = path.join(__dirname, 'db', 'database.sqlite');
const publicPath = path.join(__dirname, 'public');

function all(database, sql, parameters = []) {
  return new Promise((resolve, reject) => {
    database.all(sql, parameters, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

function get(database, sql, parameters = []) {
  return new Promise((resolve, reject) => {
    database.get(sql, parameters, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
}

app.use(express.static(publicPath));

app.get('/api/games', async (request, response) => {
  const database = new sqlite3.Database(databasePath, sqlite3.OPEN_READONLY, (error) => {
    if (error) {
      console.error(`Failed to open database: ${error.message}`);
      response.status(500).json({ error: 'Unable to load games.' });
    }
  });

  try {
    const games = await all(
      database,
      `
        SELECT game_id, title, platform_name, genre_category, release_year, rating_score_pct
        FROM GAME
        ORDER BY rowid
      `
    );
    response.json(games);
  } catch (error) {
    console.error(`Failed to query games: ${error.message}`);
    response.status(500).json({ error: 'Unable to load games.' });
  } finally {
    database.close((error) => {
      if (error) {
        console.error(`Failed to close database: ${error.message}`);
      }
    });
  }
});

app.get('/api/games/:id', async (request, response) => {
  const database = new sqlite3.Database(databasePath, sqlite3.OPEN_READONLY, (error) => {
    if (error) {
      console.error(`Failed to open database: ${error.message}`);
      response.status(500).json({ error: 'Unable to load game details.' });
    }
  });

  try {
    const game = await get(
      database,
      `
        SELECT
          game_id,
          title,
          description,
          release_date,
          release_year,
          platform_name,
          developer,
          publisher,
          rating_score_pct,
          cover_image_path,
          screenshot_path,
          titlescreen_path
        FROM GAME
        WHERE game_id = ?
      `,
      [request.params.id]
    );

    if (!game) {
      response.status(404).json({ error: 'Game not found.' });
      return;
    }

    response.json(game);
  } catch (error) {
    console.error(`Failed to query game details: ${error.message}`);
    response.status(500).json({ error: 'Unable to load game details.' });
  } finally {
    database.close((error) => {
      if (error) {
        console.error(`Failed to close database: ${error.message}`);
      }
    });
  }
});

app.get(/.*/, (request, response) => {
  response.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
