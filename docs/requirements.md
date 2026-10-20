# Requirements

## Purpose
The project is a website for searching, filtering, and exploring a collection of retro and classic games.

## Primary user
Users who are not familiar with the dataset and want to explore retro and classic games.

## Problem
Users need an easy way to search, filter, and explore a collection of retro and classic games without being overwhelmed by raw data or confusing interfaces.

## Out of scope
The following features are not required for the MVP:
- User accounts or authentication
- Favorites, wishlists, or saved searches
- User-submitted ratings or reviews
- Social or multiplayer features
- Machine-learning recommendations
- Editing or correcting the source dataset
- ROM downloads
- An emulator or game launcher
- Automatic collection of external metadata
- A native mobile application
- Advanced analytics dashboards

## Functional requirements
    FR-01: The system displays all games from the dataset in a single collection view.
    FR-02: The system displays each game as a card showing title, platform, genre, release year, and rating.
    FR-03: The system displays the total number of games in the collection.
    FR-04: The user can search for a game by title, and the system shows only the games whose titles match the search text.
    FR-05: The system performs the title search without case sensitivity.
    FR-06: The user can filter the collection by platform, genre, release year, developer, and rating, using one filter or several filters together.
    FR-07: The user can select a game card to open a details view showing title, description, release date, platform, developer, publisher, rating, and image.
    FR-08: The system displays `Not available` in place of any missing field value without breaking the page.

### Collection overview
- The website must display the available game collection.
- Each game must be represented with a clear card or list item.
- The overview must show useful summary information, such as the total number of games.

### Search
- Users must be able to search for games by title.
- Search results must update to show only matching games.
- Search should not be case-sensitive.
- The website should display a clear message when no games match the search.

### Filtering
Users must be able to filter games by:
- Platform
- Genre
- Release year
- Developer
- Rating

Filters should be usable individually or together.

### Game information
Each game card should display relevant information, including:
- Title
- Platform
- Genre
- Release year
- Rating

### Game details
Users must be able to select a game and view a details page or details panel containing:
- Title
- Description
- Release date and year
- Platform
- Developer
- Publisher
- Rating
- Available image information

### Missing data
- Missing values must be displayed clearly, for example as `Not available`.
- Missing data must not cause the page to break.
- Image paths that are unavailable must not produce broken or confusing UI.

### Data requirements
- The project must use `games_master_dataset.json` as its main game data source.
- The application must not modify the original dataset.
- The application should use the existing dataset fields, including `game_id`, `title`, `platform_name`, `genre_category`, `release_year`, `developer`, `publisher`, and `rating_score_pct`.
- Duplicate `game_id` values should be handled consistently so that duplicate records do not create confusing results.

## Non-functional requirements
    NFR-01 (Performance): The system shows search and filter results - within 2 seconds when the user applies a search term or a filter.

    NFR-02 (Accessibility): All game images include alternative text (`alt`), and the user can navigate the collection and open game details using only the keyboard.

    NFR-03 (Reliability): When a field value is missing, the system displays `Not available`; when an image path is invalid, the system shows a placeholder image instead of a broken icon.

    NFR-04 (Responsive design): The interface adapts to desktop and smaller screens, and remains readable and usable at widths down to 360 pixels.

### Usability requirements
- The interface must be easy to understand for users who are not familiar with the dataset.
- Navigation between the collection and game details must be clear.
- Users must be able to reset or remove filters.
- Results should remain readable when many games match the selected criteria.
- The interface should work on desktop and smaller screens.

### Technical requirements
- The project should use the technologies approved for the course or project.
- The application must load and process the supplied dataset reliably.
- Errors while loading the dataset must be surfaced clearly.
- The application should avoid unnecessary external dependencies.
- The project must not download, host, or provide access to copyrighted ROM files.

## User stories
- As a user, I want to open the collection and see games so that I can browse the available titles.
- As a user, I want to search by title so that I can find a specific game quickly.
- As a user, I want to apply and clear filters so that I can narrow down the collection by platform, genre, year, developer, or rating.
- As a user, I want to open a game and view its details so that I can learn more about it.
- As a user, I want missing values to be handled gracefully so that the interface does not break.

## Open questions
- How should duplicate `game_id` values be handled specifically (e.g., merge, ignore, or display warning)?
- What is the preferred method for displaying images if the path is unavailable (e.g., placeholder icon, hide section)?
- Are there specific technologies mandated for the course/project that must be used?

## Acceptance criteria

### User story 1: Browse the collection
- PASS/FAIL: The user opens the site and sees a list of game cards.
- PASS/FAIL: Each card displays title, platform, genre, release year, and rating.
- PASS/FAIL: The total number of games is displayed above the list.
 Browse the collection
- PASS/FAIL: When the user opens the collection, the system displays one game card 
  for each unique game_id.


### User story 2: Search by title
- PASS/FAIL: The user types "Mario" in the search box and sees only games whose title contains "Mario".
- PASS/FAIL: The search ignores uppercase and lowercase letters.
- PASS/FAIL: When no game matches, the text "No games match your search" is displayed.

### User story 3: Apply and clear filters
- PASS/FAIL: The user selects "Nintendo" as platform and sees only Nintendo games.
- PASS/FAIL: The user selects "Nintendo" and "Action" together and sees only games matching both.
- PASS/FAIL: The user clicks "Clear filters" and the full collection is shown again.
- PASS/FAIL: When no game matches, the text "No games match your filters" is displayed.

### User story 4: View game details
- PASS/FAIL: The user clicks a game card and a details view opens.
- PASS/FAIL: The details view shows title, description, release date, platform, developer, publisher, rating, and image.
- PASS/FAIL: The user can return to the collection view.

### User story 5: Handle missing values
- PASS/FAIL: When a field is missing, the text "Not available" is displayed in its place.
- PASS/FAIL: When an image path is invalid, a placeholder image is displayed instead of a broken icon.
- PASS/FAIL: The page does not crash or show an error when data is missing.


