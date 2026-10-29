window.CALCULUS_LESSONS = [
  {
    "id": "01-hw2-1-6-23",
    "title": "Rationalizing a Radical Limit",
    "homework": "HW 2",
    "section": "1.6",
    "exercise": "23",
    "textbook_page": 71,
    "problem": "Evaluate lim_{h→0} (sqrt(9+h)-3)/h, if it exists.",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 1.6 #23, p. 71; source manual PDF p. 5.",
    "steps": [
      {
        "title": "Read the limit",
        "why": "Rule: Direct Substitution Test for limits as h → 0. On your homework paper, always begin by writing the original limit expression and checking whether plugging in h = 0 yields a finite number or an indeterminate form.",
        "narration": "We want the limit, as h approaches zero, of the square root of 9 plus h, minus 3 — all divided by h. On the graph, watch the curve approach its open hole.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{h\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{\\sqrt{9+h}-3}{h}"
          }
        ]
      },
      {
        "title": "Substitute zero",
        "why": "Rule: Indeterminate Form Detection (0/0). Substituting h = 0 gives √(9 + 0) − 3 = 3 − 3 = 0 in the numerator and 0 in the denominator, which signals a removable discontinuity that requires algebraic rationalization before taking the limit.",
        "narration": "First, try plugging in h equals zero. Both the numerator and the denominator become zero — giving the indeterminate form, zero over zero.",
        "parts": [
          {
            "id": "sub",
            "tex": "\\frac{\\sqrt{9+0}-3}{0}"
          },
          {
            "id": "eval",
            "tex": "=\\frac{0}{0}",
            "color": "red"
          }
        ]
      },
      {
        "title": "Choose the conjugate",
        "why": "Rule: Conjugate Multiplication Identity (multiplying by 1 in the form (√(9+h)+3)/(√(9+h)+3)). Because the numerator contains √(9+h) − 3, multiply both top and bottom by its radical conjugate √(9+h) + 3 so the square root will clear without changing the value of the fraction.",
        "narration": "To clear the radical, multiply the top and bottom by the conjugate of the numerator: the square root of 9 plus h, plus 3.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{h\\to0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{\\sqrt{9+h}-3}{h}"
          },
          {
            "id": "op",
            "tex": "\\cdot"
          },
          {
            "id": "conjugate",
            "tex": "\\frac{\\sqrt{9+h}+3}{\\sqrt{9+h}+3}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Apply difference of squares",
        "why": "Rule: Difference of Squares Identity (A − B)(A + B) = A² − B² with A = √(9+h) and B = 3. Expand only the numerator into (√(9+h))² − 3² = (9 + h) − 9, and leave the denominator factored as h(√(9+h) + 3) on your exam paper so the common factor h stays visible.",
        "narration": "By the difference of squares, the numerator simplifies to: the quantity 9 plus h, minus 9. Leave the denominator factored as h, times the conjugate.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{h\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{(9+h)-9}{h(\\sqrt{9+h}+3)}"
          }
        ]
      },
      {
        "title": "Simplify the numerator",
        "why": "Rule: Additive Inverse Cancellation (9 − 9 = 0). Combining the constant terms 9 and −9 in the numerator isolates the single factor h on top, exposing the exact 0/0 culprit h/h while keeping the domain restriction h ≠ 0 explicit.",
        "narration": "In the numerator, 9 minus 9 cancels out, leaving just h — over h, times the square root of 9 plus h, plus 3.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{h\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{h}{h(\\sqrt{9+h}+3)}"
          },
          {
            "id": "warn",
            "tex": "h\\ne 0",
            "color": "red"
          }
        ]
      },
      {
        "title": "Cancel h",
        "why": "Rule: Punctured Neighborhood Limit Law (if f(h) = g(h) for all h ≠ 0 near 0, their limits as h → 0 are equal). Because h → 0 means h approaches 0 without ever equaling 0, divide out the common factor h/h = 1 to obtain the simplified rational expression 1/(√(9+h) + 3).",
        "narration": "Because a limit only inspects values of h near zero — where h is nonzero — we can safely cancel the common factor h, leaving 1 over the conjugate.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{h\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{1}{\\sqrt{9+h}+3}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Now substitute",
        "why": "Rule: Direct Substitution Property for Continuous Functions at h = 0. Now that the zero factor in the denominator has been removed, substitute h = 0 directly into 1/(√(9+h) + 3) to get 1/(√9 + 3) = 1/(3 + 3) = 1/6.",
        "narration": "Now, direct substitution works cleanly: setting h equal to zero turns the radical into 3, so the denominator becomes 3 plus 3.",
        "parts": [
          {
            "id": "sub",
            "tex": "\\frac{1}{\\sqrt{9+0}+3}"
          },
          {
            "id": "eval",
            "tex": "=\\frac{1}{6}"
          }
        ]
      },
      {
        "title": "State the limit",
        "why": "Rule: Limit Existence Conclusion & Removable Discontinuity Interpretation. Write the final boxed statement lim_{h→0} (√(9+h) − 3)/h = 1/6 on your homework, noting that the graph has an open hole at (0, 1/6) where the cyan marker settles.",
        "narration": "Therefore, the limit exists, and equals one-sixth. On the graph, the cyan marker settles right into the hole at height one-sixth.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\lim_{h\\to 0}\\frac{\\sqrt{9+h}-3}{h}=\\frac{1}{6}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "02-hw2-1-6-28",
    "title": "Combining Rational Terms Before a Limit",
    "homework": "HW 2",
    "section": "1.6",
    "exercise": "28",
    "textbook_page": 71,
    "problem": "Evaluate lim_{t→0} (1/t − 1/(t²+t)), if it exists.",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 1.6 #28, p. 71; source manual PDF p. 6.",
    "steps": [
      {
        "title": "Inspect the denominators",
        "why": "Rule: Indeterminate Difference of Unbounded Fractions (∞ − ∞ form as t → 0). Both 1/t and 1/(t² + t) have zero denominators at t = 0 (and at t = −1), so write the original limit first and prepare to combine the two fractions into a single rational expression.",
        "narration": "We want the limit, as t approaches zero, of 1 over t, minus 1 over the quantity: t-squared, plus t. Notice how both fractions blow up at t equals zero.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{t\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\left(\\frac{1}{t}-\\frac{1}{t^2+t}\\right)"
          }
        ]
      },
      {
        "title": "Factor the quadratic",
        "why": "Rule: Common Monomial Factoring (t² + t = t(t + 1)). Factor out t from the quadratic denominator t² + t so you can clearly see the shared factor t between the first denominator t and the second denominator t(t + 1).",
        "narration": "Start by factoring the second denominator: t-squared, plus t — which factors cleanly into t, times the quantity t plus 1.",
        "parts": [
          {
            "id": "fact",
            "tex": "t^2+t=t(t+1)",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Choose the common denominator",
        "why": "Rule: Least Common Denominator (LCD) Construction. Taking each distinct factor to its highest power gives LCD = t(t + 1), which allows both fractions to be merged over a single denominator for all t ≠ 0, −1.",
        "narration": "This reveals our least common denominator: t, times the quantity t plus 1. Near zero, t is nonzero, and t plus 1 stays close to 1.",
        "parts": [
          {
            "id": "lcd",
            "tex": "\\mathrm{LCD}=t(t+1)",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Rewrite the first term",
        "why": "Rule: Equivalent Fraction Identity A/B = (A·C)/(B·C) with C = t + 1. Multiply the numerator and denominator of the first fraction 1/t by the missing factor (t + 1) to rewrite it as (t + 1)/[t(t + 1)].",
        "narration": "To match this common denominator, multiply the top and bottom of the first fraction, 1 over t, by the missing factor: t plus 1.",
        "parts": [
          {
            "id": "first",
            "tex": "\\frac{1}{t}=\\frac{t+1}{t(t+1)}"
          }
        ]
      },
      {
        "title": "Rewrite the second term",
        "why": "Rule: Factored Denominator Alignment. Rewrite the second fraction 1/(t² + t) in its factored form 1/[t(t + 1)] so that both terms now share the exact same denominator t(t + 1) on your homework line.",
        "narration": "Once factored, the second fraction already has the common denominator — t, times t plus 1 — so its numerator stays 1.",
        "parts": [
          {
            "id": "second",
            "tex": "\\frac{1}{t^2+t}=\\frac{1}{t(t+1)}"
          }
        ]
      },
      {
        "title": "Combine the numerators",
        "why": "Rule: Fraction Subtraction Over a Common Denominator (A/D − B/D = (A − B)/D). Subtract the second numerator 1 from the first numerator (t + 1) over the shared denominator t(t + 1) to get [(t + 1) − 1]/[t(t + 1)].",
        "narration": "Now, combine both fractions over their shared denominator. The numerator becomes the quantity t plus 1, minus 1.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{t\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{(t+1)-1}{t(t+1)}"
          }
        ]
      },
      {
        "title": "Simplify the numerator",
        "why": "Rule: Constant Cancellation in the Numerator ((t + 1) − 1 = t). Simplifying +1 − 1 = 0 leaves a lone factor t in the numerator over t(t + 1), which isolates the removable zero factor t/t.",
        "narration": "In the numerator, plus 1 and minus 1 cancel out — leaving a single t on top, over t, times t plus 1.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{t\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{t}{t(t+1)}"
          }
        ]
      },
      {
        "title": "Cancel only nearby",
        "why": "Rule: Cancellation of Nonzero Common Factors Inside a Limit (t ≠ 0 as t → 0). Cancel the common factor t from the numerator and denominator for t ≠ 0 to reduce the limit to lim_{t→0} 1/(t + 1).",
        "narration": "For t near zero, but not equal to zero, cancel the common factor t. That leaves a simple expression: 1, over t plus 1.",
        "parts": [
          {
            "id": "lim",
            "tex": "\\lim_{t\\to 0}"
          },
          {
            "id": "expr",
            "tex": "\\frac{1}{t+1}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Evaluate the limit",
        "why": "Rule: Direct Substitution Property for Rational Functions (continuous wherever the denominator is nonzero). Substitute t = 0 into the reduced expression 1/(t + 1) to compute 1/(0 + 1) = 1/1 = 1.",
        "narration": "Now we can substitute t equals zero directly into 1, over t plus 1 — which gives 1 over 1, or simply 1.",
        "parts": [
          {
            "id": "eval",
            "tex": "\\frac{1}{0+1}=1"
          }
        ]
      },
      {
        "title": "Conclude",
        "why": "Rule: Final Limit Statement & Graphical Verification. State the final answer lim_{t→0} (1/t − 1/(t² + t)) = 1, confirming that algebraic combination resolved the ∞ − ∞ form into a removable hole at (0, 1).",
        "narration": "So the limit equals 1, even though the original expression is undefined at t equals zero. The cyan point marks the removable hole at height 1.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\lim_{t\\to 0}\\left(\\frac{1}{t}-\\frac{1}{t^2+t}\\right)=1",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "03-hw3-2-2-28",
    "title": "Derivative from the Limit Definition",
    "homework": "HW 3",
    "section": "2.2",
    "exercise": "28",
    "textbook_page": 130,
    "problem": "Find the derivative of f(x)=x⁴ using the definition of derivative. State the domain of f and the domain of f′.",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.2 #28, p. 130; source manual PDF p. 16.",
    "steps": [
      {
        "title": "Identify the function",
        "why": "Rule: Problem Setup for First-Principles Differentiation. Because the prompt explicitly requires the definition of the derivative for f(x) = x⁴, write down the function rule first and do not skip ahead using the Power Rule.",
        "narration": "Let's find the derivative of f of x, equals x to the fourth, directly from the limit definition — and state the domains of both f, and f-prime.",
        "parts": [
          {
            "id": "f",
            "tex": "f(x)=x^4"
          }
        ]
      },
      {
        "title": "Domain of f",
        "why": "Rule: Polynomial Domain Rule. Since f(x) = x⁴ involves only multiplication of the real variable x, state on your homework that Dom(f) = (−∞, ∞) because polynomials are defined for all real numbers.",
        "narration": "Because x to the fourth is a polynomial, it accepts every real input. So the domain of f is all real numbers.",
        "parts": [
          {
            "id": "domainf",
            "tex": "\\mathrm{Dom}(f)=(-\\infty,\\infty)",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Write the definition",
        "why": "Rule: Limit Definition of the Derivative f'(x) = lim_{h→0} [f(x + h) − f(x)]/h. Always write this general difference-quotient formula on your exam paper before substituting the specific function f(x) = x⁴.",
        "narration": "By definition, f-prime of x is the limit, as h approaches zero, of f of x plus h, minus f of x — all divided by h.",
        "parts": [
          {
            "id": "def",
            "tex": "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}"
          }
        ]
      },
      {
        "title": "Substitute f",
        "why": "Rule: Function Evaluation at a Shifted Input x + h. Replace f(x + h) with (x + h)⁴ and f(x) with x⁴ in the numerator of the difference quotient to form lim_{h→0} [(x + h)⁴ − x⁴]/h.",
        "narration": "Applying our fourth-power rule gives the limit, as h approaches zero, of the quantity x plus h, to the fourth, minus x to the fourth — all over h.",
        "parts": [
          {
            "id": "dq",
            "tex": "f'(x)=\\lim_{h\\to0}\\frac{(x+h)^4-x^4}{h}"
          }
        ]
      },
      {
        "title": "Expand the fourth power",
        "why": "Rule: Binomial Theorem Expansion for n = 4 (Pascal's Triangle row 1, 4, 6, 4, 1). Expand (x + h)⁴ systematically in descending powers of x and ascending powers of h to get x⁴ + 4x³h + 6x²h² + 4xh³ + h⁴.",
        "narration": "Expand the binomial using coefficients 1, 4, 6, 4, 1: x to the fourth, plus 4 x-cubed h, plus 6 x-squared h-squared, plus 4 x h-cubed, plus h to the fourth.",
        "parts": [
          {
            "id": "exp",
            "tex": "(x+h)^4=x^4+4x^3h+6x^2h^2+4xh^3+h^4",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Insert the expansion",
        "why": "Rule: Substitution of Expanded Polynomial into the Difference Quotient. Insert the five-term expansion of (x + h)⁴ into the numerator and keep the trailing −x⁴ term at the end, all over the denominator h.",
        "narration": "Substitute that five-term expansion into the numerator, and subtract x to the fourth at the end — all divided by h.",
        "parts": [
          {
            "id": "dq",
            "tex": "f'(x)=\\lim_{h\\to0}\\frac{x^4+4x^3h+6x^2h^2+4xh^3+h^4-x^4}{h}"
          }
        ]
      },
      {
        "title": "Cancel x⁴",
        "why": "Rule: Cancellation of Non-h Terms & Common Factor Extraction. Cancel x⁴ − x⁴ = 0 in the numerator, and then factor h out of the remaining four terms 4x³h + 6x²h² + 4xh³ + h⁴ to get h(4x³ + 6x²h + 4xh² + h³).",
        "narration": "The leading x to the fourth, and trailing minus x to the fourth, cancel out. Now, factor an h out of every remaining term in the numerator.",
        "parts": [
          {
            "id": "fact",
            "tex": "f'(x)=\\lim_{h\\to0}\\frac{h(4x^3+6x^2h+4xh^2+h^3)}{h}"
          }
        ]
      },
      {
        "title": "Cancel h",
        "why": "Rule: Punctured Neighborhood Cancellation (h ≠ 0 as h → 0). Divide out the common factor h/h = 1 between the factored numerator and the denominator to leave the polynomial limit lim_{h→0} (4x³ + 6x²h + 4xh² + h³).",
        "narration": "Since h is nonzero inside the limit, cancel the common factor h — leaving 4 x-cubed, plus 6 x-squared h, plus 4 x h-squared, plus h-cubed.",
        "parts": [
          {
            "id": "simp",
            "tex": "f'(x)=\\lim_{h\\to0}(4x^3+6x^2h+4xh^2+h^3)",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Take the limit",
        "why": "Rule: Direct Substitution Property for Limits of Polynomials in h. Set h = 0 in each term so that 6x²(0) = 0, 4x(0)² = 0, and (0)³ = 0 all vanish, leaving only the leading term f'(x) = 4x³.",
        "narration": "Now let h approach zero. Every term that still contains an h vanishes — leaving only 4 x-cubed.",
        "parts": [
          {
            "id": "lim",
            "tex": "f'(x)=4x^3+0+0+0=4x^3",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Domain of f′",
        "why": "Rule: Domain Analysis of the Derivative Function. Because the resulting formula f'(x) = 4x³ is a cubic polynomial that exists for every real x, write Dom(f') = (−∞, ∞) alongside Dom(f) = (−∞, ∞).",
        "narration": "Our derivative, 4 x-cubed, is also a polynomial — so the domain of f-prime, just like the domain of f, is all real numbers.",
        "parts": [
          {
            "id": "domains",
            "tex": "\\mathrm{Dom}(f)=\\mathrm{Dom}(f')=(-\\infty,\\infty)"
          }
        ]
      },
      {
        "title": "Final result",
        "why": "Rule: Summary of Derivative and Domain Requirements. Box the complete answer f'(x) = 4x³ with Dom(f) = Dom(f') = ℝ, noting that at x = 1 the tangent line slope is f'(1) = 4(1)³ = 4.",
        "narration": "In summary: f-prime of x, equals 4 x-cubed, with domain all real numbers. At x equals 1, the cyan tangent line has slope 4.",
        "parts": [
          {
            "id": "ans",
            "tex": "f'(x)=4x^3,\\quad \\mathrm{Dom}(f)=\\mathrm{Dom}(f')=\\mathbb{R}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "04-hw4-2-3-32",
    "title": "Product Rule with a Radical",
    "homework": "HW 4",
    "section": "2.3",
    "exercise": "32",
    "textbook_page": 143,
    "problem": "Use the Product Rule to find the derivative of g(x)=sqrt(x)(x+2sqrt(x)).",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.3 #32, p. 143; source manual PDF pp. 18–19.",
    "steps": [
      {
        "title": "Read the required method",
        "why": "Rule: Mandatory Product Rule Setup. Even though distributing √x first is possible, the instructions require the Product Rule on g(x) = √x(x + 2√x), so write the original factored product clearly first.",
        "narration": "We need to differentiate g of x, equals the square root of x, times the quantity: x, plus 2 square root of x — specifically using the Product Rule.",
        "parts": [
          {
            "id": "g",
            "tex": "g(x)=\\sqrt{x}(x+2\\sqrt{x})"
          }
        ]
      },
      {
        "title": "Set the factors",
        "why": "Rule: Factor Identification for Product Rule. Label the first factor u(x) = √x = x^{1/2} and the second factor v(x) = x + 2√x = x + 2x^{1/2} on your homework so you can differentiate each piece separately.",
        "narration": "Let's name the two factors: set u equal to the square root of x, and set v equal to the quantity: x, plus 2 square root of x.",
        "parts": [
          {
            "id": "uv",
            "tex": "u=\\sqrt{x},\\qquad v=x+2\\sqrt{x}"
          }
        ]
      },
      {
        "title": "Differentiate u",
        "why": "Rule: Power Rule d/dx[x^n] = n·x^{n−1} applied to n = 1/2. Differentiating u = x^{1/2} brings down the exponent 1/2 and subtracts 1 from the power to give u' = (1/2)x^{−1/2} = 1/(2√x) for x > 0.",
        "narration": "Since the square root of x is x to the one-half power, its derivative, u-prime, is 1 over 2 square root of x, for positive x.",
        "parts": [
          {
            "id": "up",
            "tex": "u'=\\frac{1}{2\\sqrt{x}}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Differentiate v",
        "why": "Rule: Sum and Constant Multiple Rules with Fractional Exponents. Differentiate v = x + 2√x term by term: d/dx[x] = 1, and d/dx[2√x] = 2 · [1/(2√x)] = 1/√x after the 2s cancel.",
        "narration": "Now differentiate v, term by term: the derivative of x is 1, and the derivative of 2 square root of x simplifies to 1 over the square root of x.",
        "parts": [
          {
            "id": "vp",
            "tex": "v'=1+\\frac{1}{\\sqrt{x}}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "State Product Rule",
        "why": "Rule: Product Rule Formula (uv)' = u·v' + v·u'. State the symbolic Product Rule formula on your exam paper before plugging in the expressions to guarantee full method credit.",
        "narration": "The Product Rule tells us that g-prime equals u, times v-prime — plus v, times u-prime.",
        "parts": [
          {
            "id": "rule",
            "tex": "g'=uv'+vu'"
          }
        ]
      },
      {
        "title": "Substitute factors",
        "why": "Rule: Component Substitution into the Product Rule. Substitute u = √x, v' = 1 + 1/√x, v = x + 2√x, and u' = 1/(2√x) into u·v' + v·u' to build the unsimplified derivative expression.",
        "narration": "Substitute each piece: the square root of x, times the quantity 1 plus 1 over root x — plus the quantity x plus 2 root x, times 1 over 2 root x.",
        "parts": [
          {
            "id": "gprime",
            "tex": "g'=\\sqrt{x}\\left(1+\\frac{1}{\\sqrt{x}}\\right)+(x+2\\sqrt{x})\\frac{1}{2\\sqrt{x}}"
          }
        ]
      },
      {
        "title": "Distribute the first product",
        "why": "Rule: Distributive Property & Radical Cancellation (√x · (1/√x) = 1). Multiply √x across the first parentheses (1 + 1/√x) to obtain √x · 1 + √x · (1/√x) = √x + 1 for x > 0.",
        "narration": "Distribute the first product: root x times 1 is the square root of x, and root x times 1 over root x simplifies to 1.",
        "parts": [
          {
            "id": "first",
            "tex": "\\sqrt{x}\\left(1+\\frac{1}{\\sqrt{x}}\\right)=\\sqrt{x}+1"
          }
        ]
      },
      {
        "title": "Simplify the second product",
        "why": "Rule: Term-by-Term Division by a Radical Monomial (x/√x = √x). Distribute 1/(2√x) across (x + 2√x): the first term becomes x/(2√x) = (1/2)√x, and the second term becomes (2√x)/(2√x) = 1.",
        "narration": "In the second product, divide each term by 2 root x: x over 2 root x becomes one-half root x, and 2 root x over 2 root x becomes 1.",
        "parts": [
          {
            "id": "second",
            "tex": "(x+2\\sqrt{x})\\frac{1}{2\\sqrt{x}}=\\frac{1}{2}\\sqrt{x}+1"
          }
        ]
      },
      {
        "title": "Combine like terms",
        "why": "Rule: Combining Like Radical and Constant Terms. Add the two radical terms √x + (1/2)√x = (3/2)√x and add the two constant terms 1 + 1 = 2 to reach the simplified derivative g'(x) = (3/2)√x + 2.",
        "narration": "Now combine like terms: root x, plus one-half root x, gives three-halves square root of x — and 1 plus 1 gives 2.",
        "parts": [
          {
            "id": "simp",
            "tex": "g'(x)=\\frac{3}{2}\\sqrt{x}+2",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "State domain carefully",
        "why": "Rule: Endpoint Differentiability & Domain Check at x = 0. While u' = 1/(2√x) is undefined at x = 0, expanding g(x) = x^{3/2} + 2x on [0, ∞) shows the right-hand derivative at x = 0 exists and equals g'_+(0) = 2.",
        "narration": "The original function g is defined for all x greater than or equal to zero, and its right-hand derivative at x equals zero is 2.",
        "parts": [
          {
            "id": "dom",
            "tex": "\\mathrm{Dom}(g)=[0,\\infty),\\qquad g'_+(0)=2"
          }
        ]
      },
      {
        "title": "Final result",
        "why": "Rule: Final Boxed Product Rule Conclusion. Write g'(x) = 2 + (3/2)√x for x > 0 (with g'_+(0) = 2), which matches the cyan tangent slope g'(1) = 2 + 3/2 = 7/2 at x = 1.",
        "narration": "So by the Product Rule, g-prime of x equals 2, plus three-halves square root of x. At x equals 1, the cyan tangent has slope seven-halves.",
        "parts": [
          {
            "id": "ans",
            "tex": "g'(x)=2+\\frac{3}{2}\\sqrt{x},\\quad x>0;\\quad g'_+(0)=2",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "05-hw4-2-3-42",
    "title": "Quotient Rule and Sign Care",
    "homework": "HW 4",
    "section": "2.3",
    "exercise": "42",
    "textbook_page": 144,
    "problem": "Differentiate y=(u+2)²/(1−u).",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.3 #42, p. 144; source manual PDF p. 19.",
    "steps": [
      {
        "title": "Identify numerator and denominator",
        "why": "Rule: Rational Function Domain Restriction & Quotient Identification. Identify the numerator f(u) = (u + 2)² and denominator g(u) = 1 − u, noting immediately that 1 − u ≠ 0 requires u ≠ 1.",
        "narration": "We want to differentiate y, equals the quantity u plus 2, squared — all divided by 1 minus u, where u cannot equal 1.",
        "parts": [
          {
            "id": "y",
            "tex": "y=\\frac{(u+2)^2}{1-u}"
          },
          {
            "id": "domain",
            "tex": "u\\ne1",
            "color": "red"
          }
        ]
      },
      {
        "title": "Expand the numerator",
        "why": "Rule: Perfect Square Binomial Expansion (A + B)² = A² + 2AB + B². Expand the numerator (u + 2)² into u² + 4u + 4 first so that differentiating f(u) and combining polynomial terms later is fast and error-free.",
        "narration": "First, expand the numerator, f of u: the quantity u plus 2, squared, becomes u-squared, plus 4 u, plus 4.",
        "parts": [
          {
            "id": "f",
            "tex": "f(u)=(u+2)^2=u^2+4u+4"
          }
        ]
      },
      {
        "title": "Differentiate numerator",
        "why": "Rule: Term-by-Term Polynomial Differentiation (Power, Constant Multiple, and Constant Rules). Differentiate f(u) = u² + 4u + 4 with respect to u to get f'(u) = 2u + 4 + 0 = 2u + 4.",
        "narration": "Differentiating that expanded numerator, term by term, gives f-prime of u, equals 2 u, plus 4.",
        "parts": [
          {
            "id": "fp",
            "tex": "f'(u)=2u+4"
          }
        ]
      },
      {
        "title": "Differentiate denominator",
        "why": "Rule: Linear Denominator Differentiation & Negative Sign Tracking. Differentiate the denominator g(u) = 1 − u to get g'(u) = 0 − 1 = −1; circle this −1 on your paper because forgetting it is the #1 exam mistake!",
        "narration": "The denominator is g of u, equals 1 minus u — so its derivative, g-prime of u, is negative 1. Watch that negative sign carefully.",
        "parts": [
          {
            "id": "gp",
            "tex": "g(u)=1-u,\\qquad g'(u)=-1"
          }
        ]
      },
      {
        "title": "Write Quotient Rule",
        "why": "Rule: Quotient Rule Formula (f/g)' = (g·f' − f·g')/g². Write the general Quotient Rule formula (\"low d-high minus high d-low over low squared\") before substituting the polynomial expressions.",
        "narration": "By the Quotient Rule, the derivative of f over g is: g, times f-prime — minus f, times g-prime — all divided by g-squared.",
        "parts": [
          {
            "id": "rule",
            "tex": "\\left(\\frac{f}{g}\\right)'=\\frac{gf'-fg'}{g^2}"
          }
        ]
      },
      {
        "title": "Substitute derivatives",
        "why": "Rule: Substitution into the Quotient Rule Template. Plug g(u) = 1 − u, f'(u) = 2u + 4, f(u) = u² + 4u + 4, and g'(u) = −1 into the numerator over the squared denominator (1 − u)².",
        "narration": "Substitute each piece: the quantity 1 minus u, times 2 u plus 4 — minus the quantity u-squared plus 4 u plus 4, times negative 1 — all over 1 minus u, squared.",
        "parts": [
          {
            "id": "quot",
            "tex": "\\frac{dy}{du}=\\frac{(1-u)(2u+4)-(u^2+4u+4)(-1)}{(1-u)^2}"
          }
        ]
      },
      {
        "title": "Resolve the double negative",
        "why": "Rule: Double-Negative Sign Resolution (−f(u)·(−1) = +f(u)). Multiply the subtracted term −(u² + 4u + 4)(−1) first so the two negative signs cancel into +(u² + 4u + 4) before combining terms.",
        "narration": "Notice the double negative in the second term: subtracting a product with negative 1 turns into adding the entire polynomial: u-squared, plus 4 u, plus 4.",
        "parts": [
          {
            "id": "sign",
            "tex": "-(u^2+4u+4)(-1)=+(u^2+4u+4)",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Expand first product",
        "why": "Rule: FOIL Binomial Multiplication. Expand the first numerator product (1 − u)(2u + 4) by multiplying 1(2u + 4) − u(2u + 4) to get 2u + 4 − 2u² − 4u.",
        "narration": "Now expand the first product, 1 minus u, times 2 u plus 4 — which gives 2 u, plus 4, minus 2 u-squared, minus 4 u.",
        "parts": [
          {
            "id": "p1",
            "tex": "(1-u)(2u+4)=2u+4-2u^2-4u"
          }
        ]
      },
      {
        "title": "Collect numerator",
        "why": "Rule: Collecting Like Polynomial Terms in the Numerator. Group the quadratic, linear, and constant terms across (2u + 4 − 2u² − 4u) + (u² + 4u + 4): (−2u² + u²) + (2u − 4u + 4u) + (4 + 4) = −u² + 2u + 8.",
        "narration": "Combine the like terms across the numerator: negative 2 u-squared, plus u-squared, is negative u-squared; then plus 2 u, plus 8.",
        "parts": [
          {
            "id": "num",
            "tex": "(2u+4-2u^2-4u)+(u^2+4u+4)=-u^2+2u+8"
          }
        ]
      },
      {
        "title": "Keep denominator squared",
        "why": "Rule: Preserving the Factored Squared Denominator. Place the simplified quadratic numerator −u² + 2u + 8 over (1 − u)²; in calculus homework, always leave the Quotient Rule denominator factored as (1 − u)².",
        "narration": "Place that simplified numerator over the squared denominator: negative u-squared, plus 2 u, plus 8 — all over the quantity 1 minus u, squared.",
        "parts": [
          {
            "id": "deriv",
            "tex": "\\frac{dy}{du}=\\frac{-u^2+2u+8}{(1-u)^2}"
          }
        ]
      },
      {
        "title": "Factor and conclude",
        "why": "Rule: Quadratic Factoring & Tangent Verification. Factor −u² + 2u + 8 = −(u² − 2u − 8) = −(u − 4)(u + 2) = (4 − u)(u + 2) over (1 − u)² for u ≠ 1, giving slope dy/du|_{u=0} = 8/1 = 8.",
        "narration": "Factoring the top gives the quantity 4 minus u, times u plus 2 — all over 1 minus u, squared. At u equals zero, the cyan tangent has slope 8.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\frac{dy}{du}=\\frac{(4-u)(u+2)}{(1-u)^2},\\quad u\\ne1",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "06-hw4-2-5-37",
    "title": "Three Layers of the Chain Rule",
    "homework": "HW 4",
    "section": "2.5",
    "exercise": "37",
    "textbook_page": 162,
    "problem": "Find the derivative of F(t)=tan(sqrt(1+t²)).",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.5 #37, p. 162; source manual PDF p. 23.",
    "steps": [
      {
        "title": "See the nested layers",
        "why": "Rule: Three-Layer Composite Function Decomposition f(g(h(t))). Identify the three nested functions from outside to inside: outer tan(z), middle z = √w = w^{1/2}, and inner w = 1 + t².",
        "narration": "We want the derivative of F of t, equals the tangent of the square root of 1 plus t-squared — a composition of three nested layers.",
        "parts": [
          {
            "id": "F",
            "tex": "F(t)=\\tan\\left(\\sqrt{1+t^2}\\right)"
          }
        ]
      },
      {
        "title": "Name the outer layer",
        "why": "Rule: Outer Trigonometric Derivative Rule d/dt[tan(z)] = sec²(z)·z'. Differentiate the outermost tangent function first to get sec²(z), keeping its interior argument z completely unchanged.",
        "narration": "Start with the outermost layer, tangent of z. Its derivative is secant-squared of z — multiplied by the inner derivative, z-prime.",
        "parts": [
          {
            "id": "outer",
            "tex": "\\frac{d}{dt}\\tan(z)=\\sec^2(z)z'"
          }
        ]
      },
      {
        "title": "Keep the inner argument",
        "why": "Rule: First Link of the Chain Rule. Substitute the full inner expression z = √(1 + t²) inside sec²(z) and multiply by the derivative operator d/dt[√(1 + t²)] for the remaining middle and inner layers.",
        "narration": "Keep the inside intact: F-prime of t begins with secant-squared of the square root of 1 plus t-squared — times the derivative of that square root.",
        "parts": [
          {
            "id": "chain1",
            "tex": "F'(t)=\\sec^2\\left(\\sqrt{1+t^2}\\right)\\frac{d}{dt}\\sqrt{1+t^2}"
          }
        ]
      },
      {
        "title": "Differentiate the square root",
        "why": "Rule: Middle Radical Derivative Rule d/dt[√w] = w'/(2√w). Differentiate the middle square-root layer √w as 1/(2√w) times the derivative w' of the polynomial inside the radical.",
        "narration": "Next, peel the middle square-root layer: the derivative of the square root of w is w-prime, divided by 2 times the square root of w.",
        "parts": [
          {
            "id": "rootrule",
            "tex": "\\frac{d}{dt}\\sqrt{w}=\\frac{w'}{2\\sqrt{w}}"
          }
        ]
      },
      {
        "title": "Differentiate the inside",
        "why": "Rule: Inner Polynomial Derivative Rule d/dt[1 + t²] = 2t. Differentiate the innermost expression w = 1 + t² term by term: the constant 1 differentiates to 0 and t² differentiates to 2t.",
        "narration": "Finally, differentiate the innermost polynomial: the derivative of 1 plus t-squared, with respect to t, is simply 2 t.",
        "parts": [
          {
            "id": "inside",
            "tex": "\\frac{d}{dt}(1+t^2)=2t"
          }
        ]
      },
      {
        "title": "Multiply the chain factors",
        "why": "Rule: Full Three-Link Chain Rule Multiplication F'(t) = f'(g(h(t))) · g'(h(t)) · h'(t). Multiply all three derivative factors together on one line: sec²(√(1 + t²)) · [1/(2√(1 + t²))] · (2t).",
        "narration": "Now multiply all three links of the chain together: secant-squared of the root — times 1 over 2 times the root — times 2 t.",
        "parts": [
          {
            "id": "product",
            "tex": "F'(t)=\\sec^2\\left(\\sqrt{1+t^2}\\right)\\frac{1}{2\\sqrt{1+t^2}}(2t)"
          }
        ]
      },
      {
        "title": "Simplify the constants",
        "why": "Rule: Algebraic Cancellation of Numerical Coefficients (2t / 2 = t). Cancel the factor of 2 in the numerator (from 2t) with the factor of 2 in the denominator (from 2√(1 + t²)) to write the single fraction [t sec²(√(1 + t²))]/√(1 + t²).",
        "narration": "The factor of 2 on top cancels the 2 on the bottom — leaving t, times secant-squared of the square root of 1 plus t-squared, all over that same square root.",
        "parts": [
          {
            "id": "simp",
            "tex": "F'(t)=\\frac{t\\sec^2\\left(\\sqrt{1+t^2}\\right)}{\\sqrt{1+t^2}}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Check where F exists",
        "why": "Rule: Trigonometric Domain Restriction for Tangent and Secant. Because √(1 + t²) ≥ 1 for all real t, note that F(t) and F'(t) are defined everywhere except where the angle √(1 + t²) equals π/2 + kπ (k = 0, 1, 2, …).",
        "narration": "The radical is always positive, but tangent is undefined at odd multiples of pi over 2 — so exclude any t where the root hits those angles.",
        "parts": [
          {
            "id": "domain",
            "tex": "\\sqrt{1+t^2}\\ne\\frac{\\pi}{2}+k\\pi,\\quad k=0,1,2,\\ldots",
            "color": "red"
          }
        ]
      },
      {
        "title": "Final derivative",
        "why": "Rule: Final Chain Rule Derivative Statement. Box the final derivative F'(t) = [t sec²(√(1 + t²))]/√(1 + t²), making sure you never drop the √(1 + t²) argument inside sec² or in the denominator.",
        "narration": "Thus, F-prime of t equals t, times secant-squared of the square root of 1 plus t-squared — all over the square root of 1 plus t-squared.",
        "parts": [
          {
            "id": "ans",
            "tex": "F'(t)=\\frac{t\\sec^2\\left(\\sqrt{1+t^2}\\right)}{\\sqrt{1+t^2}}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "07-hw5-2-6-33",
    "title": "Implicit Tangent to a Lemniscate",
    "homework": "HW 5",
    "section": "2.6",
    "exercise": "33",
    "textbook_page": 170,
    "problem": "Use implicit differentiation to find an equation of the tangent line to 2(x^2+y^2)^2=25(x^2-y^2) at (3,1).",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.6 #33, p. 170; source manual PDF pp. 27–28.",
    "steps": [
      {
        "title": "Set up the curve",
        "why": "Rule: Implicit Curve Setup for a Lemniscate. Because solving 2(x² + y²)² = 25(x² − y²) explicitly for y is impractical, treat y as an implicit differentiable function y(x) and differentiate both sides with respect to x.",
        "narration": "We want the tangent line to the lemniscate: 2, times the quantity x-squared plus y-squared, squared — equals 25, times the quantity x-squared minus y-squared, at the point 3, comma 1.",
        "parts": [
          {
            "id": "eq",
            "tex": "2(x^2+y^2)^2=25(x^2-y^2)"
          }
        ]
      },
      {
        "title": "Differentiate the left side",
        "why": "Rule: Chain Rule on the Left-Hand Side d/dx[2(u)²] = 4u · u' with u = x² + y². Bring down the exponent 2 to get 2·2(x² + y²)¹ = 4(x² + y²), and multiply by the inner derivative d/dx[x² + y²] = 2x + 2y·y'.",
        "narration": "Differentiate the left side implicitly with respect to x: the outer square brings down a 2, giving 4, times x-squared plus y-squared — times the inner derivative, 2 x, plus 2 y, y-prime.",
        "parts": [
          {
            "id": "lhs",
            "tex": "4(x^2+y^2)(2x+2yy')",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Differentiate the right side",
        "why": "Rule: Constant Multiple & Implicit Power Rule on the Right-Hand Side. Keep the constant 25 in front and differentiate x² − y² with respect to x: d/dx[x²] = 2x and d/dx[−y²] = −2y·y' by the Chain Rule.",
        "narration": "On the right side, differentiate inside the parentheses: the derivative of x-squared is 2 x, and the derivative of y-squared is 2 y, times y-prime.",
        "parts": [
          {
            "id": "rhs",
            "tex": "25(2x-2yy')",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Equate the derivatives",
        "why": "Rule: Equating Implicit Derivatives Across Both Sides. Set the left-hand derivative 4(x² + y²)(2x + 2y·y') equal to the right-hand derivative 25(2x − 2y·y') to form the implicit slope equation.",
        "narration": "Set the two differentiated sides equal: 4, times x-squared plus y-squared, times 2 x plus 2 y, y-prime — equals 25, times 2 x minus 2 y, y-prime.",
        "parts": [
          {
            "id": "eq",
            "tex": "4(x^2+y^2)(2x+2yy')=25(2x-2yy')"
          }
        ]
      },
      {
        "title": "Simplify the equation",
        "why": "Rule: Common Factor Division Across an Equation. Factor 2 out of (2x + 2y·y') = 2(x + y·y') and out of (2x − 2y·y') = 2(x − y·y'), then divide both sides by 2 to simplify the coefficients before substituting.",
        "narration": "Factor a 2 out of the parentheses on both sides and divide by 2. That leaves 4, times x-squared plus y-squared, times x plus y, y-prime — equals 25, times x minus y, y-prime.",
        "parts": [
          {
            "id": "eq",
            "tex": "4(x^2+y^2)(x+yy')=25(x-yy')"
          }
        ]
      },
      {
        "title": "Substitute the point",
        "why": "Rule: Early Point Evaluation Strategy at (x, y) = (3, 1). When a homework problem asks for the tangent line at a specific numerical point (3, 1), substitute x = 3 and y = 1 immediately (so x² + y² = 3² + 1² = 10) rather than solving for y' in terms of x and y first.",
        "narration": "Rather than solving for y-prime algebraically first, plug in x equals 3, and y equals 1, right now. Notice that x-squared plus y-squared becomes 9 plus 1, or 10.",
        "parts": [
          {
            "id": "eq",
            "tex": "4(10)(3+y')=25(3-y')"
          }
        ]
      },
      {
        "title": "Expand both sides",
        "why": "Rule: Distributive Property to Isolate Linear Terms in y'. Multiply 4(10) = 40 across (3 + y') on the left to get 120 + 40y', and distribute 25 across (3 − y') on the right to get 75 − 25y'.",
        "narration": "Distribute the constants on both sides: 40 times 3, plus 40 y-prime, gives 120 plus 40 y-prime — which equals 75, minus 25 y-prime.",
        "parts": [
          {
            "id": "eq",
            "tex": "120+40y'=75-25y'"
          }
        ]
      },
      {
        "title": "Solve for the slope",
        "why": "Rule: Linear Equation Transposition for the Unknown Slope y'. Add 25y' to both sides (40y' + 25y' = 65y') and subtract 120 from both sides (75 − 120 = −45) to isolate the y' term on the left.",
        "narration": "Gather the y-prime terms on the left, and the constants on the right: 40 y-prime, plus 25 y-prime, gives 65 y-prime — equals negative 45.",
        "parts": [
          {
            "id": "eq",
            "tex": "65y'=-45",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Evaluate the slope",
        "why": "Rule: Fraction Reduction to Lowest Terms. Divide both sides by 65 to get y' = −45/65, and divide numerator and denominator by their greatest common divisor 5 to obtain the exact tangent slope y' = −9/13.",
        "narration": "Divide both sides by 65, then simplify by 5. Our tangent slope, y-prime, equals negative 45 over 65 — which reduces to negative nine-thirteenths.",
        "parts": [
          {
            "id": "eq",
            "tex": "y'=-\\frac{45}{65}=-\\frac{9}{13}"
          }
        ]
      },
      {
        "title": "Use point-slope form",
        "why": "Rule: Point-Slope Form of a Tangent Line y − y₁ = m(x − x₁). Substitute the given point of tangency (x₁, y₁) = (3, 1) and the slope m = −9/13 into the point-slope equation to write y − 1 = (−9/13)(x − 3).",
        "narration": "Now plug the point 3, comma 1, and slope negative nine-thirteenths, into point-slope form: y minus 1, equals negative nine-thirteenths, times the quantity x minus 3.",
        "parts": [
          {
            "id": "eq",
            "tex": "y-1=-\\frac{9}{13}(x-3)"
          }
        ]
      },
      {
        "title": "Write the tangent line",
        "why": "Rule: Conversion to Slope-Intercept Form y = mx + b. Distribute (−9/13)(x − 3) = (−9/13)x + 27/13 and add 1 = 13/13 to both sides to get the final tangent line y = (−9/13)x + 40/13.",
        "narration": "Solving for y gives the tangent line: y equals negative nine-thirteenths x, plus forty-thirteenths — shown in cyan tangent to the lemniscate at 3, comma 1.",
        "parts": [
          {
            "id": "ans",
            "tex": "y=-\\frac{9}{13}x+\\frac{40}{13}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "08-hw5-2-8-8",
    "title": "Related Rates for Triangle Area",
    "homework": "HW 5",
    "section": "2.8",
    "exercise": "8",
    "textbook_page": 189,
    "problem": "The area of a triangle with side lengths a and b and contained angle θ is A=1/2 ab sin θ. (a) If a=2 cm, b=3 cm, and dθ/dt=0.2 rad/min, find dA/dt when θ=π/3. (b) If a=2 cm, db/dt=1.5 cm/min, and dθ/dt=0.2 rad/min, find dA/dt when b=3 cm and θ=π/3. (c) If da/dt=2.5 cm/min, db/dt=1.5 cm/min, and dθ/dt=0.2 rad/min, find dA/dt when a=2 cm, b=3 cm, and θ=π/3.",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.8 #8, p. 189; source manual PDF pp. 29–30.",
    "steps": [
      {
        "title": "State the area formula",
        "why": "Rule: Geometric Related-Rates Model for Triangle Area. Write the trigonometry area formula A = (1/2)ab sin θ first, keeping a(t), b(t), and θ(t) as time-dependent variables before differentiating!",
        "narration": "The area of the triangle is: Area A, equals one-half, times side A, times side B, times the sine of theta — where theta is the included angle between side A and side B.",
        "parts": [
          {
            "id": "eq",
            "tex": "A=\\frac{1}{2}ab\\sin\\theta"
          }
        ]
      },
      {
        "title": "Differentiate the full formula",
        "why": "Rule: Three-Factor Product Rule d/dt[u·v·w] = u'vw + uv'w + uvw' Combined with the Chain Rule. Differentiating (1/2)ab sin θ with respect to time t produces three rate terms inside the parentheses: a'b sin θ (from side a), ab' sin θ (from side b), and ab cos θ · θ' (from angle θ).",
        "narration": "Differentiate with respect to time using the three-factor Product Rule: A-prime equals one-half, times the sum of three rate terms — one for side A, one for side B, and one for angle theta.",
        "parts": [
          {
            "id": "eq",
            "tex": "A'=\\frac{1}{2}(a'b\\sin\\theta+ab'\\sin\\theta+ab\\cos\\theta\\theta')",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Record angle values",
        "why": "Rule: Exact Unit-Circle Trigonometric Evaluation at θ = π/3. Before plugging into parts (a), (b), and (c), record the exact special-triangle values sin(π/3) = √3/2 and cos(π/3) = 1/2.",
        "narration": "At the instant when theta equals pi over 3, the sine of pi over 3 is the square root of 3, over 2 — and the cosine of pi over 3 is one-half.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\sin\\frac{\\pi}{3}=\\frac{\\sqrt{3}}{2},\\quad\\cos\\frac{\\pi}{3}=\\frac{1}{2}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Part a: identify constants",
        "why": "Rule: Zero-Rate Identification for Constant Quantities in Part (a). Because side lengths a = 2 cm and b = 3 cm are held constant in Part (a), their time derivatives are da/dt = 0 and db/dt = 0, while dθ/dt = 0.2 rad/min.",
        "narration": "In Part A, side A is fixed at 2, and side B is fixed at 3 — so both of their rates of change are zero, while theta increases at 0.2 radians per minute.",
        "parts": [
          {
            "id": "eq",
            "tex": "a=2,\\quad b=3,\\quad\\frac{da}{dt}=0,\\quad\\frac{db}{dt}=0"
          }
        ]
      },
      {
        "title": "Part a: substitute into derivative",
        "why": "Rule: Substitution into the Master Related-Rates Equation for Part (a). Setting da/dt = 0 and db/dt = 0 eliminates the first two product-rule terms, leaving only the angle-rate contribution dA/dt = (1/2)(2)(3)(1/2)(0.2).",
        "narration": "Substitute the Part A values into our derivative. Because both side rates are zero, the first two terms drop out — leaving one-half, times 2, times 3, times one-half, times 0.2.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{dA}{dt}=\\frac{1}{2}(2)(3)\\left(\\frac{1}{2}\\right)(0.2)"
          }
        ]
      },
      {
        "title": "Part a: calculate",
        "why": "Rule: Dimensional Analysis & Rate Arithmetic for Part (a). Multiply (1/2)(2)(3)(1/2)(0.2) = (3/2)(0.2) = 0.3, and attach area-over-time units cm²/min to report dA/dt = 0.3 cm²/min.",
        "narration": "Multiplying those factors together gives d-A d-t, equals 0.3 square centimeters per minute.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\frac{dA}{dt}=0.3\\,\\mathrm{cm^2/min}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Part b: identify changing quantities",
        "why": "Rule: Variable vs. Constant Rate Inventory for Part (b). In Part (b), side a = 2 cm remains fixed (so da/dt = 0), while side b grows at db/dt = 1.5 cm/min and angle θ grows at dθ/dt = 0.2 rad/min at the instant b = 3 cm, θ = π/3.",
        "narration": "In Part B, side A remains fixed at 2, so its rate is zero — while side B grows at 1.5 centimeters per minute, and theta increases at 0.2 radians per minute.",
        "parts": [
          {
            "id": "eq",
            "tex": "a=2,\\quad\\frac{da}{dt}=0,\\quad b=3,\\quad\\frac{db}{dt}=1.5,\\quad\\frac{d\\theta}{dt}=0.2"
          }
        ]
      },
      {
        "title": "Part b: remove zero term",
        "why": "Rule: Pruning Zero-Rate Terms in Part (b). Drop the a'b sin θ term since da/dt = 0, and factor a out of the two remaining active terms to write dA/dt = (1/2)a [ (db/dt) sin θ + b cos θ (dθ/dt) ].",
        "narration": "With the rate of side A equal to zero, the first term vanishes — leaving the contribution from side B changing, plus the contribution from angle theta changing.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{dA}{dt}=\\frac{1}{2}a\\left(\\frac{db}{dt}\\sin\\theta+b\\cos\\theta\\frac{d\\theta}{dt}\\right)"
          }
        ]
      },
      {
        "title": "Part b: substitute",
        "why": "Rule: Instantaneous Value Substitution for Part (b). Substitute a = 2, b = 3, db/dt = 1.5, dθ/dt = 0.2, sin(π/3) = √3/2, and cos(π/3) = 1/2 into the two-term rate formula.",
        "narration": "Substitute side A equals 2, side B equals 3, the two non-zero rates, and the exact sine and cosine values at pi over 3.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{dA}{dt}=\\frac{1}{2}(2)\\left(1.5\\frac{\\sqrt{3}}{2}+3\\frac{1}{2}(0.2)\\right)"
          }
        ]
      },
      {
        "title": "Part b: simplify",
        "why": "Rule: Exact Radical Simplification & Decimal Rounding for Part (b). Note that (1/2)(2) = 1, convert 1.5 = 3/2 so (3/2)(√3/2) = 3√3/4, and add 3(1/2)(0.2) = 0.3 = 3/10 to get the exact rate 3√3/4 + 3/10 ≈ 1.60 cm²/min.",
        "narration": "Simplifying gives an exact rate of 3 root 3, over 4 — plus three-tenths — which is approximately 1.60 square centimeters per minute.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\frac{dA}{dt}=\\frac{3\\sqrt{3}}{4}+\\frac{3}{10}\\approx1.60\\,\\mathrm{cm^2/min}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Part c: all quantities vary",
        "why": "Rule: Full Three-Variable Rate Activation for Part (c). In Part (c), all three quantities a, b, and θ change simultaneously (da/dt = 2.5, db/dt = 1.5, dθ/dt = 0.2), so all three product-rule terms remain nonzero.",
        "narration": "In Part C, all three quantities vary at once: side A, side B, and the included angle theta — so every term in the master derivative stays active.",
        "parts": [
          {
            "id": "eq",
            "tex": "A'=\\frac{1}{2}(a'b\\sin\\theta+ab'\\sin\\theta+ab\\cos\\theta\\theta')",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Part c: substitute rates and values",
        "why": "Rule: Complete Instantaneous Substitution for Part (c). Plug a = 2, b = 3, a' = 2.5, b' = 1.5, θ' = 0.2, sin(π/3) = √3/2, and cos(π/3) = 1/2 into the master formula A' = (1/2)(a'b sin θ + ab' sin θ + ab cos θ · θ').",
        "narration": "Substitute side A equals 2, side B equals 3, side rates 2.5 and 1.5, and angle rate 0.2 into the three-term formula.",
        "parts": [
          {
            "id": "eq",
            "tex": "A'=\\frac{1}{2}\\left((2.5)(3)\\frac{\\sqrt{3}}{2}+(2)(1.5)\\frac{\\sqrt{3}}{2}+0.6\\right)",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Part c: simplify first term",
        "why": "Rule: Side-a Rate Contribution Calculation. Multiply the outer 1/2 by the first term (2.5)(3)(√3/2): writing 2.5 = 5/2 gives (1/2)(5/2)(3)(√3/2) = 15√3/8 cm²/min from side a stretching.",
        "narration": "The first term — coming from side A stretching — is one-half, times 2.5, times 3, times root 3 over 2, which simplifies to 15 root 3, over 8.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{1}{2}(2.5)(3)\\frac{\\sqrt{3}}{2}=\\frac{15\\sqrt{3}}{8}"
          }
        ]
      },
      {
        "title": "Part c: simplify second term",
        "why": "Rule: Side-b Rate Contribution Calculation. Multiply the outer 1/2 by the second term (2)(1.5)(√3/2): writing 1.5 = 3/2 gives (1/2)(2)(3/2)(√3/2) = 3√3/4 cm²/min from side b stretching.",
        "narration": "The second term — coming from side B stretching — is one-half, times 2, times 1.5, times root 3 over 2, which simplifies to 3 root 3, over 4.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{1}{2}(2)(1.5)\\frac{\\sqrt{3}}{2}=\\frac{3\\sqrt{3}}{4}"
          }
        ]
      },
      {
        "title": "Part c: simplify angle term",
        "why": "Rule: Included-Angle Rate Contribution Calculation. Multiply the outer 1/2 by the third term (2)(3)(1/2)(0.2) = 3(1/2)(1/5) = 3/10 cm²/min from the angle θ opening.",
        "narration": "The third term — coming from angle theta opening — is one-half, times 2, times 3, times one-half, times 0.2, which equals three-tenths.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{1}{2}(2)(3)\\frac{1}{2}(0.2)=\\frac{3}{10}"
          }
        ]
      },
      {
        "title": "Part c: combine exact terms",
        "why": "Rule: Common-Denominator Radical Addition. Convert 3√3/4 to 6√3/8 so you can add the two radical rates: 15√3/8 + 6√3/8 + 3/10 = 21√3/8 + 3/10.",
        "narration": "Write 3 root 3, over 4, as 6 root 3, over 8, and combine the radical terms: 15 root 3 over 8, plus 6 root 3 over 8, gives 21 root 3, over 8 — plus three-tenths.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{15\\sqrt{3}}{8}+\\frac{3\\sqrt{3}}{4}+\\frac{3}{10}=\\frac{21\\sqrt{3}}{8}+\\frac{3}{10}"
          }
        ]
      },
      {
        "title": "Part c: final rate",
        "why": "Rule: Final Exact and Approximate Rate Statement for Part (c). Report both the exact symbolic answer dA/dt = 21√3/8 + 3/10 cm²/min and its rounded decimal value ≈ 4.85 cm²/min with proper area-rate units.",
        "narration": "In decimal form, the total rate of change of the area is approximately 4.85 square centimeters per minute.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\frac{dA}{dt}=\\frac{21\\sqrt{3}}{8}+\\frac{3}{10}\\approx4.85\\,\\mathrm{cm^2/min}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "09-hw5-2-9-4",
    "title": "Linearization of a Radical Function",
    "homework": "HW 5",
    "section": "2.9",
    "exercise": "4",
    "textbook_page": 196,
    "problem": "Find the linearization L(x) of f(x)=2/√(x^2−5) at a=3.",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 2.9 #4, p. 196; source manual PDF pp. 30–31.",
    "steps": [
      {
        "title": "Record the function and point",
        "why": "Rule: Linearization Problem Setup at Base Point a = 3. To find the linear approximation L(x) of f(x) = 2/√(x² − 5) at a = 3, we need two numbers: the function value f(3) and the derivative slope f'(3).",
        "narration": "We want the linearization, L of x, of the function f of x, equals 2, over the square root of x-squared minus 5 — centered at the point A, equals 3.",
        "parts": [
          {
            "id": "eq",
            "tex": "f(x)=\\frac{2}{\\sqrt{x^2-5}},\\quad a=3"
          }
        ]
      },
      {
        "title": "Evaluate the function at three",
        "why": "Rule: Function Evaluation at the Center Point x = a. Substitute x = 3 into f(x) = 2/√(x² − 5) to compute f(3) = 2/√(3² − 5) = 2/√(9 − 5) = 2/√4 = 2/2 = 1, which establishes the point of tangency (3, 1).",
        "narration": "First, find the height of the curve at x equals 3: inside the radical, 3-squared minus 5 is 4 — so f of 3 equals 2 over the square root of 4, which is 1.",
        "parts": [
          {
            "id": "eq",
            "tex": "f(3)=\\frac{2}{\\sqrt{3^2-5}}=\\frac{2}{2}=1"
          }
        ]
      },
      {
        "title": "Rewrite with an exponent",
        "why": "Rule: Negative Fractional Exponent Rewrite 1/√u = u^{−1/2}. Rewrite f(x) = 2/√(x² − 5) as 2(x² − 5)^{−1/2} so you can differentiate directly with the Power and Chain Rules instead of the Quotient Rule.",
        "narration": "To differentiate cleanly without the Quotient Rule, rewrite f of x as 2, times the quantity x-squared minus 5, raised to the negative one-half power.",
        "parts": [
          {
            "id": "eq",
            "tex": "f(x)=2(x^2-5)^{-1/2}"
          }
        ]
      },
      {
        "title": "Differentiate",
        "why": "Rule: Generalized Power Rule (Chain Rule) d/dx[c·u^n] = c·n·u^{n−1}·u'. Bring down the exponent −1/2, subtract 1 from the exponent (−1/2 − 1 = −3/2) to get (x² − 5)^{−3/2}, and multiply by the inner derivative d/dx[x² − 5] = 2x.",
        "narration": "Apply the Chain Rule: bring down negative one-half, subtract 1 from the exponent to get negative three-halves, and multiply by the inner derivative, 2 x.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(x)=2\\left(-\\frac{1}{2}\\right)(x^2-5)^{-3/2}(2x)"
          }
        ]
      },
      {
        "title": "Simplify the derivative",
        "why": "Rule: Algebraic Simplification & Positive Exponent Conversion. Multiply the front constants 2(−1/2) = −1 with 2x to get −2x in the numerator, and move (x² − 5)^{−3/2} into the denominator as (x² − 5)^{3/2}.",
        "narration": "The 2 and negative one-half simplify to negative 1 — leaving f-prime of x, equals negative 2 x, all over the quantity x-squared minus 5, to the three-halves power.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(x)=-\\frac{2x}{(x^2-5)^{3/2}}"
          }
        ]
      },
      {
        "title": "Evaluate the slope",
        "why": "Rule: Derivative Evaluation at x = 3 using Fractional Exponents (A^{3/2} = (√A)³). Substitute x = 3 into f'(x) = −2x/(x² − 5)^{3/2}: the numerator is −2(3) = −6 and the denominator is (9 − 5)^{3/2} = 4^{3/2} = (√4)³ = 2³ = 8, reducing −6/8 to −3/4.",
        "narration": "Now evaluate the slope at x equals 3: the numerator is negative 6, and the denominator is 4 to the three-halves power, or 8 — which reduces to negative three-quarters.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(3)=-\\frac{6}{4^{3/2}}=-\\frac{6}{8}=-\\frac{3}{4}"
          }
        ]
      },
      {
        "title": "Use the linearization formula",
        "why": "Rule: Standard Linearization Formula L(x) = f(a) + f'(a)(x − a). Write the general linearization formula centered at a = 3 on your homework paper, noting that L(x) is simply the tangent line equation at x = 3.",
        "narration": "The linearization formula at A equals 3 is: L of x, equals f of 3 — plus f-prime of 3, times the quantity x minus 3.",
        "parts": [
          {
            "id": "eq",
            "tex": "L(x)=f(3)+f'(3)(x-3)"
          }
        ]
      },
      {
        "title": "Substitute the values",
        "why": "Rule: Substitution of Anchor Height f(3) and Slope f'(3). Replace f(3) with 1 and f'(3) with −3/4 in the linearization template to obtain L(x) = 1 − (3/4)(x − 3).",
        "narration": "Substitute the value and slope we found: L of x, equals 1 — minus three-quarters, times the quantity x minus 3.",
        "parts": [
          {
            "id": "eq",
            "tex": "L(x)=1-\\frac{3}{4}(x-3)"
          }
        ]
      },
      {
        "title": "Simplify",
        "why": "Rule: Distributive Simplification to Slope-Intercept Form. Distribute −3/4 across (x − 3) to get 1 − (3/4)x + 9/4, and combine the constants 4/4 + 9/4 = 13/4 to write the final linearization L(x) = (−3/4)x + 13/4.",
        "narration": "Distribute negative three-quarters and combine constants: L of x, equals negative three-quarters x, plus thirteen-quarters — the cyan tangent line at x equals 3.",
        "parts": [
          {
            "id": "ans",
            "tex": "L(x)=-\\frac{3}{4}x+\\frac{13}{4}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "10-hw6-3-1-59",
    "title": "Absolute Extrema on a Closed Interval",
    "homework": "HW 6",
    "section": "3.1",
    "exercise": "59",
    "textbook_page": 217,
    "problem": "Find the absolute maximum and absolute minimum values of f(t)=2 cos t+sin 2t on [0,π/2].",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 3.1 #59, p. 217; source manual PDF pp. 32–33.",
    "steps": [
      {
        "title": "State the function and interval",
        "why": "Rule: Extreme Value Theorem & Closed Interval Method Setup. Because f(t) = 2 cos t + sin(2t) is continuous on the closed interval [0, π/2], it is guaranteed to attain an absolute maximum and minimum either at an interior critical number or at an endpoint.",
        "narration": "We want the absolute maximum and minimum values of f of t, equals 2 cosine of t, plus sine of 2 t — on the closed interval from zero, to pi over 2.",
        "parts": [
          {
            "id": "eq",
            "tex": "f(t)=2\\cos t+\\sin 2t,\\quad 0\\leq t\\leq\\frac{\\pi}{2}"
          }
        ]
      },
      {
        "title": "Differentiate",
        "why": "Rule: Trigonometric Differentiation with the Chain Rule d/dt[sin(2t)] = 2 cos(2t). Differentiate f(t) = 2 cos t + sin(2t) term by term: d/dt[2 cos t] = −2 sin t, and d/dt[sin(2t)] = cos(2t) · d/dt[2t] = 2 cos(2t).",
        "narration": "First, differentiate with respect to t: the derivative of 2 cosine of t is negative 2 sine of t, and by the Chain Rule, the derivative of sine of 2 t is 2 cosine of 2 t.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(t)=-2\\sin t+2\\cos 2t"
          }
        ]
      },
      {
        "title": "Use a double-angle identity",
        "why": "Rule: Double-Angle Identity Substitution cos(2t) = 1 − 2 sin²(t). Because the first term −2 sin t contains sin t, replace cos(2t) with the sine form of the double-angle identity 1 − 2 sin²(t) so the entire derivative becomes a quadratic in sin t.",
        "narration": "To express the entire derivative in terms of sine of t, replace cosine of 2 t using the double-angle identity: 1, minus 2 sine-squared of t.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(t)=-2\\sin t+2(1-2\\sin^2 t)"
          }
        ]
      },
      {
        "title": "Factor the derivative",
        "why": "Rule: Factoring a Quadratic Trinomial in sin t. Expand −2 sin t + 2 − 4 sin²(t) = −2(2 sin²(t) + sin t − 1) and factor the quadratic 2u² + u − 1 = (2u − 1)(u + 1) with u = sin t to get f'(t) = −2(2 sin t − 1)(sin t + 1).",
        "narration": "Factor out negative 2 to get a quadratic in sine of t — which factors into negative 2, times the quantity 2 sine of t, minus 1, times the quantity sine of t, plus 1.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(t)=-2(2\\sin t-1)(\\sin t+1)"
          }
        ]
      },
      {
        "title": "Find critical candidates",
        "why": "Rule: Fermat's Theorem & Critical Number Filtering on (0, π/2). Set f'(t) = 0: the factor 2 sin t − 1 = 0 gives sin t = 1/2, so t = π/6 ∈ (0, π/2), whereas sin t + 1 = 0 requires sin t = −1, which has no solution on [0, π/2].",
        "narration": "Set f-prime of t equal to zero: 2 sine of t, minus 1, gives sine of t equals one-half, so t equals pi over 6. The other factor, sine of t equals negative 1, has no solution on our interval.",
        "parts": [
          {
            "id": "eq",
            "tex": "f'(t)=0\\quad\\Longrightarrow\\quad t=\\frac{\\pi}{6}"
          }
        ]
      },
      {
        "title": "Evaluate the interior candidate",
        "why": "Rule: Function Evaluation at the Interior Critical Number t = π/6. Substitute t = π/6 into the original function f(t) = 2 cos t + sin(2t): 2 cos(π/6) + sin(π/3) = 2(√3/2) + √3/2 = 3√3/2.",
        "narration": "Now evaluate f at the interior critical number, pi over 6: both 2 cosine of pi over 6, and sine of pi over 3, equal root 3, plus root 3 over 2 — which combines to 3 root 3, over 2.",
        "parts": [
          {
            "id": "eq",
            "tex": "f\\left(\\frac{\\pi}{6}\\right)=2\\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{3}}{2}=\\frac{3\\sqrt{3}}{2}"
          }
        ]
      },
      {
        "title": "Evaluate the left endpoint",
        "why": "Rule: Closed Interval Left-Endpoint Evaluation at t = 0. Substitute the left endpoint t = 0 into the original function f(t): f(0) = 2 cos(0) + sin(0) = 2(1) + 0 = 2.",
        "narration": "Next, check the left endpoint, t equals zero: 2 cosine of zero, plus sine of zero, equals 2 times 1, plus zero — which is 2.",
        "parts": [
          {
            "id": "eq",
            "tex": "f(0)=2\\cos 0+\\sin 0=2"
          }
        ]
      },
      {
        "title": "Evaluate the right endpoint",
        "why": "Rule: Closed Interval Right-Endpoint Evaluation at t = π/2. Substitute the right endpoint t = π/2 into the original function f(t): f(π/2) = 2 cos(π/2) + sin(π) = 2(0) + 0 = 0.",
        "narration": "Now check the right endpoint, t equals pi over 2: both 2 cosine of pi over 2, and sine of pi, equal zero — giving a value of zero.",
        "parts": [
          {
            "id": "eq",
            "tex": "f\\left(\\frac{\\pi}{2}\\right)=2\\cos\\frac{\\pi}{2}+\\sin\\pi=0"
          }
        ]
      },
      {
        "title": "Compare every candidate",
        "why": "Rule: Exact Inequality Comparison of Candidate Values (Squaring Positive Numbers). Compare the three candidate outputs 3√3/2, 2, and 0 without a calculator by squaring the positive values: (3√3/2)² = 27/4 = 6.75 > 2² = 16/4 = 4, confirming 3√3/2 > 2 > 0.",
        "narration": "Compare all three values: 3 root 3, over 2, versus 2, versus zero. Since 3 root 3, over 2, squared is 27 over 4 — which is greater than 4 — the interior value is the largest.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{3\\sqrt{3}}{2}>2>0,\\quad27>16"
          }
        ]
      },
      {
        "title": "State the maximum",
        "why": "Rule: Absolute Maximum Selection by the Closed Interval Method. The largest value in the candidate table is the absolute maximum value f(π/6) = 3√3/2, occurring at the interior peak t = π/6.",
        "narration": "Therefore, the absolute maximum value is 3 square root of 3, over 2 — achieved at the interior peak, t equals pi over 6.",
        "parts": [
          {
            "id": "ans",
            "tex": "f\\left(\\frac{\\pi}{6}\\right)=\\frac{3\\sqrt{3}}{2}\\quad\\mathrm{absolute\\ maximum}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "State the minimum",
        "why": "Rule: Absolute Minimum Selection by the Closed Interval Method. The smallest value in the candidate table is the absolute minimum value f(π/2) = 0, occurring at the right endpoint t = π/2.",
        "narration": "And the absolute minimum value is zero — achieved at the right endpoint, t equals pi over 2.",
        "parts": [
          {
            "id": "ans",
            "tex": "f\\left(\\frac{\\pi}{2}\\right)=0\\quad\\mathrm{absolute\\ minimum}",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "11-hw7-3-4-25",
    "title": "Limit at Infinity by Conjugate",
    "homework": "HW 7",
    "section": "3.4",
    "exercise": "25",
    "textbook_page": 248,
    "problem": "Evaluate lim as t approaches infinity of (√(25t^2+2)−5t).",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 3.4 #25, p. 248; source manual PDF pp. 36–37.",
    "steps": [
      {
        "title": "Read the limit form",
        "why": "Rule: Indeterminate Difference Form (∞ − ∞) Recognition at Infinity. As t → ∞, both √(25t² + 2) → ∞ and 5t → ∞, so subtracting them gives the indeterminate form ∞ − ∞ that requires conjugate rationalization.",
        "narration": "We want the limit, as t approaches infinity, of the square root of 25 t-squared plus 2, minus 5 t — an indeterminate infinity-minus-infinity form.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{t\\to\\infty}\\left(\\sqrt{25t^2+2}-5t\\right)"
          }
        ]
      },
      {
        "title": "Multiply by the conjugate",
        "why": "Rule: Multiplying by 1 Using the Radical Conjugate (√(25t² + 2) + 5t)/(√(25t² + 2) + 5t). Multiply and divide the expression (√(25t² + 2) − 5t) by its conjugate √(25t² + 2) + 5t, which is strictly positive for all t > 0.",
        "narration": "To resolve the difference, multiply and divide by the conjugate: the square root of 25 t-squared plus 2, plus 5 t.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{t\\to\\infty}(\\sqrt{25t^2+2}-5t)\\frac{\\sqrt{25t^2+2}+5t}{\\sqrt{25t^2+2}+5t}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Apply difference of squares",
        "why": "Rule: Difference of Squares Identity (A − B)(A + B) = A² − B² in the Numerator. With A = √(25t² + 2) and B = 5t, expanding the numerator clears the square root to give (25t² + 2) − (5t)² = (25t² + 2) − 25t² over √(25t² + 2) + 5t.",
        "narration": "Expanding the top as a difference of squares removes the radical: we get the quantity 25 t-squared plus 2, minus 25 t-squared — all over the conjugate.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{t\\to\\infty}\\frac{(25t^2+2)-25t^2}{\\sqrt{25t^2+2}+5t}",
            "color": "red"
          }
        ]
      },
      {
        "title": "Subtract the squared terms",
        "why": "Rule: Cancellation of Leading Quadratic Terms (25t² − 25t² = 0). Subtracting 25t² from 25t² + 2 eliminates the growing t² terms completely, leaving only the constant 2 from inside the radical.",
        "narration": "In the numerator, 25 t-squared and minus 25 t-squared cancel each other out completely — leaving just the constant 2.",
        "parts": [
          {
            "id": "eq",
            "tex": "(25t^2+2)-25t^2=2",
            "color": "red"
          }
        ]
      },
      {
        "title": "Simplify the numerator",
        "why": "Rule: Simplified Rational Expression After Conjugate Cancellation. Write the cleaned-up limit as lim_{t→∞} 2 / (√(25t² + 2) + 5t), which converts the ambiguous ∞ − ∞ difference into a clear constant-over-infinity fraction.",
        "narration": "Now our limit is much cleaner: a constant numerator of 2, divided by the square root of 25 t-squared plus 2, plus 5 t.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{t\\to\\infty}\\frac{2}{\\sqrt{25t^2+2}+5t}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Determine denominator growth",
        "why": "Rule: Unbounded Positive Growth of Sums of Increasing Terms. Because both √(25t² + 2) → +∞ and 5t → +∞ as t → +∞, their sum in the denominator grows positively without bound (√(25t² + 2) + 5t → +∞) without any cancellation.",
        "narration": "As t grows toward positive infinity, both terms in the denominator — the radical and 5 t — grow positively without bound.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\sqrt{25t^2+2}+5t\\to+\\infty"
          }
        ]
      },
      {
        "title": "Compare numerator and denominator",
        "why": "Rule: Reciprocal Growth Principle (Constant Divided by Unbounded Denominator). A fixed nonzero numerator (2) divided by a denominator that grows toward +∞ shrinks steadily toward 0.",
        "narration": "So we have a fixed constant, 2, divided by a denominator that grows larger and larger toward infinity — pushing the fraction toward zero.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{2}{\\sqrt{25t^2+2}+5t}\\to0"
          }
        ]
      },
      {
        "title": "Evaluate the limit",
        "why": "Rule: Final Limit at Infinity & Horizontal Asymptote Conclusion. Conclude that lim_{t→∞} (√(25t² + 2) − 5t) = 0, which geometrically means the graph approaches the horizontal asymptote y = 0 as t → ∞.",
        "narration": "Therefore, the limit as t approaches infinity equals zero. On the graph, the curve settles right down onto the horizontal asymptote at height zero.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\lim_{t\\to\\infty}\\left(\\sqrt{25t^2+2}-5t\\right)=0",
            "color": "cyan"
          }
        ]
      }
    ]
  },
  {
    "id": "12-hw7-3-4-31",
    "title": "Limit at Infinity by Reciprocal Substitution",
    "homework": "HW 7",
    "section": "3.4",
    "exercise": "31",
    "textbook_page": 248,
    "problem": "Evaluate lim as x approaches infinity of x sin(1/x).",
    "source_note": "Stewart, Clegg & Watson, Calculus, Metric Edition, 9th ed., Section 3.4 #31, p. 248; source manual PDF pp. 36–37.",
    "steps": [
      {
        "title": "Read the limit form",
        "why": "Rule: Indeterminate Product Form (∞ · 0) Recognition. As x → ∞, the first factor x → ∞ while the interior angle 1/x → 0 forces sin(1/x) → sin(0) = 0, producing an indeterminate ∞ · 0 product.",
        "narration": "We want the limit, as x approaches infinity, of x, times the sine of 1 over x. Here, x grows without bound while sine of 1 over x shrinks toward zero — an infinity-times-zero form.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{x\\to\\infty}x\\sin\\frac{1}{x}"
          }
        ]
      },
      {
        "title": "Choose a reciprocal variable",
        "why": "Rule: Change of Variables (Reciprocal Substitution u = 1/x). Whenever a limit as x → ∞ contains 1/x inside a trig or transcendental function, substitute u = 1/x (so x = 1/u) to convert the limit at infinity into a limit at zero.",
        "narration": "To turn this into a familiar limit at zero, introduce the reciprocal variable: let u equal 1 over x, so that x equals 1 over u.",
        "parts": [
          {
            "id": "eq",
            "tex": "u=\\frac{1}{x},\\quad x=\\frac{1}{u},\\quad u\\to0^+"
          }
        ]
      },
      {
        "title": "Track the direction",
        "why": "Rule: One-Sided Limit Direction Tracking Under Reciprocal Substitution. Because x approaches +∞ through strictly positive numbers, its reciprocal u = 1/x approaches 0 through strictly positive values, which we write as u → 0⁺.",
        "narration": "As x grows through large positive numbers toward infinity, its reciprocal, u equals 1 over x, approaches zero through positive values — that is, u approaches zero from the right.",
        "parts": [
          {
            "id": "eq",
            "tex": "x\\to+\\infty\\quad\\Longrightarrow\\quad u\\to0^+"
          }
        ]
      },
      {
        "title": "Substitute into the product",
        "why": "Rule: Algebraic Substitution of New Variable u. Replace the outer factor x with 1/u and replace the inner argument 1/x with u so the product x sin(1/x) transforms into (1/u) sin(u).",
        "narration": "Rewrite the product in terms of u: x becomes 1 over u, and sine of 1 over x becomes sine of u — giving 1 over u, times the sine of u.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\frac{1}{u}\\sin u",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Rewrite the expression",
        "why": "Rule: Rewriting a Reciprocal Product as a Quotient. Multiply (1/u) · sin(u) into the single fraction (sin u)/u inside the new one-sided limit lim_{u→0⁺} (sin u)/u.",
        "narration": "Combine those factors into a single fraction: the limit, as u approaches zero from the right, of sine of u, divided by u.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{u\\to0^+}\\frac{\\sin u}{u}",
            "color": "cyan"
          }
        ]
      },
      {
        "title": "Recognize the standard limit",
        "why": "Rule: Matching the Fundamental Trigonometric Limit Template. Observe that the substitution u = 1/x has reshaped the original expression into the exact quotient (sin u)/u where the angle u in radians approaches 0.",
        "narration": "Look at what the reciprocal substitution accomplished: it transformed an unfamiliar limit at infinity into the classic trigonometric ratio, sine of u, over u, near zero.",
        "parts": [
          {
            "id": "eq",
            "tex": "u\\to0^+\\quad\\Longrightarrow\\quad\\frac{\\sin u}{u}"
          }
        ]
      },
      {
        "title": "Use the fundamental trig limit",
        "why": "Rule: Fundamental Trigonometric Limit Theorem lim_{u→0} (sin u)/u = 1. Apply the foundational calculus theorem lim_{u→0} (sin u)/u = 1 (which implies the right-hand limit lim_{u→0⁺} (sin u)/u = 1).",
        "narration": "With angles measured in radians, the fundamental trigonometric limit tells us that sine of u, over u, approaches 1 as u approaches zero from the right.",
        "parts": [
          {
            "id": "eq",
            "tex": "\\lim_{u\\to0^+}\\frac{\\sin u}{u}=1"
          }
        ]
      },
      {
        "title": "State the result",
        "why": "Rule: Substitution Theorem for Limits Conclusion. State the final answer in terms of the original variable: lim_{x→∞} x sin(1/x) = lim_{u→0⁺} (sin u)/u = 1, matching the horizontal asymptote y = 1 on the graph.",
        "narration": "Therefore, the original limit — as x approaches infinity, of x, times the sine of 1 over x — equals 1.",
        "parts": [
          {
            "id": "ans",
            "tex": "\\lim_{x\\to\\infty}x\\sin\\frac{1}{x}=1",
            "color": "cyan"
          }
        ]
      }
    ]
  }
];
