# Browser & Final QA Verification — Calculus Animation Lab

Verified: 2026-10-30 (Asia/Taipei)

## 1. Visual & Runtime Fixes Confirmed
- **Crisp Canvas Backing Resolution**: Verified in Playwright (`calculus-offline`, `file://` with network offline) that `#graphCanvas` backing dimensions match CSS bounds (`width: 826, height: 408` vs `clientWidth: 826, clientHeight: 408` at `1440×1000` desktop viewport). `syncCanvasSize()` runs before every graph draw and on resize.
- **Zero Mojibake**: Replaced all non-ASCII literals in `app.js`, `styles.css`, and `graphs.js` with explicit `\uXXXX` escapes. Verified in live browser DOM (`HW 2 · SECTION 1.6 · EXERCISE 23 · P. 71`, `HW 2 · §1.6 · #23`, `← Back`, `Next →`, `▶ Play`, and Canvas2D labels).
- **Responsive Mobile Sidebar Collapse**: Resizing from `1440×1000` desktop to `390×844` mobile automatically collapses the sidebar so the main equation stage, live graph, explanation panel, and transport controls remain fully visible and usable.
- **CSS Cleanup**: Removed layout-property (`width`, `padding`, `flex-basis`) transitions from `.sidebar` and reduced `.scope-note` accent border to `1px`.

## 2. Graph Engine & Mathematical Verification
- **Headless Scene Suite**: All 372 built-in scene states (12 lessons × early/middle/final step progress) plus custom solver graph specs rendered with 0 runtime exceptions.
- **Key Mathematical Coordinates**:
  - **Lesson 01 (HW2 1.6 #23)**: Open hole at `(0, 1/6)` with two-sided cyan approach markers.
  - **Lesson 02 (HW2 1.6 #28)**: Open hole at `(0, 1)` and vertical pole at `t = -1`.
  - **Lesson 07 (HW5 2.6 #33)**: Equal axis scales (`pxPerUnitX === pxPerUnitY`), lemniscate lobes, point `(3, 1)`, and tangent slope `-9/13`.
  - **Lesson 08 (HW5 2.8 #8)**: Equal axis scales, reference ghost triangle, and exact changing quantities for parts (a) `0.3`, (b) `3√3/4 + 0.3 ≈ 1.60`, and (c) `21√3/8 + 0.3 ≈ 4.85 cm²/min`.
  - **Lesson 09 (HW5 2.9 #4)**: Point `(3, 1)` and linearization slope `-3/4`.
  - **Lesson 10 (HW6 3.1 #59)**: Interior critical maximum `(π/6, 3√3/2)`, left endpoint `(0, 2)`, and right endpoint **absolute minimum `(π/2, 0)`** (`y = 0`).

## 3. Automated Test Suites
- `node Calculus_Animation_Lab/source/test_solver.cjs`: **49/49 passing**.
- `node Calculus_Animation_Lab/source/verify_content.cjs`: **PASS** (12 lessons, 124 steps, 139 KaTeX fragments, `import_example.json`).
- `python Calculus_Animation_Lab/source/verify_math.py`: **22/22 exact SymPy checks passing**.

## 4. Screenshots
- Desktop (`1440×1000`, offline `file://`): `.playwright-cli/page-2026-10-29T16-19-55-454Z.png`
- Mobile resized from desktop (`390×844`, offline `file://`): `.playwright-cli/page-2026-10-29T16-20-15-385Z.png`
