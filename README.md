# Calculus Animation Lab

Open **index.html** in Chrome or Edge, or double-click **Open_Calculus_Lab.cmd**. Keep the app files and vendor folder together. No installation, account, video rendering, or server is needed for normal use.

Choose a homework problem. Use **Back / Next**, arrow keys, or the step markers to navigate. **Play** animates the steps; **Replay** repeats an operation. Drag **Operation timing** to control its animation directly. Space toggles playback outside input fields. Inspect points on the graph, zoom, pan, and reset the view. Optional browser speech is off by default; available voices depend on your browser.

## Included homework

12 selected problems, with 124 authored steps:

| Homework | Exercises | Methods |
|---|---|---|
| HW2 | 1.6 #23, #28 | Conjugates, common denominators, cancellation and limits |
| HW3 | 2.2 #28 | Derivative definition, binomial expansion, secant to tangent |
| HW4 | 2.3 #32, #42; 2.5 #37 | Product, quotient and nested chain rules |
| HW5 | 2.6 #33; 2.8 #8; 2.9 #4 | Implicit tangent, all three triangle-rate parts, linearization |
| HW6 | 3.1 #59 | Interior critical value and both endpoints |
| HW7 | 3.4 #25, #31 | Limits at infinity, conjugates and reciprocal substitution |

Inputs were checked against the original textbook and homework lists in the parent Calculus folder. Answers were independently checked with symbolic mathematics. These are selected assigned exercises, not a prediction of the actual exam.

## New problems

**New problem** generates local steps for supported differentiation, tangent lines, linearization, and finite limits. Try `x^2*sin(x)`, `tan(sqrt(1+x^2))`, or the finite limit `(x^2-1)/(x-1)` at `1`. Point inputs can include constants such as `pi/2`. Use explicit parentheses and `*` for multiplication.

The generator is deliberately bounded: supported scalar elementary expressions and verified finite-limit cases. It is not a universal calculus solver; unsupported methods or domain cases produce an explanation instead of a guessed solution. Infinity limits and implicit/related-rate problems are available in the authored homework lessons.

**Import steps** loads an authored JSON lesson, enabling other problems without rendering a video. See `source/import_example.json` for an editable example. Its `steps` specify the equation fragments and explanations; `graph` specifies the plotted expression, variable, base point, and optional tangent or holes. **Export steps** saves a custom lesson. Custom lessons and your place are stored in this browser when local storage is available.

## Implementation and checks

The app uses local KaTeX, math.js, Inter fonts, and Canvas2D. Licenses are included under vendor. Documentation: [KaTeX API](https://katex.org/docs/api), [math.js differentiation](https://mathjs.org/docs/reference/functions/derivative.html).

For development, run `node source/verify_content.cjs` and `node source/test_solver.cjs` after installing the package dependencies. The first checks all 139 authored math fragments; the second checks generated results and rejected unsupported inputs. Source and independent mathematical checks are under `qa/`.
