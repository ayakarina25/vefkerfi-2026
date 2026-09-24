# Implementation Plan

## Goal

Build the smallest end-to-end flow that works: load the game dataset, show a basic 
game list, and open a game details page. This proves the full pipeline from raw data 
to a visible UI before adding search, filters, or accessibility.

## Build order

1. Prepare and import the game dataset (Issues #4, #12)
2. Create the database structure with GAME and PLATFORM tables (Issue #2)
3. Display the basic game list with cards showing title, platform, genre, year, rating (Issues #2, #3)
4. Handle duplicate game_id records by keeping the first occurrence (Issue #2)
5. Open a game details page when a card is clicked (Issue #10)
6. Restore the collection state when returning from details (Issue #11)
7. Add search by title with case-insensitive substring matching (Issues #5, #6)
8. Add filters for platform, genre, year, developer, and rating (Issues #7, #8, #9)
9. Handle missing fields and invalid image paths (Issue #12)
10. Add keyboard navigation and alt text (Issue #13)
11. Test the main user flow end to end (Issue #13)

## Dependencies

- The game list needs imported and validated data (step 1 before step 3).
- The platform filter needs the PLATFORM table populated (step 2 before step 8).
- The details page needs the game list to be rendered first (step 3 before step 5).
- State restoration depends on search and filter state existing (steps 7 and 8 before step 6).
- Missing-data handling must exist before the details page is tested (step 9 before step 11).

## Risks / open questions

- Duplicate `game_id` values: the dataset contains 887 duplicate IDs. The chosen rule 
  is to keep the first record and ignore later ones, but this may hide useful data 
  from later records.
- Missing ratings: 2,736 records have no rating. The rating filter must handle these 
  without breaking.
- Missing release years: 430 records have no valid year. The year filter must exclude 
  or fall back correctly.
- Missing descriptions: 185 records have no description. The details page must show 
  a fallback.
- Missing images: 251 records have no image path. The placeholder image must be used.
- The profiling script currently reports year range `0` to `2026`, which is wrong. 
  It does not detect missing years correctly. This script needs to be fixed.

## First vertical slice

The first vertical slice is:

**Raw data → SQLite database → simple game list → details page**

This slice does NOT include:
- Search
- Filters
- Accessibility (keyboard navigation, alt text)
- Responsive design
- State restoration

The goal of this slice is to prove that the data pipeline works and that a user can 
see games and open one. Everything else is added in later steps.

## Agent review

### Suggestion accepted

The Agent suggested validating image paths before rendering and showing a placeholder 
instead of a broken image. This was accepted because 251 records have no image path, 
and without this rule the UI would break on a large portion of the dataset.

### Suggestion rejected

The Agent suggested grouping duplicate `game_id` records and displaying a duplicate 
warning in the UI. This was rejected because the project's requirements state that 
duplicate records should be handled consistently without confusing the user, and a 
warning adds UI complexity that is not part of the MVP. Keeping the first record is 
simpler and matches the acceptance criteria.

## GitHub Project alignment

All steps in the build order map to issues in the repository. No new issues were 
created, and no existing issues were moved out of `Ready`. The implementation plan 
confirms the current issue order is correct.