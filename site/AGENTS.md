# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## PATHROOM design decisions

- The selected product name is `PATHROOM`.
- The source of visual truth is `../docs/references/pathroom-selected-home.png`.
- Recreate the selected first ideation image: quiet white catalog surface, graphite typography, cobalt-blue interaction states, a compact header, one dominant search field, horizontal category tabs, and a six-column desktop icon grid.
- Keep the core interactions real: text search, category filtering, sorting, keyboard focus, SVG copy, and copy-success feedback.
- Use query parameters for shareable catalog state and base-aware asset URLs so the same build can run under a GitHub Pages repository path.
- Keep semantic category filtering separate from the PATHROOM Originals collection filter. Show direct category tabs on desktop and a compact category select at 760px and below; preserve legacy `?category=originals` links.
- Treat SVG file download as the primary card action and SVG code copy as a secondary action.
- Keep the current Tabler Icons catalog available under its MIT license and maintain project-produced PATHROOM Originals as a clearly separate collection with its own MIT license notice.
- Grow the catalog toward 1,000 icons using the batch plan in `../docs/pathroom-1000-roadmap.md`; preserve all previously published slugs and their standard order.
- Add PATHROOM Originals in frozen batch metadata modules, normally 32 icons per release, and keep category, registry, SVG-safety, license, and full-catalog uniqueness checks mandatory.
