# Agent test - Assignment 7

## What was built
In this assignment, I built the first vertical slice of the Game Discovery application:
- A Node.js + SQLite backend to import the JSON data.
- An Express API to serve the games.
- A Vanilla HTML/CSS/JS frontend to display the game cards, search, and filters.
- A details page.
- Handling for missing data and images.

## Issues completed
- Issue #2: Display the game collection view.
- Issue #10: Build the game details page.
- Issue #5: Implement search by title.
- Issue #7: Implement filters.
- Issue #11: Handle missing and invalid data.
- Issue #12: Add keyboard navigation and alt text.
- Issue #8: Add clear-filters control.

## How Agent was used
I used Copilot Agent to:
1. Generate the initial database setup script (`setup.js`) to read the JSON file and remove duplicate `game_id`s.
2. Create the Express server and the API endpoints.
3. Build the frontend components (HTML, CSS, JS).
4. Add features step-by-step based on GitHub issues.

## What I reviewed and tested myself
- I ran the server and opened `http://localhost:3000` to verify the page loads.
- I tested the search by typing "Mario" to ensure it returns correct results.
- I tested the filters by selecting "Nintendo" and ensuring it combines with the search.
- I tested the details page and verified missing fields show "Not available".
- I tested keyboard navigation (using Tab and Enter).

## Problems encountered and solved
1. **Missing npm script:** When I tried `npm run dev`, it failed because the Agent only created `npm start`. I fixed this by running `npm start`.
2. **Server disconnected:** The page showed `ERR_CONNECTION_REFUSED` because the server stopped. I restarted it using `node src/server.js`.
3. **Folder structure:** I noticed `.github` was inside `docs` instead of the project root, so I moved it.

## Next steps for Assignment 8
In the next assignment, I will add the remaining issues (e.g., no-results messages) and focus on CSS styling and responsive design.