# Idea Card

# main idea

## Title

**Game Discovery and Collection Explorer**

## User

People who enjoy retro and classic video games and want to discover games by platform, genre, release year, developer, or rating.

## Problem

The game data contains many titles across different platforms, but it can be difficult to browse, compare, and find relevant games quickly. This project will make the collection easier to search and explore in one clear website or app.

## Data

The project will use `games_master_dataset.json`, including:

- Game titles and unique identifiers
- Platform names and platform information
- Release dates and years
- Genres
- Developers and publishers
- Player information
- Ratings
- Descriptions
- Available image and ROM metadata

## Main Flow

1. The user opens the website and sees an overview of the game collection.
2. The user searches for a title or browses games by platform, genre, year, developer, or rating.
3. The app displays matching games as cards with key information.
4. The user selects a game to open its details page.
5. The details page shows the description, rating, release information, platform, developer, publisher, and available images.
6. The user can adjust filters or return to the collection to continue exploring.

## Risks

- Some records contain missing data, including ratings, release dates, and image paths.
- Duplicate `game_id` values may cause repeated games in search results.
- Inconsistent or historical platform names may make filtering more difficult.
- The dataset may contain incorrect release years, ratings, or metadata.
- A large number of games may require pagination or efficient search to keep the app responsive.
- Image and ROM paths may not always point to files that are available.

---

# Idea Card 2

## Title

**Party Game Matcher (Squad Picker)**

**Type:** Utility Tool / Group Decision Maker

## User

A group of 2 to 6 friends sitting together on a couch with a PlayStation or PC who want to play something fun.

## Problem

Friends often waste 30 minutes arguing about what to play. One person may want a shooter, another may want a racing game, and a third may have no preference. They need a quick way to choose a game that fits their player count and the mood of the gathering.

## Data

The idea will use:

- `players_max` to filter games that support the required number of players
- `rating_score_pct` to help ensure the selected game is well rated
- `genre_category` to offer varied options based on the group's mood

## Main Flow

1. The group sets the number of players, such as 4.
2. The group selects a mood: Competitive, Cooperative, or Anything.
3. The system filters games that support at least the selected number of players.
4. The system ranks the matching games by rating.
5. The system either picks a random game from the top 10 or displays one suggestion card per group member for voting.

## Risks

- `players_max` may be missing or set to 0 for some games, weakening the results.
- Some games may support online multiplayer but not local split-screen or couch co-op.
- The original dataset does not distinguish between online and local multiplayer, which is a significant limitation.

---

### Idea 3: "Nostalgia Time Capsule"

**Type**: Interactive Experience / Time Travel

- **User**: A person who has been playing games since childhood and wants to relive their memories, or a younger player who wants to discover the "hidden gems" from the year they were born.
- **Problem**: It's difficult to visualize "What were the best games in a specific year?" Gaming websites display long and complex lists, but there is no fun way to explore a specific year as if you're stepping into a time capsule.
- **Data**:

  - `release_year` (to target the specific year).
  - `rating_score_pct` (to sort the true gems of that year).
  - `genre_category` (to give an idea of gaming trends during that era).
  - `cover_image_path` (to display vintage covers and add a visual touch).
- **Main Flow**:

  1. The user types in a specific year (e.g., 1998) or a range of years (2000 - 2005).
  2. The system searches for games released in that specific year.
  3. Instead of showing a regular list, it displays them as a **timeline gallery** (cards arranged chronologically or by rating).
  4. The user can choose a "random year" (surprise button) to take them to an unknown year and discover its games.
  5. It displays a fun statistic, such as: "In 1998, Action games dominated with 60%" or "The most prolific developer this year was X."
- **Risks**:

  - Very old years (pre-1990) may not have sufficient data or enough ratings, leading to weak results.
  - Ratings might be based on modern standards, which could unfairly overlook classic older games.
