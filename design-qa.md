# Landing page design QA

## Scope

- Reference: `https://optimus.openng.org/`
- Implementation: `http://localhost:4200/`
- Desktop viewport: 1440 × 900
- Mobile viewport: 390 × 844
- Comparison artifact: `C:\Users\dercc\.codex\visualizations\2026\07\21\019f8689-84f8-7800-84e0-4c2a0d46e87e\optimus-theme-studio-comparison-final.png`

## Fidelity checks

- Layout: fixed four-rem topbar, announcement strip, centered hero, paired CTA controls,
  full-width product sample, four-card capability grid, customer table, and four-column footer follow
  the reference order and proportions.
- Typography: source-style sans hierarchy, weight, wrapping, and responsive headline scale verified
  at both target viewports.
- Spacing and surfaces: hero rhythm, ten-pixel card radii, one-pixel borders, restrained shadows,
  desktop section widths, and mobile vertical flow match the reference treatment.
- Color: dark announcement surface, neutral content surfaces, and semantic theme tokens remain
  consistent in light and dark modes. The active PrimeNG primary color intentionally carries the
  Theme Studio brand.
- Assets: feature illustrations, overview sample, customer avatars, and flag sprite are stored
  locally and render without hotlinks or placeholders.
- Responsive behavior: desktop live dashboard swaps to the real mobile sample image and six-option
  selector; features collapse to one column; customer data remains horizontally scrollable.

## Interaction and accessibility checks

- Search opens from the toolbar and closes from the dialog.
- Mobile sample controls update the selected sample and accessible image description.
- Dashboard navigation and Weekly/Monthly/Yearly chart controls update their selected state.
- Customer table supports search, sorting, row selection, pagination, and an empty state.
- Skip link, landmarks, labels, alt text, pressed states, keyboard controls, focus styles, and reduced
  motion behavior are present.
- A clean browser reload produced no new runtime errors.

## Automated verification

- Focused landing tests: 31 passed.
- Full application suite: 49 files passed, 264 tests passed.

## Resolved findings

- P1 — replaced the unrelated inherited wordmark with the project brand mark and wordmark.
- P1 — replaced the editorial dashboard with the reference-style crypto analytics dashboard.
- P2 — corrected desktop headline scale and hero-to-dashboard spacing.
- P2 — corrected mobile CTA layout, announcement height, selector size, and sample crop.
- P2 — added responsive overflow handling to prevent the customer table from breaking the page.

final result: passed

---

# shadcn table dark-mode design QA

## Scope

- Source visual truth:
  `/var/folders/x0/gd4ftm5s4j3cv4_lvn_n4l6h0000gn/T/codex-clipboard-d1f46efe-0081-4e96-83b1-c94ac22bb9d3.png`
- Browser-rendered implementation:
  `/Users/micha/.codex/visualizations/2026/07/25/019f9af9-9dea-7bc3-b157-db2e86148264/shadcn-table-dark-fixed.png`
- Combined comparison:
  `/Users/micha/.codex/visualizations/2026/07/25/019f9af9-9dea-7bc3-b157-db2e86148264/shadcn-table-dark-comparison.jpg`
- Route: `/designer`, shadcn starter, Table preview, dark mode.
- Source pixels: 1467 × 454.
- Implementation pixels: 1467 × 454.
- CSS capture area: top 1467 × 454 pixels of the 1467 × 810 preview panel in a
  2260 × 900 browser viewport.
- Density normalization: source and implementation captured at 1×; no resampling applied.

## Evidence

- Full-view comparison: the combined artifact confirms that the table now remains on the same
  zinc-dark surface as the surrounding shadcn preview instead of switching to white.
- Focused table-region comparison: header cells, filter cells, body cells, separators, muted column
  labels, and primary body text were readable at the source capture size, so a second crop was not
  needed.
- Computed dark-mode colors:
  - Header and filter cell background: `rgb(9, 9, 11)` (`zinc.950`).
  - Header text: `rgb(161, 161, 170)` (`zinc.400`).
  - Body background: `rgb(9, 9, 11)`; body text: `rgb(250, 250, 250)`.
  - Cell separator: `rgb(39, 39, 42)` (`zinc.800`).
- Light-mode regression check: header background remains `rgb(250, 250, 250)` (`zinc.50`).

## Fidelity surfaces

- Fonts and typography: unchanged; existing Inter typography, weights, sizes, and hierarchy match
  the supplied preview.
- Spacing and layout rhythm: unchanged by the token-only fix; table padding, row height, borders,
  and radii remain intact.
- Colors and visual tokens: dark header and filter rows now use `surface.950`; muted labels and
  separators retain sufficient contrast and align with the shadcn dark palette.
- Image quality and assets: no raster or custom visual assets are used in the affected table region;
  PrimeIcons remain sharp and unchanged.
- Copy and content: unchanged; records, labels, filters, and actions match the supplied state.

## Comparison history

- Earlier P1: the global `datatable.headerCell.background: {surface.50}` override forced both table
  header rows to a light surface in dark mode.
- Fix: moved the header-cell background and color into explicit light/dark component color schemes,
  using `surface.50` for light mode and `surface.950` for dark mode.
- Post-fix evidence: the browser capture and computed styles show a continuous dark table surface
  with no white header or filter band.

## Interaction and runtime checks

- Selected the shadcn starter and opened the Table preview.
- Toggled light and dark modes and verified both mode-specific table surfaces.
- Browser console errors: none.
- Focused automated test: 4 tests passed.

## Findings

- No actionable P0, P1, or P2 differences remain for the reported table-color issue.
- The source image is a partial preview crop, so unrelated horizontal placement outside the table
  color scope was not treated as a fidelity finding.

final result: passed
