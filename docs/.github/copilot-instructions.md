# Project instructions

Read docs/product-brief.md and docs/requirements.md. Follow the approved design 
and implementation plan in docs/05-implementation-plan.md.

## Data and safety
- Do not modify the original data in 00_GOGN_OG_SKILGREININGAR/games_master_dataset.json.
- Do not expose secrets or run destructive commands.
- Ask before running commands that change files.

## Project-specific rules
- Use games_master_dataset.json as the only data source.
- When a text field is missing (null, empty, or whitespace), display "Not available".
- When an image path is missing or invalid, show a gray placeholder box with the 
  text "No image available".
- When a game_id is duplicated, keep the first record only.
- Do not add any feature listed in the "Out of scope" section of docs/requirements.md.

## Workflow
- Work on one GitHub Issue at a time.
- Read its acceptance criteria before suggesting changes.
- Propose a short plan before implementing a feature.
- Report what you actually checked or tested.
- Do not claim success without verification.
- Always state which acceptance criterion is unclear.