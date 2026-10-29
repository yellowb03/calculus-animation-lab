/* Exam Essentials & Complete Textbook Worked-Example Compendium for Calculus Midterm (Ch 1–3) */
(function (global) {
  "use strict";

  global.EXAM_ESSENTIALS_DATA = {
    examInfo:
      "Midterm Exam · Oct. 30 (Friday) · Room A1307 · Scope: Ch 1 (1.1–1.6, 1.8), Ch 2 (2.1–2.9), Ch 3 (3.1–3.5)",
    definitions: [
      {
        category: "Ch 1 · §1.5 Limits",
        term: "Definition of a Limit (§1.5)",
        tex: "\\lim_{x\\to a} f(x) = L",
        meaning:
          "f(x) can be made arbitrarily close to L by taking x sufficiently close to a on either side, without requiring x = a (the value f(a) need not even be defined)."
      },
      {
        category: "Ch 1 · §1.5 Limits",
        term: "Two-Sided Limit Existence Criterion (§1.5)",
        tex: "\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L",
        meaning:
          "A two-sided limit exists if and only if both the left-hand limit and the right-hand limit exist as finite numbers and are equal to the same value L."
      },
      {
        category: "Ch 1 · §1.8 Continuity",
        term: "Definition of Continuity at x = a (§1.8)",
        tex: "\\lim_{x\\to a} f(x) = f(a)",
        meaning:
          "Requires all three conditions: (1) f(a) is defined (a is in the domain of f), (2) \\lim_{x\\to a} f(x) exists, and (3) the limit equals the function value f(a)."
      },
      {
        category: "Ch 1 · §1.8 Continuity",
        term: "Intermediate Value Theorem — IVT (§1.8)",
        tex: "\\text{If } f \\text{ is continuous on } [a,b] \\text{ and } N \\text{ is between } f(a), f(b), \\text{ then } \\exists\\, c\\in(a,b) \\text{ with } f(c)=N",
        meaning:
          "Guarantees at least one interior root f(c) = 0 in (a,b) whenever f is continuous on the closed interval [a,b] and f(a) and f(b) have opposite signs."
      },
      {
        category: "Ch 2 · §2.1–2.2 Derivatives",
        term: "Limit Definition of the Derivative (§2.1–2.2)",
        tex: "f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h} = \\lim_{z\\to x}\\frac{f(z)-f(x)}{z-x}",
        meaning:
          "Defines the instantaneous rate of change of f at x and the slope of the tangent line to y = f(x) at (x, f(x)) as the limit of secant slopes."
      },
      {
        category: "Ch 2 · §2.2 Differentiability",
        term: "Differentiability vs. Continuity (§2.2)",
        tex: "\\text{Differentiable at } a \\implies \\text{Continuous at } a \\quad (\\text{converse is false: } |x| \\text{ at } 0)",
        meaning:
          "Every differentiable function is continuous, but a continuous function fails to be differentiable at sharp corners, cusps, or points with vertical tangents."
      },
      {
        category: "Ch 2 · §2.3 Differentiation Rules",
        term: "Power, Product & Quotient Rules (§2.3)",
        tex: "\\frac{d}{dx}[x^n]=nx^{n-1},\\quad (uv)'=u'v+uv',\\quad \\left(\\frac{u}{v}\\right)'=\\frac{v u' - u v'}{v^2}",
        meaning:
          "Core algebraic differentiation rules for powers, products, and quotients of differentiable functions (where v(x) \\ne 0)."
      },
      {
        category: "Ch 2 · §2.4 Trig Derivatives",
        term: "All 6 Trigonometric Derivatives (§2.4)",
        tex: "\\begin{aligned}(\\sin x)'&=\\cos x, & (\\cos x)'&=-\\sin x, & (\\tan x)'&=\\sec^2 x\\\\ (\\csc x)'&=-\\csc x\\cot x, & (\\sec x)'&=\\sec x\\tan x, & (\\cot x)'&=-\\csc^2 x\\end{aligned}",
        meaning:
          "Every co-function (\\cos x, \\csc x, \\cot x) has a negative sign in its derivative; radian measure is always assumed."
      },
      {
        category: "Ch 2 · §2.5 Chain Rule",
        term: "The Chain Rule (§2.5)",
        tex: "\\frac{d}{dx}[f(g(x))] = f'(g(x))\\cdot g'(x) \\quad \\text{or} \\quad \\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}",
        meaning:
          "To differentiate a composite function, differentiate the outer function evaluated at the undisturbed inner function, then multiply by the derivative of the inner function."
      },
      {
        category: "Ch 2 · §2.9 Linearization",
        term: "Linearization & Differentials (§2.9)",
        tex: "L(x) = f(a) + f'(a)(x-a), \\qquad dy = f'(x)\\,dx, \\qquad \\Delta y \\approx dy",
        meaning:
          "The tangent line L(x) at x = a provides the best linear approximation f(x) \\approx L(x) for x near a; the differential dy measures the tangent-line rise."
      },
      {
        category: "Ch 3 · §3.1 Extrema",
        term: "Definition of Critical Number & Fermat's Theorem (§3.1)",
        tex: "c \\in \\mathrm{Dom}(f) \\text{ is critical if } f'(c)=0 \\text{ or } f'(c) \\text{ DNE}",
        meaning:
          "A critical number c must belong to the domain of f. By Fermat's Theorem, if f has a local extremum at c, then c must be a critical number."
      },
      {
        category: "Ch 3 · §3.1 Extrema",
        term: "Extreme Value Theorem & Closed-Interval Method (§3.1)",
        tex: "\\max_{[a,b]} f \\text{ and } \\min_{[a,b]} f \\text{ occur at critical numbers in } (a,b) \\text{ or endpoints } a, b",
        meaning:
          "A continuous function on a closed interval [a,b] always attains an absolute maximum and an absolute minimum, found by comparing f at interior critical points and at endpoints a, b."
      },
      {
        category: "Ch 3 · §3.2 MVT",
        term: "Rolle's Theorem & Mean Value Theorem — MVT (§3.2)",
        tex: "\\text{Continuous on } [a,b], \\text{ diff. on } (a,b) \\implies \\exists\\, c\\in(a,b):\\; f'(c)=\\frac{f(b)-f(a)}{b-a}",
        meaning:
          "Guarantees at least one interior point c where the instantaneous tangent slope equals the average secant slope across [a,b] (Rolle's Theorem is the special case f(a)=f(b) \\implies f'(c)=0)."
      },
      {
        category: "Ch 3 · §3.3 Shape of Graphs",
        term: "Monotonicity & First Derivative Test (§3.3)",
        tex: "f'>0 \\implies f \\uparrow;\\quad f'<0 \\implies f \\downarrow;\\quad f' \\text{ changes } + \\to - \\text{ at } c \\implies \\text{local max}",
        meaning:
          "The sign chart of f'(x) determines intervals of increase/decrease and classifies critical points: + to - is a local maximum, - to + is a local minimum."
      },
      {
        category: "Ch 3 · §3.3 Concavity",
        term: "Concavity, Inflection Points & Second Derivative Test (§3.3)",
        tex: "f''>0 \\implies \\text{concave up } (\\cup);\\quad f''<0 \\implies \\text{concave down } (\\cap);\\quad f'(c)=0, f''(c)>0 \\implies \\text{local min}",
        meaning:
          "An inflection point occurs where f is continuous and f''(x) changes sign (+ to - or - to +). If f'(c)=0, then f''(c)<0 gives a local max and f''(c)>0 gives a local min."
      },
      {
        category: "Ch 3 · §3.4 Limits at Infinity",
        term: "Limits at Infinity & Horizontal Asymptotes (§3.4)",
        tex: "y=L \\text{ is a HA if } \\lim_{x\\to\\infty}f(x)=L \\text{ or } \\lim_{x\\to -\\infty}f(x)=L; \\quad \\sqrt{x^2}=|x|=\\begin{cases}x,&x>0\\\\-x,&x<0\\end{cases}",
        meaning:
          "Divide numerator and denominator by the highest power of x in the denominator; when factoring x^2 out of a square root as x \\to -\\infty, always use \\sqrt{x^2} = |x| = -x."
      }
    ],
    sections: [
      {
        id: "ch1-limits-continuity",
        title: "Chapter 1 · Limits & Continuity",
        subtitle: "Sections 1.1–1.6, 1.8 · One-Sided Limits, Indeterminate 0/0 Forms, Trig Limits, Squeeze Theorem & IVT",
        cards: [
          {
            id: "card-1-1-1-5-limits",
            tag: "§1.1–1.5 · One-Sided & Infinite Limits",
            title: "Piecewise One-Sided Limits & Vertical Asymptotes",
            definition:
              "A two-sided limit \\lim_{x\\to a} f(x) = L exists iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L. A vertical line x = a is a vertical asymptote if \\lim_{x\\to a^\\pm} f(x) = \\pm\\infty.",
            beforeTex: "\\lim_{x\\to a^-}f(x)\\;\\text{ vs. }\\;\\lim_{x\\to a^+}f(x),\\qquad \\lim_{x\\to a}\\frac{|x-a|}{x-a}",
            afterTex: "\\lim_{x\\to a^-}\\frac{-(x-a)}{x-a}=-1 \\neq \\lim_{x\\to a^+}\\frac{x-a}{x-a}=+1 \\implies \\text{DNE}",
            whatChanges:
              "For piecewise functions or absolute values |u|, rewrite |u| as +u when u > 0 and -u when u < 0, then evaluate the left-hand and right-hand limits separately.",
            examTrap:
              "For a non-zero numerator over a zero denominator (k/0 with k \\ne 0), the limit is \\pm\\infty or DNE — do not apply 0/0 cancellation tricks when the numerator is not 0.",
            workedExample: [
              {
                tex: "\\text{Evaluate } \\lim_{x\\to 2^-}\\frac{|x-2|}{x^2-4} \\text{ and } \\lim_{x\\to 2^+}\\frac{|x-2|}{x^2-4}",
                note: "For x < 2, x - 2 < 0 so |x - 2| = -(x - 2); for x > 2, |x - 2| = +(x - 2)."
              },
              {
                tex: "\\lim_{x\\to 2^-}\\frac{-(x-2)}{(x-2)(x+2)} = \\lim_{x\\to 2^-}\\frac{-1}{x+2} = -\\frac{1}{4}",
                note: "Cancel (x - 2) for x \\ne 2 and substitute x = 2 into the left-hand branch."
              },
              {
                tex: "\\lim_{x\\to 2^+}\\frac{x-2}{(x-2)(x+2)} = \\lim_{x\\to 2^+}\\frac{1}{x+2} = +\\frac{1}{4}",
                note: "Right-hand limit equals +1/4; since -1/4 \\ne +1/4, the two-sided limit at x = 2 DNE."
              }
            ],
            lessonId: "02-hw2-1-6-32"
          },
          {
            id: "card-1-6-algebraic-0-0",
            tag: "§1.6 · 0/0 Limits",
            title: "Radical Conjugate & Common-Denominator Cancellation",
            definition:
              "When direct substitution gives the indeterminate form 0/0, rationalize radicals using (A-B)(A+B) = A^2 - B^2 or combine fractions over a common denominator to expose the zero-producing factor (x-a).",
            beforeTex: "\\lim_{h\\to 0}\\frac{\\sqrt{a+h}-\\sqrt{a}}{h}\\;\\text{ or }\\;\\lim_{t\\to 0}\\left(\\frac{1}{t}-\\frac{1}{t^2+t}\\right)",
            afterTex: "\\lim_{h\\to 0}\\frac{(a+h)-a}{h(\\sqrt{a+h}+\\sqrt{a})}=\\frac{1}{2\\sqrt{a}}",
            whatChanges:
              "Multiply the radical numerator and denominator by the conjugate (or combine fractions over the LCD) so the zero-producing factor h or t cancels cleanly before substituting.",
            examTrap:
              "Never drop the limit symbol \\lim_{h\\to 0} before you actually plug in h=0, and do not expand the denominator — keep h factored out so it cancels immediately.",
            workedExample: [
              {
                tex: "\\lim_{h\\to 0}\\frac{\\sqrt{9+h}-3}{h} = \\lim_{h\\to 0}\\frac{(\\sqrt{9+h}-3)(\\sqrt{9+h}+3)}{h(\\sqrt{9+h}+3)}",
                note: "Direct substitution gives 0/0; multiply numerator and denominator by the conjugate \\sqrt{9+h}+3."
              },
              {
                tex: "= \\lim_{h\\to 0}\\frac{(9+h)-9}{h(\\sqrt{9+h}+3)} = \\lim_{h\\to 0}\\frac{h}{h(\\sqrt{9+h}+3)}",
                note: "Simplify the numerator using difference of squares (A-B)(A+B) = A^2 - B^2."
              },
              {
                tex: "= \\lim_{h\\to 0}\\frac{1}{\\sqrt{9+h}+3} = \\frac{1}{\\sqrt{9}+3} = \\frac{1}{6}",
                note: "Cancel h (valid since h \\ne 0 in the limit) and evaluate by direct substitution at h = 0."
              }
            ],
            lessonId: "01-hw2-1-6-23"
          },
          {
            id: "card-1-6-trig-limit",
            tag: "§1.6 · Trig Limits",
            title: "Fundamental Sine-Over-Angle Limit Pattern",
            definition:
              "For any angle u(x) \\to 0 as x \\to a, the fundamental trigonometric limits are \\lim_{u\\to 0}\\frac{\\sin u}{u} = 1 and \\lim_{u\\to 0}\\frac{1-\\cos u}{u} = 0 (with u in radians).",
            beforeTex: "\\lim_{x\\to 0}\\frac{\\sin(kx)}{x}\\quad\\text{and}\\quad\\lim_{\\theta\\to 0}\\frac{1-\\cos\\theta}{\\theta}",
            afterTex: "\\lim_{x\\to 0}\\,k\\cdot\\frac{\\sin(kx)}{kx}=k\\cdot 1=k,\\qquad \\lim_{\\theta\\to 0}\\frac{1-\\cos\\theta}{\\theta}=0",
            whatChanges:
              "Multiply and divide by the exact inner angle kx so the denominator matches the sine argument u = kx, turning \\sin(u)/u into 1 as u \\to 0.",
            examTrap:
              "\\lim_{x\\to\\infty}\\frac{\\sin x}{x}=0 by Squeeze Theorem (since -1\\le\\sin x\\le 1), NOT 1; the ratio equals 1 only when the angle approaches 0.",
            workedExample: [
              {
                tex: "\\lim_{x\\to 0}\\frac{\\sin(5x)}{\\sin(2x)} = \\lim_{x\\to 0}\\left(\\frac{\\sin(5x)}{5x}\\cdot\\frac{2x}{\\sin(2x)}\\cdot\\frac{5x}{2x}\\right)",
                note: "Divide and multiply by the exact inner angles 5x and 2x to build matching \\sin(u)/u ratios."
              },
              {
                tex: "= \\frac{5}{2}\\cdot\\left(\\lim_{x\\to 0}\\frac{\\sin(5x)}{5x}\\right)\\cdot\\left(\\lim_{x\\to 0}\\frac{2x}{\\sin(2x)}\\right)",
                note: "Cancel x/x = 1 for x \\ne 0 and apply the Limit Laws to each trigonometric factor."
              },
              {
                tex: "= \\frac{5}{2}\\cdot 1\\cdot 1 = \\frac{5}{2}",
                note: "Since 5x \\to 0 and 2x \\to 0 as x \\to 0, both trigonometric ratios converge to 1."
              }
            ],
            lessonId: "cram-01-limits-ivt"
          },
          {
            id: "card-1-6-squeeze",
            tag: "§1.6 · Squeeze Theorem",
            title: "Oscillating Bounded Factor × Vanishing Factor",
            definition:
              "Squeeze Theorem: If g(x) \\le f(x) \\le h(x) for all x near a (except possibly at a) and \\lim_{x\\to a} g(x) = \\lim_{x\\to a} h(x) = L, then \\lim_{x\\to a} f(x) = L.",
            beforeTex: "\\lim_{x\\to 0}\\,x^2\\sin\\!\\left(\\frac{1}{x}\\right)\\quad\\text{where }-1\\le\\sin\\!\\left(\\frac{1}{x}\\right)\\le 1",
            afterTex: "-x^2 \\le x^2\\sin\\!\\left(\\frac{1}{x}\\right) \\le x^2 \\;\\Longrightarrow\\; \\lim_{x\\to 0}x^2\\sin\\!\\left(\\frac{1}{x}\\right)=0",
            whatChanges:
              "Bound the oscillating trig factor between -1 and 1, multiply the three-part inequality by the non-negative multiplier x^2, and trap the middle limit between two bounds that both go to 0.",
            examTrap:
              "Do not write \\lim_{x\\to 0}\\sin(1/x)=0 (that limit does not exist); you must write the three-part inequality and explicitly cite the Squeeze Theorem.",
            workedExample: [
              {
                tex: "-1 \\le \\sin\\!\\left(\\frac{1}{x}\\right) \\le 1 \\quad \\text{for all } x \\ne 0",
                note: "Start with the universal bounded range of sine or cosine on (-\\infty, \\infty)."
              },
              {
                tex: "-x^2 \\le x^2\\sin\\!\\left(\\frac{1}{x}\\right) \\le x^2 \\quad (\\text{since } x^2 \\ge 0)",
                note: "Multiply all three parts by x^2 \\ge 0 (which preserves the inequality directions)."
              },
              {
                tex: "\\lim_{x\\to 0}(-x^2) = 0 \\;\\text{ and }\\; \\lim_{x\\to 0}x^2 = 0 \\implies \\lim_{x\\to 0}x^2\\sin\\!\\left(\\frac{1}{x}\\right) = 0",
                note: "Both outer bounds approach 0, so by the Squeeze Theorem the middle expression also approaches 0."
              }
            ],
            lessonId: "cram-08-squeeze-theorem"
          },
          {
            id: "card-1-8-continuity-ivt",
            tag: "§1.8 · Continuity & IVT",
            title: "Three-Part Continuity Test & Intermediate Value Theorem",
            definition:
              "A function f is continuous on [a,b] if it is continuous at every interior point in (a,b), right-continuous at a, and left-continuous at b. IVT guarantees f(c)=N for some c \\in (a,b) whenever N lies between f(a) and f(b).",
            beforeTex: "\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=f(a),\\qquad f(a)\\cdot f(b)<0\\text{ on }[a,b]",
            afterTex: "\\text{Continuous on }[a,b]\\;\\Longrightarrow\\;\\exists\\,c\\in(a,b)\\text{ such that }f(c)=0",
            whatChanges:
              "Continuity equates the left limit, right limit, and function value at x=a; IVT converts opposite endpoint signs on a closed continuous interval into a guaranteed root c inside (a,b).",
            examTrap:
              "In an IVT proof, you lose credit if you forget to state explicitly that f is continuous on the closed interval [a,b] before comparing f(a) and f(b).",
            workedExample: [
              {
                tex: "\\text{Let } f(x) = x^3 + x - 1.\\;\\text{Since } f \\text{ is a polynomial, } f \\text{ is continuous on } [0,1].",
                note: "Step 1: Define f(x) and explicitly state continuity on the closed interval [0,1]."
              },
              {
                tex: "f(0) = 0^3 + 0 - 1 = -1 < 0,\\qquad f(1) = 1^3 + 1 - 1 = 1 > 0",
                note: "Step 2: Evaluate f at both endpoints to show opposite signs around N = 0."
              },
              {
                tex: "f(0) < 0 < f(1) \\implies \\text{by IVT, } \\exists\\, c \\in (0,1) \\text{ such that } f(c) = 0",
                note: "Step 3: Cite the Intermediate Value Theorem to conclude a root exists in the open interval (0,1)."
              }
            ],
            lessonId: "cram-07-ivt-root-proof"
          }
        ]
      },
      {
        id: "ch2-derivatives-applications",
        title: "Chapter 2 · Derivatives & Applications",
        subtitle: "Sections 2.1–2.9 · Limit Definition, Power/Product/Quotient/Trig/Chain Rules, Implicit Diff, Related Rates & Linearization",
        cards: [
          {
            id: "card-2-1-limit-def",
            tag: "§2.1–2.2 · Limit Definition",
            title: "Derivative from First Principles & Differentiability",
            definition:
              "The derivative of f at x is f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}, provided this limit exists. Geometrically, f'(a) is the slope of the tangent line y - f(a) = f'(a)(x - a).",
            beforeTex: "f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h},\\qquad f'(a)=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}",
            afterTex: "\\text{Differentiable at }a \\;\\Longrightarrow\\; \\text{Continuous at }a\\quad(\\text{converse is FALSE})",
            whatChanges:
              "Expand f(x+h), subtract f(x) so every remaining numerator term contains h, factor and cancel h, and then let h\\to 0 to turn the secant slope into the tangent slope.",
            examTrap:
              "If a problem says 'Use the definition of the derivative', power/product shortcuts earn 0 points — you must write and evaluate the difference-quotient limit.",
            workedExample: [
              {
                tex: "f(x)=x^2+3x \\implies f'(x)=\\lim_{h\\to 0}\\frac{(x+h)^2+3(x+h)-(x^2+3x)}{h}",
                note: "Substitute x+h for every x in f(x) and set up the difference quotient."
              },
              {
                tex: "= \\lim_{h\\to 0}\\frac{x^2+2xh+h^2+3x+3h-x^2-3x}{h} = \\lim_{h\\to 0}\\frac{h(2x+h+3)}{h}",
                note: "Expand, cancel all terms without h, and factor h from the numerator."
              },
              {
                tex: "= \\lim_{h\\to 0}(2x+h+3) = 2x+3",
                note: "Cancel h for h \\ne 0 and substitute h = 0 to obtain f'(x)."
              }
            ],
            lessonId: "03-hw3-2-2-28"
          },
          {
            id: "card-2-3-product-quotient",
            tag: "§2.3 · Product & Quotient",
            title: "Product Rule & Quotient Rule Sign Discipline",
            definition:
              "For differentiable functions u(x) and v(x), (uv)' = u'v + uv' and (u/v)' = (u'v - uv')/v^2. Rewrite roots as fractional powers \\sqrt[n]{x^m} = x^{m/n} before applying the Power Rule.",
            beforeTex: "\\frac{d}{dx}[u\\cdot v]\\quad\\text{and}\\quad\\frac{d}{dx}\\left[\\frac{u}{v}\\right]",
            afterTex: "(uv)' = u'v + uv',\\qquad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
            whatChanges:
              "Each factor takes a turn being differentiated while the other stays intact; in a quotient, the numerator starts with u'v (top derivative times bottom) minus uv', all over v^2.",
            examTrap:
              "In the Quotient Rule, reversing the subtraction order to uv' - u'v flips the sign of your entire derivative — always differentiate the numerator first.",
            workedExample: [
              {
                tex: "y = \\frac{x^2+1}{2x-3} \\implies y' = \\frac{\\frac{d}{dx}(x^2+1)\\cdot(2x-3) - (x^2+1)\\cdot\\frac{d}{dx}(2x-3)}{(2x-3)^2}",
                note: "Apply Quotient Rule with u = x^2+1 and v = 2x-3, placing u'v first in the numerator."
              },
              {
                tex: "= \\frac{(2x)(2x-3) - (x^2+1)(2)}{(2x-3)^2} = \\frac{4x^2 - 6x - 2x^2 - 2}{(2x-3)^2}",
                note: "Differentiate each factor and distribute the negative sign across -(x^2+1)(2)."
              },
              {
                tex: "= \\frac{2x^2 - 6x - 2}{(2x-3)^2}",
                note: "Combine like terms in the numerator while leaving the squared denominator factored."
              }
            ],
            lessonId: "05-hw4-2-3-42"
          },
          {
            id: "card-2-4-trig-derivatives",
            tag: "§2.4 · Trig Derivatives",
            title: "All Six Trigonometric Derivatives & Horizontal Tangents",
            definition:
              "(\\sin x)'=\\cos x, (\\cos x)'=-\\sin x, (\\tan x)'=\\sec^2 x, (\\csc x)'=-\\csc x\\cot x, (\\sec x)'=\\sec x\\tan x, (\\cot x)'=-\\csc^2 x. Horizontal tangents occur where f'(x) = 0.",
            beforeTex: "f(x) = x + 2\\sin x \\quad \\text{on } [0, 2\\pi]",
            afterTex: "f'(x) = 1 + 2\\cos x = 0 \\implies \\cos x = -\\frac{1}{2} \\implies x = \\frac{2\\pi}{3},\\,\\frac{4\\pi}{3}",
            whatChanges:
              "Differentiate trigonometric terms using the 6 master rules (remembering minus signs on co-functions), then set f'(x) = 0 and solve on the unit circle for horizontal tangent points.",
            examTrap:
              "Remember that \\cos x = -1/2 has TWO solutions in [0, 2\\pi] (Quadrants II and III: 2\\pi/3 and 4\\pi/3) — listing only one solution loses half the points.",
            workedExample: [
              {
                tex: "f(x) = \\frac{\\sec x}{1 + \\tan x} \\implies f'(x) = \\frac{(\\sec x\\tan x)(1+\\tan x) - \\sec x(\\sec^2 x)}{(1+\\tan x)^2}",
                note: "Use the Quotient Rule with (\\sec x)' = \\sec x\\tan x and (1+\\tan x)' = \\sec^2 x."
              },
              {
                tex: "= \\frac{\\sec x(\\tan x + \\tan^2 x - \\sec^2 x)}{(1+\\tan x)^2}",
                note: "Factor out \\sec x in the numerator to expose the Pythagorean identity."
              },
              {
                tex: "= \\frac{\\sec x(\\tan x - 1)}{(1+\\tan x)^2} \\quad (\\text{since } 1+\\tan^2 x = \\sec^2 x \\implies \\tan^2 x - \\sec^2 x = -1)",
                note: "Replace \\tan^2 x - \\sec^2 x with -1 for a clean, fully simplified derivative."
              }
            ],
            lessonId: "10-hw6-3-1-59"
          },
          {
            id: "card-2-5-chain-rule",
            tag: "§2.5 · Chain Rule",
            title: "Outer-to-Inner Peeling for Composite Functions",
            definition:
              "If g is differentiable at x and f is differentiable at u = g(x), then F(x) = f(g(x)) is differentiable at x and F'(x) = f'(g(x))\\cdot g'(x). For nested 3-layer chains, [f(g(h(x)))]' = f'(g(h(x)))\\cdot g'(h(x))\\cdot h'(x).",
            beforeTex: "\\frac{d}{dx}\\Big[f\\big(g(x)\\big)\\Big]\\quad\\text{e.g.}\\quad\\frac{d}{dx}\\tan\\!\\left(\\sqrt{1+t^2}\\right)",
            afterTex: "f'\\big(g(x)\\big)\\cdot g'(x)\\quad\\Longrightarrow\\quad \\sec^2\\!\\left(\\sqrt{1+t^2}\\right)\\cdot\\frac{t}{\\sqrt{1+t^2}}",
            whatChanges:
              "Differentiate the outer shell first while copying the inner expression g(x) completely unchanged, then multiply by the derivative of the inside g'(x).",
            examTrap:
              "Never differentiate the outer and inner functions inside the same brackets — f'(g'(x)) is wrong; keep g(x) inside f' and multiply by g'(x) outside.",
            workedExample: [
              {
                tex: "F(t) = \\tan\\!\\left(\\sqrt{1+t^2}\\right) = \\tan\\!\\left((1+t^2)^{1/2}\\right)",
                note: "Identify the 3 nested layers: outer \\tan(u), middle u = v^{1/2}, and inner v = 1+t^2."
              },
              {
                tex: "F'(t) = \\sec^2\\!\\left(\\sqrt{1+t^2}\\right)\\cdot \\frac{d}{dt}\\left[(1+t^2)^{1/2}\\right] = \\sec^2\\!\\left(\\sqrt{1+t^2}\\right)\\cdot \\frac{1}{2}(1+t^2)^{-1/2}\\cdot(2t)",
                note: "Peel outer \\tan to \\sec^2, middle power 1/2 to (1/2)(\\cdots)^{-1/2}, and inner 1+t^2 to 2t."
              },
              {
                tex: "F'(t) = \\frac{t\\,\\sec^2\\!\\left(\\sqrt{1+t^2}\\right)}{\\sqrt{1+t^2}}",
                note: "Cancel 2/2 = 1 and rewrite the negative fractional exponent as a square root in the denominator."
              }
            ],
            lessonId: "06-hw4-2-5-50"
          },
          {
            id: "card-2-6-implicit-diff",
            tag: "§2.6 · Implicit Diff",
            title: "Implicit Differentiation: Every y-Term Spawns a y'",
            definition:
              "When an equation F(x, y) = 0 defines y implicitly as a differentiable function of x, differentiate both sides with respect to x using \\frac{d}{dx}[g(y)] = g'(y)\\,\\frac{dy}{dx}, then solve linearly for \\frac{dy}{dx}.",
            beforeTex: "\\frac{d}{dx}\\Big[x^2 + y^3 = 9\\Big]\\quad\\text{treating }y=y(x)",
            afterTex: "2x + 3y^2\\,\\frac{dy}{dx} = 0 \\;\\Longrightarrow\\; \\frac{dy}{dx} = -\\frac{2x}{3y^2}",
            whatChanges:
              "Differentiate x-terms normally, differentiate y-terms with respect to y and immediately multiply by y' (Chain Rule), then collect all y' terms on one side and divide.",
            examTrap:
              "Watch out for mixed products like x y^2: you must apply the Product Rule to get (1)y^2 + x(2y y'), and remember that the derivative of a constant on the right side is 0.",
            workedExample: [
              {
                tex: "\\frac{d}{dx}\\left[x^3 + x y^2 + y^3\\right] = \\frac{d}{dx}[5]",
                note: "Differentiate both sides with respect to x; notice xy^2 is a product of x and y^2."
              },
              {
                tex: "3x^2 + \\left(1\\cdot y^2 + x\\cdot 2y\\,y'\\right) + 3y^2\\,y' = 0",
                note: "Apply the Product Rule to xy^2 and the Chain Rule to y^2 and y^3."
              },
              {
                tex: "(2xy + 3y^2)\\,y' = -3x^2 - y^2 \\implies \\frac{dy}{dx} = -\\frac{3x^2 + y^2}{2xy + 3y^2}",
                note: "Group all terms containing y' on the left, factor out y', and divide."
              }
            ],
            lessonId: "cram-03-implicit-linear"
          },
          {
            id: "card-2-8-2-9-rates-linear",
            tag: "§2.7–2.9 · Related Rates & L(x)",
            title: "Related Rates in t & Tangent-Line Linearization",
            definition:
              "In Related Rates, all changing quantities are functions of time t; differentiate the geometric relation with respect to t before substituting snapshot values. In Linearization, L(x) = f(a) + f'(a)(x-a) approximates f(x) near x=a.",
            beforeTex: "x^2+y^2=L^2\\;\\xrightarrow{d/dt}\\;2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=0,\\qquad f(x)\\approx L(x)\\text{ near }x=a",
            afterTex: "L(x) = f(a) + f'(a)(x-a),\\qquad \\Delta y \\approx dy = f'(a)\\,\\Delta x",
            whatChanges:
              "In Related Rates, differentiate the geometric relation with respect to time t BEFORE plugging in snapshot numbers; in Linearization, anchor the tangent line at the easy base point x=a.",
            examTrap:
              "Substituting given snapshot values (like x=6) before differentiating freezes variables into constants and wipes out their rates dx/dt and dy/dt to zero.",
            workedExample: [
              {
                tex: "\\text{Approximate } \\sqrt{3.98} \\text{ using } f(x)=\\sqrt{x} \\text{ at base point } a=4:",
                note: "Choose the nearby exact square a = 4 where \\sqrt{4} = 2 is easy to evaluate."
              },
              {
                tex: "f(4) = 2,\\qquad f'(x) = \\frac{1}{2\\sqrt{x}} \\implies f'(4) = \\frac{1}{2\\sqrt{4}} = \\frac{1}{4}",
                note: "Compute both the function value f(4) and the derivative slope f'(4) at the anchor point."
              },
              {
                tex: "L(x) = 2 + \\frac{1}{4}(x-4) \\implies \\sqrt{3.98} \\approx L(3.98) = 2 + \\frac{1}{4}(-0.02) = 1.995",
                note: "Form L(x) = f(a) + f'(a)(x-a) and substitute x = 3.98 (so dx = -0.02)."
              }
            ],
            lessonId: "cram-09-related-rates-ladder"
          }
        ]
      },
      {
        id: "ch3-extrema-mvt-infinity",
        title: "Chapter 3 · Extrema, MVT, Shape & Infinity",
        subtitle: "Sections 3.1–3.5 · Closed-Interval Extrema, Rolle's & MVT, Concavity Tests, Limits at ±∞ & Curve Sketching",
        cards: [
          {
            id: "card-3-1-closed-extrema",
            tag: "§3.1 · Closed-Interval Extrema",
            title: "Closed-Interval Method for Absolute Max & Min",
            definition:
              "To find the absolute (global) maximum and minimum of a continuous function f on a closed interval [a,b]: (1) find all critical numbers c in (a,b), (2) evaluate f(c) and endpoint values f(a), f(b), and (3) compare all values.",
            beforeTex: "\\text{Max/Min of continuous }f(x)\\text{ on }[a,b]:\\quad f'(c)=0\\text{ or }f'(c)\\text{ DNE}",
            afterTex: "\\text{Compare }f(c)\\text{ inside }(a,b)\\text{ against endpoint values }f(a)\\text{ and }f(b)",
            whatChanges:
              "Find all critical numbers c strictly inside (a,b) where f'(c)=0 or f'(c) is undefined, then evaluate f(x) at those interior critical points AND both endpoints a and b.",
            examTrap:
              "Do not forget the endpoints f(a) and f(b), and discard any critical point c that falls outside the given interval [a,b].",
            workedExample: [
              {
                tex: "\\text{Find absolute extrema of } f(x) = x^3 - 3x^2 + 1 \\text{ on } \\left[-\\frac{1}{2},\\, 4\\right]:",
                note: "f is a polynomial, so it is continuous on the closed interval [-1/2, 4]."
              },
              {
                tex: "f'(x) = 3x^2 - 6x = 3x(x-2) = 0 \\implies x = 0,\\, 2 \\in \\left(-\\frac{1}{2},\\, 4\\right)",
                note: "Both critical numbers x = 0 and x = 2 lie inside the interval [-1/2, 4]."
              },
              {
                tex: "f\\!\\left(-\\frac{1}{2}\\right)=\\frac{1}{8},\\; f(0)=1,\\; f(2)=-3\\text{ (abs min)},\\; f(4)=17\\text{ (abs max)}",
                note: "Compare f at critical numbers and endpoints: abs max is 17 at x=4; abs min is -3 at x=2."
              }
            ],
            lessonId: "10-hw6-3-1-59"
          },
          {
            id: "card-3-2-rolles-mvt",
            tag: "§3.2 · Rolle's & MVT",
            title: "Mean Value Theorem: Instantaneous Slope = Average Slope",
            definition:
              "If f is continuous on [a,b] and differentiable on (a,b), then there exists at least one c \\in (a,b) such that f'(c) = \\frac{f(b)-f(a)}{b-a}. If additionally f(a) = f(b), Rolle's Theorem gives f'(c) = 0.",
            beforeTex: "f\\text{ continuous on }[a,b],\\text{ differentiable on }(a,b)",
            afterTex: "f'(c) = \\frac{f(b)-f(a)}{b-a}\\quad\\text{for some }c\\in(a,b)\\quad(\\text{Rolle's: }f(a)=f(b)\\Rightarrow f'(c)=0)",
            whatChanges:
              "Once continuity on [a,b] and differentiability on (a,b) hold, equate the derivative f'(c) to the secant slope (f(b)-f(a))/(b-a) and solve for c strictly inside (a,b).",
            examTrap:
              "Even a single sharp corner or vertical asymptote inside (a,b) invalidates MVT — always state both hypotheses before solving for c.",
            workedExample: [
              {
                tex: "f(x) = x^3 - x \\text{ on } [0,2]:\\; f \\text{ is continuous on } [0,2] \\text{ and differentiable on } (0,2).",
                note: "Step 1: Verify and write down both MVT hypotheses for the polynomial f(x)."
              },
              {
                tex: "\\frac{f(2)-f(0)}{2-0} = \\frac{(8-2)-0}{2} = 3,\\qquad f'(c) = 3c^2 - 1",
                note: "Step 2: Compute the average secant slope across [0,2] and the derivative f'(c)."
              },
              {
                tex: "3c^2 - 1 = 3 \\implies c^2 = \\frac{4}{3} \\implies c = \\frac{2}{\\sqrt{3}} \\in (0,2)\\quad(\\text{reject }-\\frac{2}{\\sqrt{3}}\\notin(0,2))",
                note: "Step 3: Solve f'(c) = 3 and keep only the root that lies strictly inside (0,2)."
              }
            ],
            lessonId: "cram-04-extrema-mvt"
          },
          {
            id: "card-3-3-shape-tests",
            tag: "§3.3 · f' & f'' Shape Test",
            title: "First & Second Derivative Tests + Inflection Points",
            definition:
              "First Derivative Test: at a continuous critical point c, f' changing + to - gives a local max; - to + gives a local min. Second Derivative Test: if f'(c)=0 and f''(c)<0 (concave down), f(c) is a local max; if f''(c)>0 (concave up), f(c) is a local min.",
            beforeTex: "\\text{Critical }f'(c)=0:\\quad f''(c)<0\\text{ vs }f''(c)>0,\\qquad f''(x)=0\\text{ or DNE}",
            afterTex: "f''(c)<0\\Rightarrow\\text{Local Max},\\quad f''(c)>0\\Rightarrow\\text{Local Min},\\quad f''\\text{ sign flip}\\Rightarrow\\text{Inflection}",
            whatChanges:
              "Sign chart of f' gives increasing/decreasing intervals and local extrema; sign chart of f'' gives concave up (f''>0) vs concave down (f''<0) and inflection points where concavity changes.",
            examTrap:
              "f''(c)=0 alone does NOT guarantee an inflection point (for example y=x^4 has f''(0)=0 but stays concave up); f''(x) must actually flip sign across x=c.",
            workedExample: [
              {
                tex: "f(x) = x^4 - 4x^3 \\implies f'(x) = 4x^3 - 12x^2 = 4x^2(x-3) = 0 \\implies x = 0,\\, 3",
                note: "Find critical numbers: f'(x) < 0 on (-\\infty,0) and (0,3), and f'(x) > 0 on (3,\\infty)."
              },
              {
                tex: "\\text{At } x=0,\\; f' \\text{ stays } - \\to - \\text{ (no extremum)};\\quad \\text{at } x=3,\\; f' \\text{ changes } - \\to + \\implies \\text{local min } f(3)=-27",
                note: "By the First Derivative Test, x = 0 is a horizontal-tangent shelf, while x = 3 is a local min."
              },
              {
                tex: "f''(x) = 12x^2 - 24x = 12x(x-2) = 0 \\implies \\text{sign flips at } x=0 \\text{ and } x=2 \\implies \\text{inflection pts } (0,0), (2,-16)",
                note: "f'' changes sign across both x = 0 and x = 2, giving two inflection points."
              }
            ],
            lessonId: "cram-05-concavity-shape"
          },
          {
            id: "card-3-4-neg-infinity-trap",
            tag: "§3.4 · Limits at ±∞ Trap",
            title: "The x → −∞ Square-Root Sign Trap: √(x²) = |x| = −x",
            definition:
              "For any real number x, \\sqrt{x^2} = |x|. Therefore \\sqrt{x^2} = +x when x > 0 (as x \\to +\\infty), but \\sqrt{x^2} = -x when x < 0 (as x \\to -\\infty). For rational/radical quotients, divide top and bottom by the highest power of x in the denominator.",
            beforeTex: "\\lim_{x\\to -\\infty}\\frac{\\sqrt{ax^2+b}}{cx+d}\\quad\\text{where }x<0",
            afterTex: "\\sqrt{x^2\\!\\left(a+\\frac{b}{x^2}\\right)}=|x|\\sqrt{a+\\frac{b}{x^2}}=-x\\sqrt{a+\\frac{b}{x^2}}\\;\\Longrightarrow\\;\\text{limit}=-\\frac{\\sqrt{a}}{c}",
            whatChanges:
              "Factoring x^2 out of a square root produces |x|; when x approaches -\\infty, x is negative, so |x| must be replaced by -x before cancelling x between numerator and denominator.",
            examTrap:
              "Writing \\sqrt{x^2}=x when x\\to -\\infty is the #1 Ch 3 exam mistake and makes your horizontal asymptote have the wrong sign.",
            workedExample: [
              {
                tex: "\\lim_{x\\to -\\infty}\\frac{\\sqrt{9x^2+2}}{3x-5} = \\lim_{x\\to -\\infty}\\frac{|x|\\sqrt{9+2/x^2}}{x(3-5/x)}",
                note: "Factor x^2 out of the square root as |x| and factor x from the denominator."
              },
              {
                tex: "= \\lim_{x\\to -\\infty}\\frac{-x\\sqrt{9+2/x^2}}{x(3-5/x)} = \\lim_{x\\to -\\infty}\\frac{-\\sqrt{9+2/x^2}}{3-5/x} \\quad (\\text{since } x<0 \\implies |x|=-x)",
                note: "Replace |x| with -x because x < 0 as x \\to -\\infty, then cancel x."
              },
              {
                tex: "= \\frac{-\\sqrt{9+0}}{3-0} = -\\frac{3}{3} = -1",
                note: "Use 2/x^2 \\to 0 and 5/x \\to 0 as x \\to -\\infty to obtain the horizontal asymptote y = -1."
              }
            ],
            lessonId: "cram-06-neg-infinity-trap"
          },
          {
            id: "card-3-5-curve-sketching",
            tag: "§3.5 · Curve Sketching",
            title: "Complete Curve Sketching Blueprint (Domain, Asymptotes, f', f'')",
            definition:
              "Stewart's Curve-Sketching Checklist: (A) Domain, (B) Intercepts, (C) Symmetry (even/odd), (D) Horizontal & Vertical Asymptotes, (E) Intervals of Increase/Decrease & Local Extrema via f', (F) Concavity & Inflection Points via f''.",
            beforeTex: "f(x)=\\frac{2x^2}{x^2-1},\\qquad f'(x)=\\frac{-4x}{(x^2-1)^2},\\qquad f''(x)=\\frac{12x^2+4}{(x^2-1)^3}",
            afterTex: "\\text{VA: }x=\\pm 1,\\quad \\text{HA: }y=2,\\quad \\text{Local Max: }f(0)=0,\\quad \\text{CU on }|x|>1,\\; \\text{CD on }(-1,1)",
            whatChanges:
              "Combine domain/asymptote analysis from Ch 1 & §3.4 with the sign charts of f'(x) and f''(x) from §3.3; notice that f'(x) and f''(x) can change sign across vertical asymptotes as well as critical/inflection points.",
            examTrap:
              "Always include vertical asymptotes on your f' and f'' sign charts! Here f''(x) = (12x^2+4)/(x^2-1)^3 is never 0, yet concavity flips across x = -1 and x = 1 (which are VAs, NOT inflection points).",
            workedExample: [
              {
                tex: "\\text{Domain of } f(x)=\\frac{2x^2}{x^2-1}:\\; x\\ne \\pm 1;\\quad \\text{VA: } x=-1,\\, x=1;\\quad \\text{HA: } \\lim_{x\\to\\pm\\infty}\\frac{2}{1-1/x^2}=2",
                note: "Step 1: Find domain restrictions, vertical asymptotes x = \\pm 1, and horizontal asymptote y = 2."
              },
              {
                tex: "f'(x)=\\frac{-4x}{(x^2-1)^2}=0 \\implies x=0;\\quad f'>0 \\text{ on } (-\\infty,-1)\\cup(-1,0),\\; f'<0 \\text{ on } (0,1)\\cup(1,\\infty)",
                note: "Step 2: Since (x^2-1)^2 > 0 for x \\ne \\pm 1, the sign of f' is governed by -4x; local max f(0)=0."
              },
              {
                tex: "f''(x)=\\frac{12x^2+4}{(x^2-1)^3}:\\; f''<0 \\text{ on } (-1,1) \\text{ (CD)},\\; f''>0 \\text{ on } (-\\infty,-1)\\cup(1,\\infty) \\text{ (CU)}",
                note: "Step 3: 12x^2+4 > 0 everywhere, so concavity flips across the VAs x = \\pm 1 (no inflection points)."
              }
            ],
            lessonId: "cram-10-curve-sketching"
          }
        ]
      }
    ]
  };

  global.EXAM_CONCEPT_LESSONS = [
    {
      id: "cram-01-limits-ivt",
      title: "The Trig Limit & 0/0 Cancellation Pattern",
      homework: "EXAM CRAM",
      section: "1.6",
      exercise: "Cram 1",
      problem: "Evaluate lim_{x→0} sin(3x)/x by matching the inner angle step by step.",
      source_note: "Midterm Cram Walkthrough 1 · Stewart Ch 1 (§1.6 Trigonometric Limits)",
      graph: {
        kind: "function",
        expression: "sin(3*x)/x",
        variable: "x",
        base: 0,
        limitTarget: 3,
        xRange: [-2.4, 2.4],
        yRange: [-1.0, 3.6],
        holes: [{ x: 0, y: 3 }]
      },
      steps: [
        {
          title: "Check direct substitution for the 0/0 form",
          why: "Before applying any algebraic or trigonometric trick, substitute x = 0 into the numerator and denominator to verify that we have an indeterminate 0/0 form.",
          narration: "First, check direct substitution at x equals 0: sine of 0 is 0 in the numerator, and x is 0 in the denominator, giving the indeterminate form 0 over 0.",
          parts: [
            { id: "s1", tex: "\\lim_{x\\to 0}\\frac{\\sin(3x)}{x} \\;\\xrightarrow{\\text{plug in } x=0}\\; \\frac{\\sin(0)}{0} = \\frac{0}{0}\\;\\text{ (indeterminate)}" }
          ]
        },
        {
          title: "Multiply and divide by 3 to match the inner angle 3x",
          why: "The fundamental trigonometric limit requires the denominator to match the exact argument inside sine. Since the angle is 3x, we multiply numerator and denominator by 3.",
          narration: "Because the angle inside sine is 3x, multiply the numerator and denominator by 3 so that the denominator becomes the exact matching angle 3x.",
          parts: [
            { id: "s2", tex: "\\lim_{x\\to 0}\\frac{\\sin(3x)}{x} = \\lim_{x\\to 0}\\left(3\\cdot\\frac{\\sin(3x)}{3x}\\right)" }
          ]
        },
        {
          title: "Factor out the constant 3 using the Constant Multiple Law",
          why: "By the Limit Laws, a constant factor can be pulled in front of the limit provided the remaining limit exists.",
          narration: "Next, pull the constant factor 3 out in front of the limit using the Constant Multiple Limit Law.",
          parts: [
            { id: "s3", tex: "= 3\\cdot\\lim_{x\\to 0}\\frac{\\sin(3x)}{3x}" }
          ]
        },
        {
          title: "Change variable u = 3x and apply lim_{u→0} (sin u)/u = 1",
          why: "Let u = 3x. As x → 0, we also have u → 0, so the fundamental trigonometric limit gives lim_{u→0} (sin u)/u = 1.",
          narration: "Let u equal 3x. As x approaches 0, u also approaches 0, so the limit of sine u over u equals 1.",
          parts: [
            { id: "s4", tex: "\\text{Let } u = 3x \\;(\\text{as } x\\to 0,\\; u\\to 0): \\qquad 3\\cdot\\lim_{u\\to 0}\\frac{\\sin u}{u} = 3\\cdot 1" }
          ]
        },
        {
          title: "State the final limit",
          why: "Multiplying 3 by 1 gives the exact limit 3, matching the height of the removable hole at (0, 3) on the graph.",
          narration: "Multiplying 3 times 1 gives our final answer: the limit as x approaches 0 of sine 3x over x equals 3.",
          parts: [
            { id: "s5", tex: "\\lim_{x\\to 0}\\frac{\\sin(3x)}{x} = 3" }
          ]
        }
      ]
    },
    {
      id: "cram-02-chain-product",
      title: "Chain Rule Outer-to-Inner Peeling",
      homework: "EXAM CRAM",
      section: "2.5",
      exercise: "Cram 2",
      problem: "Differentiate f(x) = cos(x² + 1) step by step using the Chain Rule and find the slope at x = 1.",
      source_note: "Midterm Cram Walkthrough 2 · Stewart Ch 2 (§2.5 The Chain Rule)",
      graph: {
        kind: "function",
        expression: "cos(x^2+1)",
        derivative: "-2*x*sin(x^2+1)",
        tangent: true,
        variable: "x",
        base: 1,
        tangentSlope: -1.81859,
        xRange: [-2.2, 2.2],
        yRange: [-1.4, 1.4]
      },
      steps: [
        {
          title: "Decompose the composite function into outer and inner layers",
          why: "Writing f(x) = g(h(x)) with outer function g(u) = cos(u) and inner function u = h(x) = x² + 1 prevents the common mistake of differentiating both layers at once.",
          narration: "First, identify the two layers of the composite function: the outer function is cosine of u, and the inner function is u equals x-squared plus 1.",
          parts: [
            { id: "s1", tex: "f(x) = \\cos(x^2+1), \\qquad \\text{outer: } g(u)=\\cos u, \\qquad \\text{inner: } u=h(x)=x^2+1" }
          ]
        },
        {
          title: "Set up the Chain Rule formula",
          why: "By the Chain Rule, d/dx[g(h(x))] = g'(h(x)) · h'(x): differentiate the outer function at the undisturbed inner function, then multiply by the derivative of the inner function.",
          narration: "Write out the Chain Rule structure: differentiate the outer cosine evaluated at x-squared plus 1, and multiply by d-by-dx of x-squared plus 1.",
          parts: [
            { id: "s2", tex: "f'(x) = \\frac{d}{du}[\\cos u]\\Big|_{u=x^2+1} \\cdot \\frac{d}{dx}(x^2+1)" }
          ]
        },
        {
          title: "Differentiate the outer cosine shell while keeping u unchanged",
          why: "Since d/du[cos u] = -sin u, the outer derivative is -sin(x² + 1) with the inner polynomial x² + 1 copied verbatim inside.",
          narration: "Differentiate the outer cosine into negative sine while keeping x-squared plus 1 untouched inside the parentheses.",
          parts: [
            { id: "s3", tex: "f'(x) = -\\sin(x^2+1)\\cdot \\frac{d}{dx}(x^2+1)" }
          ]
        },
        {
          title: "Differentiate the inner polynomial and simplify",
          why: "By the Power and Sum Rules, d/dx(x² + 1) = 2x + 0 = 2x. Moving 2x to the front avoids any ambiguity with the sine argument.",
          narration: "Now differentiate the inner polynomial x-squared plus 1 to get 2x, and place negative 2x in front of the sine factor.",
          parts: [
            { id: "s4", tex: "f'(x) = -\\sin(x^2+1)\\cdot(2x) = -2x\\sin(x^2+1)" }
          ]
        },
        {
          title: "Evaluate the derivative slope at the base point x = 1",
          why: "Substituting x = 1 gives the exact instantaneous rate of change f'(1) = -2 sin(2) ≈ -1.82.",
          narration: "Evaluating at x equals 1 gives the exact tangent slope: f-prime of 1 equals negative 2 sine of 2, or approximately negative 1.82.",
          parts: [
            { id: "s5", tex: "f'(1) = -2(1)\\sin(1^2+1) = -2\\sin(2) \\approx -1.819" }
          ]
        }
      ]
    },
    {
      id: "cram-03-implicit-linear",
      title: "Implicit Differentiation & Linearization Blueprint",
      homework: "EXAM CRAM",
      section: "2.6 & 2.9",
      exercise: "Cram 3",
      problem: "For x² + y³ = 9, find dy/dx by implicit differentiation and build the linearization L(x) at (1, 2).",
      source_note: "Midterm Cram Walkthrough 3 · Stewart Ch 2 (§2.6 Implicit Diff & §2.9 Linearization)",
      graph: {
        kind: "function",
        expression: "(9-x^2)^(1/3)",
        derivative: "-2*x/(3*(9-x^2)^(2/3))",
        tangent: true,
        variable: "x",
        base: 1,
        tangentSlope: -0.1666667,
        xRange: [-2.4, 2.6],
        yRange: [0.4, 2.7]
      },
      steps: [
        {
          title: "Differentiate both sides of the equation with respect to x",
          why: "Treat y = y(x) as an implicit function of x and apply the operator d/dx to every term on both sides of x² + y³ = 9.",
          narration: "Start by applying the derivative operator d-by-dx to every term on both sides of the equation x-squared plus y-cubed equals 9.",
          parts: [
            { id: "s1", tex: "\\frac{d}{dx}(x^2) + \\frac{d}{dx}(y^3) = \\frac{d}{dx}(9)" }
          ]
        },
        {
          title: "Apply the Chain Rule to y³",
          why: "Because y depends on x, differentiating y³ with respect to x gives 3y² multiplied by the chain factor dy/dx, while the constant 9 differentiates to 0.",
          narration: "The derivative of x-squared is 2x, the derivative of y-cubed is 3 y-squared times dy-dx by the Chain Rule, and the derivative of 9 is 0.",
          parts: [
            { id: "s2", tex: "2x + 3y^2\\,\\frac{dy}{dx} = 0" }
          ]
        },
        {
          title: "Isolate dy/dx algebraically",
          why: "Subtract 2x from both sides and divide by 3y² (for y ≠ 0) to solve for the derivative dy/dx in terms of x and y.",
          narration: "Subtract 2x from both sides and divide by 3 y-squared to isolate dy-dx equals negative 2x over 3 y-squared.",
          parts: [
            { id: "s3", tex: "3y^2\\,\\frac{dy}{dx} = -2x \\quad\\Longrightarrow\\quad \\frac{dy}{dx} = -\\frac{2x}{3y^2}" }
          ]
        },
        {
          title: "Evaluate the tangent slope at (x, y) = (1, 2)",
          why: "Substitute both coordinates x = 1 and y = 2 of the point (1, 2) into the formula for dy/dx.",
          narration: "Substitute x equals 1 and y equals 2 into dy-dx: negative 2 times 1 over 3 times 2-squared simplifies to negative 2 over 12, or negative one-sixth.",
          parts: [
            { id: "s4", tex: "\\left.\\frac{dy}{dx}\\right|_{(1,2)} = -\\frac{2(1)}{3(2)^2} = -\\frac{2}{12} = -\\frac{1}{6}" }
          ]
        },
        {
          title: "Write the linearization L(x) at a = 1",
          why: "Substituting a = 1, f(1) = 2, and f'(1) = -1/6 into L(x) = f(a) + f'(a)(x - a) gives the tangent line approximation near x = 1.",
          narration: "Finally, plug f of 1 equals 2 and slope negative one-sixth into the linearization formula L of x equals f of a plus f-prime of a times x minus a.",
          parts: [
            { id: "s5", tex: "L(x) = f(1) + f'(1)(x-1) = 2 - \\frac{1}{6}(x-1)" }
          ]
        }
      ]
    },
    {
      id: "cram-04-extrema-mvt",
      title: "Mean Value Theorem (MVT) Full Exam Justification",
      homework: "EXAM CRAM",
      section: "3.1 & 3.2",
      exercise: "Cram 4",
      problem: "Verify the hypotheses of the Mean Value Theorem for f(x) = x² on [0, 2] and find c ∈ (0, 2).",
      source_note: "Midterm Cram Walkthrough 4 · Stewart Ch 3 (§3.2 The Mean Value Theorem)",
      graph: {
        kind: "function",
        expression: "x^2",
        derivative: "2*x",
        tangent: true,
        variable: "x",
        base: 1,
        tangentSlope: 2,
        xRange: [-0.4, 2.4],
        yRange: [-0.5, 4.8]
      },
      steps: [
        {
          title: "State and verify the two MVT hypotheses",
          why: "Full credit on an MVT problem requires explicitly stating that f is continuous on the closed interval [0, 2] and differentiable on the open interval (0, 2).",
          narration: "First, write down both hypotheses of the Mean Value Theorem: because f of x equals x-squared is a polynomial, it is continuous on the closed interval 0 to 2 and differentiable on the open interval 0 to 2.",
          parts: [
            { id: "s1", tex: "f(x)=x^2 \\text{ is a polynomial} \\implies \\text{(1) continuous on } [0,2] \\text{ and (2) differentiable on } (0,2)." }
          ]
        },
        {
          title: "Compute the average rate of change (secant slope) across [0, 2]",
          why: "Evaluate f(0) = 0 and f(2) = 4, then compute the slope of the secant line connecting (0, f(0)) and (2, f(2)).",
          narration: "Second, calculate the average rate of change across the interval: f of 2 minus f of 0, divided by 2 minus 0, equals 4 minus 0 over 2, which is 2.",
          parts: [
            { id: "s2", tex: "m_{\\text{sec}} = \\frac{f(2)-f(0)}{2-0} = \\frac{2^2 - 0^2}{2 - 0} = \\frac{4}{2} = 2" }
          ]
        },
        {
          title: "Compute the derivative f'(x) and evaluate at x = c",
          why: "By the Power Rule, f'(x) = 2x, so at an interior point x = c the instantaneous rate of change is f'(c) = 2c.",
          narration: "Third, differentiate f of x equals x-squared to get f-prime of x equals 2x, so at x equals c, f-prime of c is 2c.",
          parts: [
            { id: "s3", tex: "f'(x) = 2x \\quad\\Longrightarrow\\quad f'(c) = 2c" }
          ]
        },
        {
          title: "Set f'(c) equal to the secant slope and solve for c",
          why: "By the Mean Value Theorem, there exists c in (0, 2) such that f'(c) = (f(2) - f(0))/(2 - 0).",
          narration: "Set the instantaneous slope 2c equal to the average secant slope 2, and divide by 2 to get c equals 1.",
          parts: [
            { id: "s4", tex: "f'(c) = \\frac{f(2)-f(0)}{2-0} \\quad\\Longrightarrow\\quad 2c = 2 \\quad\\Longrightarrow\\quad c = 1" }
          ]
        },
        {
          title: "Confirm that c lies strictly inside the open interval (0, 2)",
          why: "Always verify that your solution c belongs to the open interval (a, b); here c = 1 ∈ (0, 2).",
          narration: "Finally, confirm that c equals 1 lies strictly inside the open interval 0 to 2, completing the verification.",
          parts: [
            { id: "s5", tex: "c = 1 \\in (0,2) \\quad \\text{with} \\quad f'(1) = 2 = \\frac{f(2)-f(0)}{2-0}" }
          ]
        }
      ]
    },
    {
      id: "cram-05-concavity-shape",
      title: "First & Second Derivative Test (f' vs f'')",
      homework: "EXAM CRAM",
      section: "3.3",
      exercise: "Cram 5",
      problem: "Find all intervals of increase/decrease, local extrema, concavity, and inflection points of f(x) = x³ − 3x.",
      source_note: "Midterm Cram Walkthrough 5 · Stewart Ch 3 (§3.3 How Derivatives Affect the Shape of a Graph)",
      graph: {
        kind: "function",
        expression: "x^3-3*x",
        derivative: "3*x^2-3",
        tangent: true,
        variable: "x",
        base: 1,
        tangentSlope: 0,
        xRange: [-2.3, 2.3],
        yRange: [-3.5, 3.5]
      },
      steps: [
        {
          title: "Differentiate f(x) and factor f'(x) to find critical numbers",
          why: "Critical numbers occur where f'(x) = 0 or f'(x) DNE. Factoring f'(x) completely makes sign-chart testing straightforward.",
          narration: "First, differentiate f of x equals x-cubed minus 3x to get f-prime of x equals 3x-squared minus 3. Factor out 3 to get 3 times x minus 1 times x plus 1, giving critical numbers x equals negative 1 and x equals 1.",
          parts: [
            { id: "s1", tex: "f'(x) = 3x^2 - 3 = 3(x-1)(x+1) = 0 \\quad\\Longrightarrow\\quad x = -1,\\; x = 1" }
          ]
        },
        {
          title: "Analyze the sign of f'(x) for increasing/decreasing intervals",
          why: "Testing intervals (-∞, -1), (-1, 1), and (1, ∞) in f'(x) = 3(x-1)(x+1) determines where f is increasing (f' > 0) and decreasing (f' < 0).",
          narration: "Test the sign of f-prime on each interval: f-prime is positive on negative infinity to negative 1 and on 1 to infinity, and negative on negative 1 to 1.",
          parts: [
            { id: "s2", tex: "f'(x) > 0 \\text{ on } (-\\infty,-1) \\text{ and } (1,\\infty) \\implies f \\uparrow; \\qquad f'(x) < 0 \\text{ on } (-1,1) \\implies f \\downarrow" }
          ]
        },
        {
          title: "Compute the second derivative f''(x)",
          why: "Differentiating f'(x) = 3x² - 3 gives f''(x) = 6x, which measures concavity and lets us apply the Second Derivative Test at x = ±1.",
          narration: "Next, differentiate f-prime to find the second derivative: f-double-prime of x equals 6x.",
          parts: [
            { id: "s3", tex: "f''(x) = \\frac{d}{dx}(3x^2 - 3) = 6x" }
          ]
        },
        {
          title: "Evaluate the slope & classify local extrema via Second Derivative Test",
          why: "At x = -1, f''(-1) = -6 < 0 (concave down) so f(-1) = 2 is a local maximum; at x = 1, f''(1) = 6 > 0 (concave up) so f(1) = -2 is a local minimum.",
          narration: "Evaluate f-double-prime at each critical number: f-double-prime of negative 1 is negative 6, giving a local maximum of 2 at x equals negative 1; f-double-prime of 1 is positive 6, giving a local minimum of negative 2 at x equals 1.",
          parts: [
            { id: "s4", tex: "f''(-1)=-6<0 \\implies \\text{local max } f(-1)=2; \\qquad f''(1)=6>0 \\implies \\text{local min } f(1)=-2" }
          ]
        },
        {
          title: "Find concavity intervals and the inflection point",
          why: "f''(x) = 6x = 0 at x = 0 and changes sign from negative (concave down on (-∞, 0)) to positive (concave up on (0, ∞)), so (0, 0) is an inflection point.",
          narration: "Finally, since f-double-prime equals 6x changes sign from negative to positive across x equals 0, the graph is concave down on negative infinity to 0, concave up on 0 to infinity, with an inflection point at 0, comma 0.",
          parts: [
            { id: "s5", tex: "f''(x)<0 \\text{ on } (-\\infty,0) \\text{ (CD)},\\quad f''(x)>0 \\text{ on } (0,\\infty) \\text{ (CU)} \\implies \\text{Inflection Point at } (0,0)" }
          ]
        }
      ]
    },
    {
      id: "cram-06-neg-infinity-trap",
      title: "The −∞ Square-Root Sign Trap (√(x²) = −x)",
      homework: "EXAM CRAM",
      section: "3.4",
      exercise: "Cram 6",
      problem: "Evaluate lim_{x→−∞} √(4x² + 1)/(x − 1) by properly handling √(x²) = |x| = −x for x < 0.",
      source_note: "Midterm Cram Walkthrough 6 · Stewart Ch 3 (§3.4 Limits at Infinity & Horizontal Asymptotes)",
      graph: {
        kind: "function",
        expression: "sqrt(4*x^2+1)/(x-1)",
        variable: "x",
        base: -4,
        limitTarget: -2,
        xRange: [-8, -0.2],
        yRange: [-3.2, -1.2]
      },
      steps: [
        {
          title: "Factor x² inside the square root and x in the denominator",
          why: "To resolve an ∞/(-∞) limit involving a square root, factor the highest power x² out of the radicand and x out of the linear denominator.",
          narration: "Start by factoring x-squared out of 4x-squared plus 1 inside the square root, and factoring x out of x minus 1 in the denominator.",
          parts: [
            { id: "s1", tex: "\\lim_{x\\to -\\infty}\\frac{\\sqrt{4x^2+1}}{x-1} = \\lim_{x\\to -\\infty}\\frac{\\sqrt{x^2\\left(4+\\frac{1}{x^2}\\right)}}{x\\left(1-\\frac{1}{x}\\right)}" }
          ]
        },
        {
          title: "Split the radical using √(x² · A) = √(x²) · √A = |x| √A",
          why: "For all real x, √(x²) equals |x| (which is non-negative), NOT x.",
          narration: "Next, bring x-squared outside the square root as the absolute value of x: the square root of x-squared equals absolute value of x.",
          parts: [
            { id: "s2", tex: "= \\lim_{x\\to -\\infty}\\frac{\\sqrt{x^2}\\,\\sqrt{4+\\frac{1}{x^2}}}{x\\left(1-\\frac{1}{x}\\right)} = \\lim_{x\\to -\\infty}\\frac{|x|\\,\\sqrt{4+\\frac{1}{x^2}}}{x\\left(1-\\frac{1}{x}\\right)}" }
          ]
        },
        {
          title: "Use x < 0 (since x → −∞) to replace |x| with −x",
          why: "Because x is approaching -∞, we are in the region x < 0 where the definition of absolute value states |x| = -x.",
          narration: "Because x approaches negative infinity, x is negative, so by definition the absolute value of x equals negative x.",
          parts: [
            { id: "s3", tex: "\\text{Since } x\\to -\\infty \\implies x < 0,\\text{ we have } |x| = -x: \\qquad = \\lim_{x\\to -\\infty}\\frac{-x\\,\\sqrt{4+\\frac{1}{x^2}}}{x\\left(1-\\frac{1}{x}\\right)}" }
          ]
        },
        {
          title: "Cancel the common factor x between numerator and denominator",
          why: "Dividing numerator and denominator by x (for x ≠ 0) cancels x while leaving the negative sign in the numerator.",
          narration: "Cancel the common factor x from the numerator and denominator, keeping the negative sign in front of the radical.",
          parts: [
            { id: "s4", tex: "= \\lim_{x\\to -\\infty}\\frac{-\\sqrt{4+\\frac{1}{x^2}}}{1-\\frac{1}{x}}" }
          ]
        },
        {
          title: "Evaluate the limit using 1/x → 0 and 1/x² → 0",
          why: "As x → -∞, the reciprocal terms 1/x and 1/x² both vanish to 0, leaving -√4 / 1 = -2 (horizontal asymptote y = -2 as x → -∞).",
          narration: "Finally, let x approach negative infinity: both 1 over x and 1 over x-squared go to 0, leaving negative square root of 4 over 1, which equals negative 2.",
          parts: [
            { id: "s5", tex: "= \\frac{-\\sqrt{4+0}}{1-0} = -2 \\quad (\\text{horizontal asymptote } y=-2 \\text{ as } x\\to -\\infty)" }
          ]
        }
      ]
    },
    {
      id: "cram-07-ivt-root-proof",
      title: "IVT Root Existence Proof (Full-Credit Exam Write-Up)",
      homework: "EXAM CRAM",
      section: "1.8",
      exercise: "Cram 7",
      problem: "Prove that the equation x³ + x − 1 = 0 has at least one real root in the interval (0, 1).",
      source_note: "Midterm Cram Walkthrough 7 · Stewart Ch 1 (§1.8 Continuity & Intermediate Value Theorem)",
      graph: {
        kind: "function",
        expression: "x^3+x-1",
        derivative: "3*x^2+1",
        tangent: true,
        variable: "x",
        base: 0.6823278,
        tangentSlope: 2.3967,
        xRange: [-0.3, 1.3],
        yRange: [-1.4, 1.4]
      },
      steps: [
        {
          title: "Define f(x) and state continuity on the closed interval [0, 1]",
          why: "The Intermediate Value Theorem requires a single function f(x) that is continuous on the closed interval [a, b]. Polynomials are continuous everywhere.",
          narration: "Step 1: Define f of x equals x-cubed plus x minus 1, and explicitly state that because f is a polynomial, it is continuous on the closed interval 0 to 1.",
          parts: [
            { id: "s1", tex: "\\text{Let } f(x) = x^3 + x - 1.\\quad \\text{Since } f \\text{ is a polynomial, } f \\text{ is continuous on } [0, 1]." }
          ]
        },
        {
          title: "Evaluate f(x) at the left endpoint x = 0",
          why: "Substitute x = 0 into f(x) to determine the sign of f at the left endpoint of [0, 1].",
          narration: "Step 2: Evaluate f at the left endpoint x equals 0: f of 0 equals 0-cubed plus 0 minus 1, which equals negative 1, a negative number.",
          parts: [
            { id: "s2", tex: "f(0) = (0)^3 + (0) - 1 = -1 < 0" }
          ]
        },
        {
          title: "Evaluate f(x) at the right endpoint x = 1",
          why: "Substitute x = 1 into f(x) to show that f changes sign across the interval [0, 1].",
          narration: "Step 3: Evaluate f at the right endpoint x equals 1: f of 1 equals 1-cubed plus 1 minus 1, which equals positive 1.",
          parts: [
            { id: "s3", tex: "f(1) = (1)^3 + (1) - 1 = 1 > 0" }
          ]
        },
        {
          title: "Verify that the target value N = 0 lies between f(0) and f(1)",
          why: "Because f(0) = -1 < 0 and f(1) = 1 > 0, the target value N = 0 lies strictly between f(0) and f(1).",
          narration: "Step 4: Note that the target value N equals 0 lies strictly between f of 0 equals negative 1 and f of 1 equals positive 1.",
          parts: [
            { id: "s4", tex: "f(0) = -1 < 0 < 1 = f(1) \\quad (\\text{so } N = 0 \\text{ is between } f(0) \\text{ and } f(1))" }
          ]
        },
        {
          title: "Conclude by the Intermediate Value Theorem (IVT)",
          why: "By the Intermediate Value Theorem, there exists at least one number c in the open interval (0, 1) such that f(c) = 0, i.e., c³ + c - 1 = 0.",
          narration: "Step 5: Conclude by the Intermediate Value Theorem that there exists a number c in the open interval 0 to 1 such that f of c equals 0.",
          parts: [
            { id: "s5", tex: "\\therefore\\text{ By the IVT, } \\exists\\, c \\in (0, 1) \\text{ such that } f(c) = c^3 + c - 1 = 0." }
          ]
        }
      ]
    },
    {
      id: "cram-08-squeeze-theorem",
      title: "Squeeze Theorem Formal Exam Write-Up",
      homework: "EXAM CRAM",
      section: "1.6",
      exercise: "Cram 8",
      problem: "Use the Squeeze Theorem to prove that lim_{x→0} x² sin(1/x) = 0.",
      source_note: "Midterm Cram Walkthrough 8 · Stewart Ch 1 (§1.6 Calculating Limits Using the Limit Laws)",
      graph: {
        kind: "function",
        expression: "x^2*sin(1/x)",
        variable: "x",
        base: 0,
        limitTarget: 0,
        xRange: [-0.6, 0.6],
        yRange: [-0.35, 0.35],
        holes: [{ x: 0, y: 0 }]
      },
      steps: [
        {
          title: "Note why the Product Law cannot be applied directly",
          why: "As x → 0, sin(1/x) oscillates infinitely often between -1 and 1, so lim_{x→0} sin(1/x) does not exist; we cannot split the limit as a product.",
          narration: "First, observe that as x approaches 0, sine of 1 over x oscillates between negative 1 and 1 without approaching any limit, so the Product Limit Law does not apply.",
          parts: [
            { id: "s1", tex: "\\lim_{x\\to 0}\\sin\\!\\left(\\frac{1}{x}\\right) \\text{ DNE (oscillates between }-1\\text{ and }1\\text{)},\\text{ so we use the Squeeze Theorem.}" }
          ]
        },
        {
          title: "Write the universal bounds for sin(1/x) for all x ≠ 0",
          why: "The sine of any real angle always lies in the closed interval [-1, 1].",
          narration: "Start your formal write-up with the inequality negative 1 is less than or equal to sine of 1 over x, which is less than or equal to 1, for all x not equal to 0.",
          parts: [
            { id: "s2", tex: "-1 \\le \\sin\\!\\left(\\frac{1}{x}\\right) \\le 1 \\qquad \\text{for all } x \\ne 0" }
          ]
        },
        {
          title: "Multiply all three parts of the inequality by x² ≥ 0",
          why: "Because x² > 0 for all x ≠ 0, multiplying the inequality by x² preserves the direction of both ≤ signs.",
          narration: "Multiply all three parts of the inequality by x-squared. Since x-squared is positive for all non-zero x, the inequality signs do not flip.",
          parts: [
            { id: "s3", tex: "-x^2 \\le x^2\\sin\\!\\left(\\frac{1}{x}\\right) \\le x^2 \\qquad (\\text{since } x^2 > 0 \\text{ for } x \\ne 0)" }
          ]
        },
        {
          title: "Evaluate the limits of the lower and upper bounding functions as x → 0",
          why: "Both outer bounding functions g(x) = -x² and h(x) = x² are polynomials whose limits as x → 0 equal 0.",
          narration: "Next, evaluate the limit as x approaches 0 of the lower bound negative x-squared and the upper bound positive x-squared: both limits equal 0.",
          parts: [
            { id: "s4", tex: "\\lim_{x\\to 0}(-x^2) = 0 \\qquad\\text{and}\\qquad \\lim_{x\\to 0}(x^2) = 0" }
          ]
        },
        {
          title: "Conclude by the Squeeze Theorem",
          why: "Since -x² ≤ x² sin(1/x) ≤ x² for x ≠ 0 and both outer bounds approach 0 as x → 0, the Squeeze Theorem forces the middle limit to equal 0.",
          narration: "Finally, state that by the Squeeze Theorem, the limit as x approaches 0 of x-squared times sine of 1 over x equals 0.",
          parts: [
            { id: "s5", tex: "\\therefore\\text{ By the Squeeze Theorem, } \\lim_{x\\to 0} x^2\\sin\\!\\left(\\frac{1}{x}\\right) = 0." }
          ]
        }
      ]
    },
    {
      id: "cram-09-related-rates-ladder",
      title: "Related Rates Classic Sliding Ladder Problem",
      homework: "EXAM CRAM",
      section: "2.8",
      exercise: "Cram 9",
      problem: "A 10 m ladder leans against a vertical wall. If the bottom slides away from the wall at dx/dt = 1.5 m/s, how fast is the top sliding down the wall when the bottom is x = 6 m from the wall?",
      source_note: "Midterm Cram Walkthrough 9 · Stewart Ch 2 (§2.8 Related Rates)",
      graph: {
        kind: "function",
        expression: "sqrt(100-x^2)",
        derivative: "-x/sqrt(100-x^2)",
        tangent: true,
        variable: "x",
        base: 6,
        tangentSlope: -0.75,
        xRange: [0, 10.5],
        yRange: [0, 10.5]
      },
      steps: [
        {
          title: "Write the geometric equation relating x(t) and y(t) for all time t",
          why: "Let x(t) be the horizontal distance from the wall to the base of the ladder and y(t) be the height of the top on the wall. By the Pythagorean Theorem, x² + y² = 10².",
          narration: "First, relate the changing horizontal distance x and vertical height y using the Pythagorean Theorem: x-squared plus y-squared equals 10-squared, or 100.",
          parts: [
            { id: "s1", tex: "x^2 + y^2 = 10^2 = 100 \\qquad \\left(\\text{given } \\frac{dx}{dt} = 1.5\\text{ m/s};\\text{ find } \\frac{dy}{dt} \\text{ when } x = 6\\text{ m}\\right)" }
          ]
        },
        {
          title: "Differentiate both sides with respect to time t using the Chain Rule",
          why: "Never substitute x = 6 before differentiating! Differentiating x(t)² and y(t)² with respect to t produces 2x(dx/dt) and 2y(dy/dt), while 100 differentiates to 0.",
          narration: "Second, differentiate both sides with respect to time t before plugging in x equals 6: we get 2x times dx-dt, plus 2y times dy-dt, equals 0.",
          parts: [
            { id: "s2", tex: "\\frac{d}{dt}(x^2 + y^2) = \\frac{d}{dt}(100) \\quad\\Longrightarrow\\quad 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0" }
          ]
        },
        {
          title: "Solve the rate equation for the unknown rate dy/dt",
          why: "Divide by 2 and isolate dy/dt in terms of x, y, and dx/dt.",
          narration: "Divide through by 2 and solve for dy-dt: dy-dt equals negative x over y, times dx-dt.",
          parts: [
            { id: "s3", tex: "x\\frac{dx}{dt} + y\\frac{dy}{dt} = 0 \\quad\\Longrightarrow\\quad \\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt}" }
          ]
        },
        {
          title: "Use the Pythagorean equation to find y at the snapshot instant x = 6",
          why: "At the specific instant when x = 6 m, substitute x = 6 into x² + y² = 100 to find y = 8 m.",
          narration: "Now find y at the snapshot instant when x equals 6: 6-squared plus y-squared equals 100 gives y equals the square root of 64, which is 8 meters.",
          parts: [
            { id: "s4", tex: "\\text{When } x = 6:\\quad 6^2 + y^2 = 100 \\implies y^2 = 64 \\implies y = 8\\text{ m}" }
          ]
        },
        {
          title: "Evaluate the slope & substitute x = 6, y = 8, and dx/dt = 1.5 m/s",
          why: "Plugging the snapshot numbers into dy/dt = -(x/y)(dx/dt) gives dy/dt = -9/8 = -1.125 m/s (negative because height y is decreasing).",
          narration: "Finally, substitute x equals 6, y equals 8, and dx-dt equals 1.5 into our rate formula to get dy-dt equals negative 9 over 8, or negative 1.125 meters per second.",
          parts: [
            { id: "s5", tex: "\\frac{dy}{dt} = -\\frac{6}{8}(1.5) = -\\frac{3}{4}\\cdot\\frac{3}{2} = -\\frac{9}{8}\\text{ m/s} = -1.125\\text{ m/s}" }
          ]
        }
      ]
    },
    {
      id: "cram-10-curve-sketching",
      title: "Complete Curve Sketching & Asymptotes (§3.5)",
      homework: "EXAM CRAM",
      section: "3.5",
      exercise: "Cram 10",
      problem: "Perform a complete curve-sketching analysis of f(x) = 2x²/(x² − 1): find domain, asymptotes, intervals of increase/decrease, local extrema, and concavity.",
      source_note: "Midterm Cram Walkthrough 10 · Stewart Ch 3 (§3.5 Summary of Curve Sketching)",
      graph: {
        kind: "function",
        expression: "(2*x^2)/(x^2-1)",
        derivative: "(-4*x)/((x^2-1)^2)",
        tangent: true,
        variable: "x",
        base: 0,
        tangentSlope: 0,
        xRange: [-3.2, 3.2],
        yRange: [-4.5, 5.5]
      },
      steps: [
        {
          title: "Find the domain, symmetry, intercept, and vertical asymptotes",
          why: "The denominator x² - 1 = (x - 1)(x + 1) vanishes at x = ±1, where the numerator 2x² = 2 ≠ 0, producing vertical asymptotes at x = -1 and x = 1.",
          narration: "Step 1: Factor the denominator as x minus 1 times x plus 1. The domain is all x except plus or minus 1, with vertical asymptotes at x equals negative 1 and x equals 1, and intercept 0, comma 0.",
          parts: [
            { id: "s1", tex: "f(x)=\\frac{2x^2}{(x-1)(x+1)}:\\quad \\mathrm{Dom}(f)=\\{x\\mid x\\ne \\pm 1\\},\\quad \\text{VA: } x=-1,\\; x=1,\\quad f(0)=0" }
          ]
        },
        {
          title: "Find the horizontal asymptote by taking the limit as x → ±∞",
          why: "Divide numerator and denominator by the highest power x² to evaluate lim_{x→±∞} f(x).",
          narration: "Step 2: Divide numerator and denominator by x-squared. As x approaches plus or minus infinity, 1 over x-squared goes to 0, giving the horizontal asymptote y equals 2.",
          parts: [
            { id: "s2", tex: "\\lim_{x\\to \\pm\\infty}\\frac{2x^2}{x^2-1} = \\lim_{x\\to \\pm\\infty}\\frac{2}{1 - 1/x^2} = \\frac{2}{1-0} = 2 \\quad\\Longrightarrow\\quad \\text{HA: } y = 2" }
          ]
        },
        {
          title: "Compute f'(x) via Quotient Rule and find critical numbers",
          why: "Differentiating f(x) = 2x²/(x² - 1) gives f'(x) = -4x/(x² - 1)², which equals 0 only at x = 0 (since x = ±1 are not in the domain).",
          narration: "Step 3: Apply the Quotient Rule to find f-prime of x: 4x times x-squared minus 1, minus 2x-squared times 2x, over x-squared minus 1 quantity squared, which simplifies to negative 4x over x-squared minus 1 squared.",
          parts: [
            { id: "s3", tex: "f'(x) = \\frac{4x(x^2-1) - 2x^2(2x)}{(x^2-1)^2} = \\frac{-4x}{(x^2-1)^2} = 0 \\quad\\Longrightarrow\\quad \\text{critical number } x = 0" }
          ]
        },
        {
          title: "Evaluate the slope & apply First Derivative Test for monotonicity and local extrema",
          why: "Because (x² - 1)² > 0 for all x ≠ ±1, the sign of f'(x) matches the sign of -4x: positive for x < 0 (x ≠ -1) and negative for x > 0 (x ≠ 1).",
          narration: "Step 4: Since the squared denominator is always positive away from plus or minus 1, f-prime is positive for x less than 0 and negative for x greater than 0, giving a local maximum f of 0 equals 0.",
          parts: [
            { id: "s4", tex: "f' > 0 \\text{ on } (-\\infty,-1)\\cup(-1,0) \\;(f\\uparrow);\\quad f' < 0 \\text{ on } (0,1)\\cup(1,\\infty) \\;(f\\downarrow);\\quad \\text{local max } f(0)=0" }
          ]
        },
        {
          title: "Compute f''(x) to determine concavity",
          why: "In f''(x) = (12x² + 4)/(x² - 1)³, the numerator 12x² + 4 > 0 for all x, so the sign of f''(x) matches the sign of (x² - 1)³: negative on (-1, 1) and positive for |x| > 1.",
          narration: "Step 5: The second derivative simplifies to 12x-squared plus 4 over x-squared minus 1 cubed. Since the numerator is always positive, f is concave down between negative 1 and 1, and concave up for absolute value of x greater than 1, with no inflection points.",
          parts: [
            { id: "s5", tex: "f''(x) = \\frac{12x^2+4}{(x^2-1)^3}:\\quad \\text{CD on } (-1,1),\\quad \\text{CU on } (-\\infty,-1)\\cup(1,\\infty),\\quad \\text{no inflection points}" }
          ]
        }
      ]
    }
  ];
})(window);
