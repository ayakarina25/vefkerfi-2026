1. Issue title and goal
Title: Display the game collection view

Goal:
Related to FR-01 / US-01, the issue aims to load games from games_master_dataset.json and display them as a list of game cards.

2. Acceptance criteria
One card is displayed for each unique game_id.
Duplicate game_id records are excluded, keeping the first record encountered.
The page renders without errors.
3. What is unclear or missing?
The issue does not specify:

Which game fields should appear on each card.
The visual layout, styling, or responsive behavior of the card list.
The expected ordering of cards.
Whether “first record” means the first record according to the JSON file’s order.
What should happen if the dataset is missing, malformed, empty, or fails to load.
Whether loading and error states need to be displayed.
Accessibility requirements, such as semantic markup, keyboard navigation, or image alt text.
Whether the view should support pagination, search, filtering, or sorting.
Where games_master_dataset.json is located and what its schema is.
How the requirement “renders without errors” should be verified or tested.
________________________________________________________________________________________
