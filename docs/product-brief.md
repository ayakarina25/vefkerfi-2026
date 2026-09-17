# Product Brief: Game Discovery and Collection Explorer

## Product goal

Create a simple website that helps retro and classic game fans search, filter, and explore a large game collection. Users should be able to find games by title, platform, genre, release year, developer, or rating and open a details view for each game.

## Data source

The product will use `games_master_dataset.json`. Relevant data includes game titles, platforms, release information, genres, developers, publishers, players, ratings, descriptions, and available image metadata.

## Minimum Viable Product (MVP)

The MVP will include:

- A collection overview showing the available games.
- A searchable game list using the game title.
- Filters for platform, genre, release year, developer, and rating.
- Game cards showing key information such as title, platform, genre, year, and rating.
- A game details view showing the description, release information, platform, developer, publisher, rating, and available images.
- Clear handling of missing values, such as displaying `Not available` instead of leaving confusing blank fields.
- A responsive and usable interface for browsing the collection.

## Main user flow

1. The user opens the website and sees an overview of the collection.
2. The user searches for a title or applies one or more filters.
3. The website displays matching games as cards.
4. The user selects a card to open the game's details.
5. The user reviews the available information and returns to the results to continue browsing.

## Outside the scope of work

The following are not part of the MVP:

- User accounts, registration, or authentication.
- Personal wishlists, favorites, or saved searches.
- Ratings or reviews submitted by users.
- Multiplayer or social features.
- A recommendation system based on machine learning.
- Editing, correcting, or adding records to the source dataset.
- Downloading ROMs or hosting copyrighted game files.
- Building an emulator or launching games from the website.
- Automatically finding missing images or other external metadata.
- A native mobile application.
- Advanced analytics dashboards beyond the basic collection browsing experience.

## Known constraints and risks

- Some records have missing ratings, release dates, descriptions, or image paths.
- Duplicate `game_id` values may cause repeated results.
- The dataset may contain inconsistent platform names or inaccurate metadata.
