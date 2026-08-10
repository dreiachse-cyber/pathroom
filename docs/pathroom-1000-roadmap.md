# PATHROOM 1,000 icon roadmap

## Goal

PATHROOM will grow from the initial public catalog of 144 icons to 1,000 icons while preserving the existing download, copy, search, URL-state, accessibility, licensing, and GitHub Pages behavior.

The 1,000-icon target is composed of:

- 120 Tabler Icons, kept in their current order and distributed under the Tabler MIT notice.
- 880 PATHROOM Originals, distributed under the PATHROOM Originals MIT notice.

Batch 003 adds 32 Originals and brings the public catalog to 208 icons: 120 Tabler Icons plus 88 PATHROOM Originals.

## Final Originals allocation

| Category | Final Originals | After Batch 003 | Remaining |
| --- | ---: | ---: | ---: |
| UI | 70 | 14 | 56 |
| Arrows | 70 | 14 | 56 |
| Files | 70 | 14 | 56 |
| Media | 70 | 14 | 56 |
| Communication | 80 | 8 | 72 |
| People | 72 | 0 | 72 |
| Devices | 80 | 8 | 72 |
| Status | 80 | 0 | 80 |
| Data | 72 | 8 | 64 |
| Commerce | 72 | 8 | 64 |
| Maps | 72 | 0 | 72 |
| Time | 72 | 0 | 72 |
| **Total** | **880** | **88** | **792** |

The taxonomy has a hard ceiling of 12 semantic categories. Variations such as direction, state, object family, and industry are represented by tags and family metadata instead of creating more top-level categories.

## Release sequence

Batch 002 through Batch 027 contain 32 icons each. Batch 028 contains the final 24 icons. Each letter below represents eight icons:

- `U` UI
- `A` arrows
- `F` files
- `M` media
- `C` communication
- `P` people
- `D` devices
- `S` status
- `G` data
- `E` commerce
- `L` maps
- `T` time

```text
B02 CDGE  B03 UAFM  B04 GELT
B05 CPDS  B06 PSLT  B07 UAFM
B08 CSUA  B09 DGPL  B10 ETFM
B11 CPFT  B12 DSUE  B13 GLAM
B14 CDAL  B15 PSFG  B16 UMET
B17 CSMG  B18 DPUT  B19 ELAF
B20 CPDS  B21 UAFM  B22 GELT
B23 CDGE  B24 PSLT  B25 UCDS
B26 APGL  B27 FCDE  B28 MST
```

The sequence deliberately alternates mature and new categories so a single release does not overfit one visual family. It also reaches each major milestone without rewriting the original 144-item ordering:

- Batch 002: 176 total / 56 Originals.
- Batch 003: 208 total / 88 Originals.
- Batch 012: 496 total / 376 Originals.
- Batch 013: 528 total / 408 Originals.
- Batch 028: 1,000 total / 880 Originals.

## Batch contract

Every 32-icon batch must include:

1. A frozen metadata manifest with unique slug, English name, Japanese name, category, bilingual tags, and release date.
2. Geometry components grouped by semantic category, using the shared 24×24 outline factory.
3. Registry entries whose key, component `displayName`, and catalog metadata agree.
4. Automatic validation for safe SVG elements and attributes, path syntax, bounds, primitive limits, well-formed exported SVG, license comments, and full-catalog geometry uniqueness.
5. A fixed digest proving that all already-published slugs remain in their original standard order. Each release adds its full published baseline digest for the next batch; Batch 003 locks the original 144, Batch 002's 176, and the new 208-item order.
6. Search checks for English, Japanese, category, direct URL state, and back/forward state restoration.
7. Production, Sites-worker, and GitHub Pages base-path builds before publication.

Names use Title Case. Slugs use lowercase kebab-case and normally follow `object-state`, `object-action`, or `object-direction`. Numbered escape slugs and a redundant `pathroom-` prefix are not allowed. Published, planned, and retired slugs remain reserved.

## Duplicate and visual-quality gates

- Exact normalized geometry duplicates are rejected automatically across the entire catalog.
- Each new concept must have a distinct semantic purpose, not only a different title.
- Near-duplicate review compares rasterized 32px shapes and flags perceptual hash distance 6 or lower or SSIM 0.92 or higher for review.
- Name and tag Jaccard similarity of 0.75 or higher, identical Japanese names, and mirrored or rotated similarities are review candidates.
- Directional variants are allowed only when they are explicitly registered as one icon family.
- Starting with Batch 003, new icons are reviewed at 16px, 24px, and 32px against their three nearest existing shapes before publication. Batch 002 is the pilot that establishes the automated and static semantic gates for that workflow.

The exact-duplicate gate and the perceptual similarity report are mandatory CI gates from Batch 003 onward. Generated comparison files are retained as workflow artifacts, while review decisions are committed with render and approval digests so geometry, metadata, thresholds, renderer, neighbor rankings, or flags cannot reuse stale approvals.

## Scale checkpoints

### Before Batch 004

Separate semantic category filtering from the `Originals` collection filter. Ten semantic categories plus the two global controls are too dense for one mobile tab row, so mobile moves to a compact selection control while desktop preserves direct access to every category.

### Before 500 icons

- Keep batch metadata in separate modules instead of growing `catalog.jsx`.
- Generate a slug reservation ledger and a machine-readable category-count report.
- Add the perceptual near-duplicate report to CI.
- Record production bundle size and search response benchmarks.

### Before 750 icons

- Split geometry from the initial catalog metadata payload.
- Lazy-load icon components by batch or category.
- Re-evaluate incremental rendering and list virtualization on low-end mobile hardware.

### At 1,000 icons

- Median search update time remains under 100 ms in the fixed CI benchmark.
- Initial JavaScript remains within the documented performance budget.
- All 1,000 icons pass license, SVG safety, uniqueness, export, search, keyboard, and GitHub Pages base-path gates.
- Publish a complete release manifest and optional category ZIP archives outside the Pages artifact when archive size warrants it.

## Ownership

Batch design, implementation, QA, release notes, and publication are handled in this project thread. A batch is not considered complete until the deployed GitHub Pages site reports the expected total and the new category URLs resolve correctly.
