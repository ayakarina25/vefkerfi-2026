'use strict';

const collectionCount = document.querySelector('#collection-count');
const loadingMessage = document.querySelector('#loading');
const errorMessage = document.querySelector('#error');
const searchInput = document.querySelector('#search-input');
const noSearchResultsMessage = document.querySelector('#no-search-results');
const noFilterResultsMessage = document.querySelector('#no-filter-results');
const gameList = document.querySelector('#game-list');
const clearFiltersButton = document.querySelector('#clear-filters');
const filterElements = {
  platform: document.querySelector('#platform-filter'),
  genre: document.querySelector('#genre-filter'),
  year: document.querySelector('#year-filter'),
  developer: document.querySelector('#developer-filter'),
  rating: document.querySelector('#rating-filter')
};
const missingValue = '__missing__';
let allGames = [];
const placeholderImage = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">' +
  '<rect width="640" height="360" fill="#e2e8f0"/>' +
  '<text x="320" y="185" text-anchor="middle" fill="#475569" font-family="Arial" font-size="28">No image available</text>' +
  '</svg>'
)}`;

function displayValue(value) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return 'Not available';
  }
  return String(value);
}

function formatRating(value) {
  const formattedValue = displayValue(value);
  return formattedValue === 'Not available' ? formattedValue : `${formattedValue}%`;
}

function createImageDisplay(imagePath, altText) {
  const imageContainer = document.createElement('div');
  imageContainer.className = 'game-image image-placeholder';
  const image = document.createElement('img');
  const hasImage = displayValue(imagePath) !== 'Not available';
  image.src = hasImage ? `/${String(imagePath).replace(/^\/+/, '')}` : placeholderImage;
  image.alt = hasImage ? altText : 'No image available';
  image.setAttribute('onerror', `this.onerror=null; this.src='${placeholderImage}'; this.alt='No image available'; this.parentElement.classList.add('image-placeholder');`);
  image.addEventListener('load', () => {
    if (image.src !== placeholderImage) {
      imageContainer.classList.remove('image-placeholder');
    }
  });
  imageContainer.replaceChildren(image);
  return imageContainer;
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

  card.appendChild(createImageDisplay(game.cover_image_path, `${displayValue(game.title)} cover`));

  const title = document.createElement('h2');
  title.textContent = displayValue(game.title);
  card.appendChild(title);

  const details = document.createElement('dl');
  const fields = [
    ['Platform', game.platform_name],
    ['Genre', game.genre_category],
    ['Year', game.release_year],
    ['Rating', formatRating(game.rating_score_pct)]
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

function hasActiveFilters() {
  return Object.values(filterElements).some((filter) => filter.value !== '');
}

function renderGames(games) {
  gameList.replaceChildren(...games.map(createGameCard));
  const searchIsActive = searchInput.value.trim() !== '';
  const filtersAreActive = hasActiveFilters();
  noSearchResultsMessage.hidden = games.length > 0 || !searchIsActive || filtersAreActive;
  noFilterResultsMessage.hidden = games.length > 0 || !filtersAreActive;
  collectionCount.textContent = `${games.length.toLocaleString()} games`;
}

function normalizedFilterValue(value) {
  return value === missingValue ? null : value;
}

function matchesFilterValue(gameValue, selectedValue) {
  if (selectedValue === '') {
    return true;
  }

  const normalizedGameValue = gameValue === null || gameValue === undefined ||
    String(gameValue).trim() === '' ? null : String(gameValue);
  return normalizedGameValue === normalizedFilterValue(selectedValue);
}

function populateFilter(filter, values, label) {
  const uniqueValues = [...new Set(values.map((value) => {
    if (value === null || value === undefined || String(value).trim() === '') {
      return missingValue;
    }
    return String(value);
  }))];

  uniqueValues.sort((first, second) => first.localeCompare(second, undefined, {
    numeric: true,
    sensitivity: 'base'
  }));

  const fragment = document.createDocumentFragment();
  for (const value of uniqueValues) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value === missingValue ? 'Not available' : value;
    fragment.appendChild(option);
  }
  filter.appendChild(fragment);
  filter.setAttribute('aria-label', label);
}

function populateFilters(games) {
  populateFilter(filterElements.platform, games.map((game) => game.platform_name), 'Filter by platform');
  populateFilter(filterElements.genre, games.map((game) => game.genre_category), 'Filter by genre');
  populateFilter(filterElements.year, games.map((game) => game.release_year), 'Filter by release year');
  populateFilter(filterElements.developer, games.map((game) => game.developer), 'Filter by developer');

  const ratings = [...new Set(games
    .map((game) => Number(game.rating_score_pct))
    .filter((rating) => Number.isFinite(rating)))]
    .sort((first, second) => first - second);
  const ratingFragment = document.createDocumentFragment();
  for (const rating of ratings) {
    const option = document.createElement('option');
    option.value = String(rating);
    option.textContent = `${rating}% or higher`;
    ratingFragment.appendChild(option);
  }
  filterElements.rating.appendChild(ratingFragment);
}

function clearFilters() {
  Object.values(filterElements).forEach((filter) => {
    filter.value = '';
  });
  filterGames();
}

function filterGames() {
  const searchText = searchInput.value;
  const normalizedSearch = searchText.trim().toLocaleLowerCase();
  const matchingGames = allGames.filter((game) => {
    const titleMatches = normalizedSearch === '' || displayValue(game.title)
      .toLocaleLowerCase()
      .includes(normalizedSearch);
    const platformMatches = matchesFilterValue(game.platform_name, filterElements.platform.value);
    const genreMatches = matchesFilterValue(game.genre_category, filterElements.genre.value);
    const yearMatches = matchesFilterValue(game.release_year, filterElements.year.value);
    const developerMatches = matchesFilterValue(game.developer, filterElements.developer.value);
    const ratingValue = Number(game.rating_score_pct);
    const minimumRating = filterElements.rating.value;
    const ratingMatches = minimumRating === '' ||
      (Number.isFinite(ratingValue) && ratingValue >= Number(minimumRating));

    return titleMatches && platformMatches && genreMatches && yearMatches &&
      developerMatches && ratingMatches;
  });

  renderGames(matchingGames);
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

    allGames = games;
    populateFilters(allGames);
    renderGames(allGames);
    loadingMessage.hidden = true;
  } catch (error) {
    console.error('Could not load games:', error);
    loadingMessage.hidden = true;
    collectionCount.textContent = 'Collection unavailable';
    errorMessage.hidden = false;
  }
}

searchInput.addEventListener('input', (event) => {
  filterGames();
});

Object.values(filterElements).forEach((filter) => {
  filter.addEventListener('change', filterGames);
});

clearFiltersButton.addEventListener('click', clearFilters);

loadGames();
