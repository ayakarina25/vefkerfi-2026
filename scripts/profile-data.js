#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

function findDatasetPath() {
  const rootDir = path.resolve(__dirname, '..');
  const candidates = [
    path.join(rootDir, '00', 'games_master_dataset.json'),
    path.join(rootDir, '00_GOGN_OG_SKILGREININGAR', 'games_master_dataset.json')
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('Could not find games_master_dataset.json. Expected it in 00/ or 00_GOGN_OG_SKILGREININGAR/.');
}

function formatCount(value) {
  return Number.isInteger(value) ? value.toLocaleString() : Number(value).toLocaleString();
}

function summarizeTopValues(data, field, limit = 5) {
  const counts = new Map();

  for (const item of data) {
    const value = item[field];
    if (value === null || value === undefined || String(value).trim() === '') {
      continue;
    }

    const key = String(value);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function toPrettyList(items, limit = 10) {
  return items.slice(0, limit).map((item) => `${item.value} (${item.count})`).join(', ');
}

function countMissing(data) {
  const byField = new Map();
  let totalMissing = 0;

  for (const item of data) {
    for (const [field, value] of Object.entries(item)) {
      const isMissing = value === null || value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0);

      if (isMissing) {
        totalMissing += 1;
        byField.set(field, (byField.get(field) || 0) + 1);
      }
    }
  }

  return {
    totalMissing,
    byField: [...byField.entries()].sort((a, b) => b[1] - a[1])
  };
}

function getDuplicates(data) {
  const seen = new Map();

  for (const item of data) {
    const gameId = item.game_id;
    if (gameId === null || gameId === undefined || String(gameId).trim() === '') {
      continue;
    }

    if (!seen.has(gameId)) {
      seen.set(gameId, []);
    }
    seen.get(gameId).push(item.title || '(untitled)');
  }

  return [...seen.entries()]
    .filter(([, titles]) => titles.length > 1)
    .map(([gameId, titles]) => ({ gameId, count: titles.length, titles }));
}

function printSection(title) {
  console.log(`\n${title}`);
  console.log('='.repeat(title.length));
}

function main() {
  let datasetPath;

  try {
    datasetPath = findDatasetPath();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  let data;
  try {
    const raw = fs.readFileSync(datasetPath, 'utf8');
    data = JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to read/parse dataset at ${datasetPath}: ${error.message}`);
    process.exit(1);
  }

  if (!Array.isArray(data) || data.length === 0) {
    console.error('Dataset does not contain a non-empty array of games.');
    process.exit(1);
  }

  const attributeSet = new Set();
  for (const item of data) {
    for (const key of Object.keys(item)) {
      attributeSet.add(key);
    }
  }

  const totalGames = data.length;
  const totalAttributes = attributeSet.size;
  const missing = countMissing(data);
  const duplicates = getDuplicates(data);

  const years = data
    .map((item) => Number(item.release_year))
    .filter((value) => Number.isFinite(value));

  const oldestYear = Math.min(...years);
  const newestYear = Math.max(...years);

  const ratings = data
    .map((item) => Number(item.rating_score_pct))
    .filter((value) => Number.isFinite(value));

  const highestRating = Math.max(...ratings);
  const lowestRating = Math.min(...ratings);

  const highestRatingGame = data.find((item) => Number(item.rating_score_pct) === highestRating);
  const lowestRatingGame = data.find((item) => Number(item.rating_score_pct) === lowestRating);

  const platformCounts = new Map();
  for (const item of data) {
    const platform = item.platform_name || item.platform_key || 'Unknown';
    platformCounts.set(platform, (platformCounts.get(platform) || 0) + 1);
  }

  const orderedPlatforms = [...platformCounts.entries()].sort((a, b) => b[1] - a[1]);

  const topPlatformValues = summarizeTopValues(data, 'platform_name');
  const topGenreValues = summarizeTopValues(data, 'genre_category');
  const topDeveloperValues = summarizeTopValues(data, 'developer');
  const topPublisherValues = summarizeTopValues(data, 'publisher');

  const releaseYearMismatch = data.filter((item) => {
    const year = Number(item.release_year);
    const dateYear = Number(String(item.release_date || '').slice(0, 4));
    return Number.isFinite(year) && Number.isFinite(dateYear) && year !== dateYear;
  });

  console.log('Game dataset profile');
  console.log(`Source: ${datasetPath}`);
  console.log(`Games analyzed: ${formatCount(totalGames)}`);

  printSection('Overview');
  console.log(`Number of games: ${formatCount(totalGames)}`);
  console.log(`Number of attributes: ${formatCount(totalAttributes)}`);
  console.log(`Missing data: ${formatCount(missing.totalMissing)} values`);
  console.log(`Duplicate game_id entries: ${formatCount(duplicates.length)}`);

  printSection('Missing data');
  if (missing.byField.length === 0) {
    console.log('No missing values found.');
  } else {
    for (const [field, count] of missing.byField.slice(0, 10)) {
      console.log(`${field}: ${formatCount(count)}`);
    }
  }

  printSection('Duplicate game_id entries');
  if (duplicates.length === 0) {
    console.log('No duplicate game_id values found.');
  } else {
    for (const duplicate of duplicates.slice(0, 10)) {
      console.log(`${duplicate.gameId}: ${formatCount(duplicate.count)} entries`);
      console.log(`  Titles: ${duplicate.titles.slice(0, 5).join(', ')}`);
    }
  }

  printSection('Most frequent values');
  console.log(`platform_name: ${toPrettyList(topPlatformValues)}`);
  console.log(`genre_category: ${toPrettyList(topGenreValues)}`);
  console.log(`developer: ${toPrettyList(topDeveloperValues)}`);
  console.log(`publisher: ${toPrettyList(topPublisherValues)}`);

  printSection('Distribution by platform');
  for (const [platform, count] of orderedPlatforms.slice(0, 15)) {
    console.log(`${platform}: ${formatCount(count)}`);
  }

  printSection('Oldest and newest years');
  console.log(`Oldest year: ${oldestYear}`);
  console.log(`Newest year: ${newestYear}`);

  printSection('Highest and lowest ratings');
  console.log(`Highest rating_score_pct: ${highestRating}% (${highestRatingGame ? highestRatingGame.title : 'unknown'})`);
  console.log(`Lowest rating_score_pct: ${lowestRating}% (${lowestRatingGame ? lowestRatingGame.title : 'unknown'})`);

  printSection('Consistency check');
  console.log(`release_year matches release_date year: ${releaseYearMismatch.length === 0 ? 'PASS' : 'FAIL'}`);
  if (releaseYearMismatch.length > 0) {
    console.log(`Mismatches found: ${formatCount(releaseYearMismatch.length)}`);
    for (const item of releaseYearMismatch.slice(0, 5)) {
      console.log(`  ${item.title || item.game_id}: release_year=${item.release_year}, release_date=${item.release_date}`);
    }
  }
}

main();
