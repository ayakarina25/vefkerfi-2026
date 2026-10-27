'use strict';

const collectionCount = document.querySelector('#collection-count');
const loadingMessage = document.querySelector('#loading');
const errorMessage = document.querySelector('#error');
const gameList = document.querySelector('#game-list');

function displayValue(value) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return 'Not available';
  }
  return String(value);
}

function createGameCard(game) {
  const card = document.createElement('article');
  card.className = 'game-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `View details for ${displayValue(game.title)}`);

  function openDetails() {
    window.location.href = `details.html?id=${encodeURIComponent(game.game_id)}`;
  }

  card.addEventListener('click', openDetails);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetails();
    }
  });

  const title = document.createElement('h2');
  title.textContent = displayValue(game.title);
  card.appendChild(title);

  const details = document.createElement('dl');
  const fields = [
    ['Platform', game.platform_name],
    ['Genre', game.genre_category],
    ['Year', game.release_year],
    ['Rating', game.rating_score_pct === null || game.rating_score_pct === undefined
      ? null
      : `${game.rating_score_pct}%`]
  ];

  for (const [label, value] of fields) {
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = displayValue(value);
    details.append(term, description);
  }

  card.appendChild(details);
  return card;
}

async function loadGames() {
  try {
    const response = await fetch('/api/games');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const games = await response.json();
    if (!Array.isArray(games)) {
      throw new Error('API response was not a game list');
    }

    collectionCount.textContent = `${games.length.toLocaleString()} games`;
    gameList.replaceChildren(...games.map(createGameCard));
    loadingMessage.hidden = true;
  } catch (error) {
    console.error('Could not load games:', error);
    loadingMessage.hidden = true;
    collectionCount.textContent = 'Collection unavailable';
    errorMessage.hidden = false;
  }
}

loadGames();
