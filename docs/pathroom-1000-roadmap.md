# PATHROOM 1,000 icon roadmap

## Goal

PATHROOM has grown from the initial public catalog of 144 icons to the current 464-icon implementation and will continue to 1,000 icons while preserving the existing download, copy, search, URL-state, accessibility, licensing, and GitHub Pages behavior.

The 1,000-icon target is composed of:

- 120 Tabler Icons, kept in their current order and distributed under the Tabler MIT notice.
- 880 PATHROOM Originals, distributed under the PATHROOM Originals MIT notice.

Batch 006 through Batch 011 add 32 Originals each, or 192 icons in total. The current catalog contains 464 icons: 120 Tabler Icons plus 344 PATHROOM Originals. Another 536 Originals remain to reach the 1,000-icon target.

## Final Originals allocation

| Category | Final Originals | Current after Batch 011 | Remaining |
| --- | ---: | ---: | ---: |
| UI | 70 | 30 | 40 |
| Arrows | 70 | 30 | 40 |
| Files | 70 | 38 | 32 |
| Media | 70 | 30 | 40 |
| Communication | 80 | 24 | 56 |
| People | 72 | 32 | 40 |
| Devices | 80 | 24 | 56 |
| Status | 80 | 24 | 56 |
| Data | 72 | 24 | 48 |
| Commerce | 72 | 32 | 40 |
| Maps | 72 | 24 | 48 |
| Time | 72 | 32 | 40 |
| **Total** | **880** | **344** | **536** |

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
B08 ESUA  B09 GDPL  B10 ETFM
B11 CPFT  B12 DSUC  B13 GLAM
B14 CDAL  B15 PSFG  B16 UMET
B17 CSMG  B18 DPUT  B19 ELAF
B20 CPDS  B21 UAFM  B22 GELT
B23 CDGE  B24 PSLT  B25 UCDS
B26 APGL  B27 FCDE  B28 MST
```

The sequence deliberately alternates mature and new categories so a single release does not overfit one visual family. It also reaches each major milestone without rewriting the original 144-item ordering:

- Batch 002: 176 total / 56 Originals.
- Batch 003: 208 total / 88 Originals.
- Batch 004: 240 total / 120 Originals.
- Batch 005: 272 total / 152 Originals.
- Batch 006: 304 total / 184 Originals.
- Batch 007: 336 total / 216 Originals.
- Batch 008: 368 total / 248 Originals.
- Batch 009: 400 total / 280 Originals.
- Batch 010: 432 total / 312 Originals.
- Batch 011: 464 total / 344 Originals.
- Batch 012: 496 total / 376 Originals.
- Batch 013: 528 total / 408 Originals.
- Batch 028: 1,000 total / 880 Originals.

The completed release-order snapshots are:

| Release | Total | SHA-256 catalog-order digest |
| --- | ---: | --- |
| Batch 006 | 304 | `7fee2b83e2c2d46024a50da617bd8b014d7dc82a5f9367c03c012d58e82b6a49` |
| Batch 007 | 336 | `77cc018846bada4feefd24f7e69b92bd25dadd85f19a5a2ddba0a7907ef18207` |
| Batch 008 | 368 | `bbee58bb37c4a10f1af05f1ec8dbcd3e78c1c01c7b42c61279fe095e8550a7cb` |
| Batch 009 | 400 | `21ee0364b72597120661ccb48d6f6e4b84181e971d3b034145a3481f028b7043` |
| Batch 010 | 432 | `92aadf35ed4ecc547c1a1387b399a0e4cd4e937e74595407645904578d2d9eb2` |
| Batch 011 | 464 | `c522bc80a0ee75e7d2fb90253e4aa31b618b7aa06428f4f6fc2c80d9825fa4a9` |

## Batch contract

Every 32-icon batch must include:

1. A frozen metadata manifest with unique slug, English name, Japanese name, category, bilingual tags, and release date.
2. Geometry components grouped by semantic category, using the shared 24×24 outline factory.
3. Registry entries whose key, component `displayName`, and catalog metadata agree.
4. Automatic validation for safe SVG elements and attributes, path syntax, bounds, primitive limits, well-formed exported SVG, license comments, and full-catalog geometry uniqueness.
5. A fixed digest proving that all already-published slugs remain in their original standard order. Each release adds its full baseline digest for the next batch; Batch 011 retains the 144/176/208/240/272/304/336/368/400/432 snapshots and locks the new 464-item order.
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

### Batch 004 checkpoint (completed)

Semantic category filtering is separate from the `Originals` collection filter. Mobile uses a compact category selection control, while desktop preserves direct access to every semantic category. Legacy `?category=originals` links remain compatible and resolve to the Originals collection.

### Batch 005 checkpoint (completed)

Communication and Devices each gain eight concepts, while People and Status become active public categories with eight concepts each. The complete 12-category taxonomy is now represented in the catalog without adding another top-level category.

### Batch 006 checkpoint (implementation and QA completed; deployment pending)

People, Status, Maps, and Time each gain eight concepts. The release contains 304 icons in total, including 184 Originals.

### Batch 007 checkpoint (implementation and QA completed; deployment pending)

UI, Arrows, Files, and Media each gain eight concepts. The release contains 336 icons in total, including 216 Originals.

### Batch 008 checkpoint (implementation and QA completed; deployment pending)

Commerce, Status, UI, and Arrows each gain eight concepts. The release contains 368 icons in total, including 248 Originals. Batch 012 uses Communication instead of Commerce so the remaining sequence still reaches the final category allocation exactly.

### Batch 009 checkpoint (implementation and QA completed; deployment pending)

Data, Devices, People, and Maps each gain eight concepts. The release contains 400 icons in total, including 280 Originals.

### Batch 010 checkpoint (implementation and QA completed; deployment pending)

Commerce, Time, Files, and Media each gain eight concepts. The release contains 432 icons in total, including 312 Originals.

### Batch 011 checkpoint (implementation and QA completed; deployment pending)

Communication, People, Files, and Time each gain eight concepts. The current implementation contains 464 icons in total, including 344 Originals.

### Before 500 icons

- Completed: keep batch metadata in separate modules instead of growing `catalog.jsx`.
- Completed: add the perceptual near-duplicate report to CI.
- Completed: publish `site/public/catalog-scale-report.json` as the machine-readable category, batch, reserved-slug, bundle-size, and search-benchmark report.

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
