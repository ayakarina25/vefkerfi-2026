'use strict';

const loadingMessage = document.querySelector('#loading');
const errorMessage = document.querySelector('#error');
const detailsCard = document.querySelector('#game-details');
const titleElement = document.querySelector('#game-title');
const descriptionElement = document.querySelector('#game-description');
const gameFields = document.querySelector('#game-fields');
const imageFields = document.querySelector('#image-fields');
const imageElement = document.querySelector('#game-image');
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

function displayImage(imagePath, altText) {
  imageElement.className = 'game-image image-placeholder';
  const image = document.createElement('img');
  const hasImage = displayValue(imagePath) !== 'Not available';
  image.src = hasImage ? `/${String(imagePath).replace(/^\/+/, '')}` : placeholderImage;
  image.alt = hasImage ? altText : 'No image available';
  image.setAttribute('onerror', `this.onerror=null; this.src='${placeholderImage}'; this.alt='No image available'; this.parentElement.classList.add('image-placeholder');`);
  image.addEventListener('load', () => {
    if (image.src !== placeholderImage) {
      imageElement.classList.remove('image-placeholder');
    }
  });
  imageElement.replaceChildren(image);
}

function addField(list, label, value) {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = displayValue(value);
  list.append(term, description);
}

function displayGame(game) {
  titleElement.textContent = displayValue(game.title);
  descriptionElement.textContent = displayValue(game.description);

  [
    ['Release date', game.release_date],
    ['Release year', game.release_year],
    ['Platform', game.platform_name],
    ['Developer', game.developer],
    ['Publisher', game.publisher],
    ['Rating', formatRating(game.rating_score_pct)]
  ].forEach(([label, value]) => addField(gameFields, label, value));

  [
    ['Cover image', game.cover_image_path],
    ['Screenshot', game.screenshot_path],
    ['Title screen', game.titlescreen_path]
  ].forEach(([label, value]) => addField(imageFields, label, value));

  displayImage(game.cover_image_path, `${displayValue(game.title)} cover`);

  detailsCard.hidden = false;
  loadingMessage.hidden = true;
}

async function loadGame() {
  const gameId = new URLSearchParams(window.location.search).get('id');

  if (!gameId) {
    loadingMessage.hidden = true;
    errorMessage.textContent = 'No game was selected.';
    errorMessage.hidden = false;
    return;
  }

  try {
    const response = await fetch(`/api/games/${encodeURIComponent(gameId)}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const game = await response.json();
    displayGame(game);
  } catch (error) {
    console.error('Could not load game details:', error);
    loadingMessage.hidden = true;
    errorMessage.hidden = false;
  }
}

loadGame();
