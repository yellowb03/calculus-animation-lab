const assert = require("node:assert/strict");
const Solver = require("../solver.js");
const katex = require("katex");

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; }
  catch (error) { console.error("FAIL", name, error); process.exitCode = 1; }
}
function generated(options) { return Solver.buildLesson(options); }
function rejects(options, pattern) {
  assert.throws(() => generated(options), pattern);
}
function finalTex(lesson) { return lesson.steps[lesson.steps.length-1].parts[0].tex; }

test("sum and power derivative simplifies", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"x^2+3*x"})), /2.*x.*\+.*3/);
});
test("product derivative shows two concrete contributions", () => {
  const l=generated({mode:"derivative",expression:"x^2*sin(x)"});
  assert.ok(l.steps.some(s=>s.title==="Apply the product rule" && /d.*x/.test(s.parts[0].tex)));
  assert.ok(l.steps.some(s=>s.title==="Apply the power rule"));
  assert.match(finalTex(l), /sin/); assert.match(finalTex(l), /cos/);
});
test("x times x remains unsimplified before simplification", () => {
  const l=generated({mode:"derivative",expression:"x*x"});
  assert.ok(l.steps.some(s=>s.parts[0].tex.includes("+")));
  assert.match(finalTex(l), /2.*x/);
});
test("quotient rule derivative includes squared denominator", () => {
  const l=generated({mode:"derivative",expression:"(x^2+1)/(x-1)"});
  assert.ok(l.steps.some(s=>s.title==="Apply the quotient rule"));
  assert.ok(l.steps.some(s=>s.parts[0].tex.includes("^{2}")));
});
test("nested chain rule peels outer and inner functions", () => {
  const l=generated({mode:"derivative",expression:"tan(sqrt(1+x^2))"});
  assert.ok(l.steps.some(s=>s.parts[0].tex.includes("\\tan")));
  assert.ok(l.steps.some(s=>s.parts[0].tex.includes("\\sqrt")));
  assert.match(finalTex(l), /\\tan|\\cos/);
  assert.ok(l.steps.length<=16);
});
test("cosine derivative keeps its negative sign", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"cos(x)"})), /-/);
});
test("exponential chain rule", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"exp(2*x)"})), /e|exp/);
});
test("log chain rule", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"log(x^2+1)"})), /\\frac/);
});
test("square root chain rule", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"sqrt(x)"})), /\\sqrt/);
});
test("negative integer power derivative", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"x^-2"})), /x/);
});
test("rational one-half power is supported", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"x^(1/2)"})), /x|\\sqrt/);
});
test("rational negative one-third power is supported", () => {
  assert.match(finalTex(generated({mode:"derivative",expression:"x^(-1/3)"})), /x/);
});
test("alternate variable name is honored", () => {
  const l=generated({mode:"derivative",expression:"t^3",variable:"t"});
  assert.match(finalTex(l), /t/); assert.equal(l.graph.variable,"t");
});
test("tangent of x squared at two has slope four", () => {
  const l=generated({mode:"tangent",expression:"x^2",at:"2"});
  assert.ok(l.steps.some(s=>s.parts[0].tex==="f'(2)=4"));
  assert.equal(finalTex(l),"y=4x-4"); assert.equal(l.graph.tangent,true);
});
test("zero-slope tangent simplifies to a horizontal line", () => {
  assert.equal(finalTex(generated({mode:"tangent",expression:"sin(x)",at:"pi/2"})),"y=1");
});
test("generated equations render with local KaTeX", () => {
  const lessons=[
    generated({mode:"derivative",expression:"x^2*sin(x)"}),
    generated({mode:"derivative",expression:"(x^2+1)/(x-1)"}),
    generated({mode:"derivative",expression:"tan(sqrt(1+x^2))"}),
    generated({mode:"tangent",expression:"sin(x)",at:"pi/2"}),
    generated({mode:"linearization",expression:"sqrt(x)",at:"4"}),
    generated({mode:"limit",expression:"(x^2-1)/(x-1)",at:"1"}),
    generated({mode:"limit",expression:"sin(x)",at:"0"})
  ];
  for(const lesson of lessons) for(const step of lesson.steps) for(const part of step.parts) {
    assert.doesNotThrow(()=>katex.renderToString(part.tex,{throwOnError:true,trust:false}));
  }
});
test("tangent point-slope handles negative function value", () => {
  const l=generated({mode:"tangent",expression:"x^2-5",at:"2"});
  assert.ok(l.steps.some(s=>s.parts[0].tex==="y+1=4(x-2)"));
  assert.equal(finalTex(l),"y=4x-9");
});
test("tangent base accepts pi over two and has near-zero cosine slope", () => {
  const l=generated({mode:"tangent",expression:"sin(x)",at:"pi/2"});
  const step=l.steps.find(s=>s.title==="Evaluate the slope");
  assert.ok(Math.abs(Number(step.parts[0].tex.split("=")[1]))<1e-10);
  assert.ok(Math.abs(l.graph.base-Math.PI/2)<1e-12);
});
test("base accepts a vetted square root constant expression", () => {
  const l=generated({mode:"tangent",expression:"x^2",at:"sqrt(2)"});
  assert.ok(Math.abs(l.graph.base-Math.sqrt(2))<1e-12);
});
test("linearization has evaluated slope and local formula", () => {
  const l=generated({mode:"linearization",expression:"sqrt(x)",at:"4"});
  assert.ok(l.steps.some(s=>s.parts[0].tex==="f'(4)=0.25"));
  assert.match(finalTex(l),/^L\(x\)=/);
});
test("tangent rejects a point outside the real square-root domain", () => {
  rejects({mode:"tangent",expression:"sqrt(x)",at:"-1"}, /real and smooth/);
});
test("tangent rejects non-finite derivative at square-root endpoint", () => {
  rejects({mode:"tangent",expression:"sqrt(x)",at:"0"}, /real and smooth/);
});
test("direct polynomial limit evaluates by continuity", () => {
  const l=generated({mode:"limit",expression:"x^2+1",at:"2"});
  assert.equal(l.graph.limitTarget,5); assert.match(finalTex(l),/=5$/);
});
test("direct trigonometric limit evaluates by continuity", () => {
  assert.equal(generated({mode:"limit",expression:"sin(x)",at:"0"}).graph.limitTarget,0);
});
test("direct square-root limit inside domain evaluates", () => {
  assert.equal(generated({mode:"limit",expression:"sqrt(x)",at:"4"}).graph.limitTarget,2);
});
test("removable polynomial factor is shown and canceled", () => {
  const l=generated({mode:"limit",expression:"(x^2-1)/(x-1)",at:"1"});
  assert.equal(l.graph.limitTarget,2); assert.ok(l.graph.holes.some(h=>h.x===1&&h.y===2));
  assert.ok(l.steps.some(s=>s.title==="Cancel only off the hole"));
});
test("repeated common factors cancel with multiplicity", () => {
  assert.equal(generated({mode:"limit",expression:"(x-1)^3/(x-1)^2",at:"1"}).graph.limitTarget,0);
});
test("removable cancellation preserves a negative sign", () => {
  assert.equal(generated({mode:"limit",expression:"(1-x)/(x-1)",at:"1"}).graph.limitTarget,-1);
});
test("removable limit checks residual denominator", () => {
  const l=generated({mode:"limit",expression:"(x^2-4)/(x^2-2*x)",at:"2"});
  assert.equal(l.graph.limitTarget,2);
  assert.ok(l.steps.some(s=>s.title==="Check the remaining denominator"));
});
test("two-sided pole is rejected", () => {
  rejects({mode:"limit",expression:"1/x",at:"0"}, /cannot determine this limit reliably/);
});
test("unsupported trigonometric indeterminate limit is rejected", () => {
  rejects({mode:"limit",expression:"sin(x)/x",at:"0"}, /cannot determine this limit reliably/);
});
test("tangent singularity at pi over two is rejected", () => {
  rejects({mode:"limit",expression:"tan(x)",at:"pi/2"}, /cannot determine this limit reliably/);
});
test("tangent line at tangent singularity is rejected", () => {
  rejects({mode:"tangent",expression:"tan(x)",at:"pi/2"}, /real and smooth/);
});
test("two-sided square-root endpoint limit is conservatively rejected", () => {
  rejects({mode:"limit",expression:"sqrt(x)",at:"0"}, /cannot determine this limit reliably/);
});
test("log boundary is rejected as outside an open continuous domain", () => {
  rejects({mode:"limit",expression:"log(x)",at:"0"}, /not defined|cannot determine/);
});
test("unknown symbol is rejected", () => {
  rejects({mode:"derivative",expression:"x+y"}, /symbol 'y' is not allowed/);
});
test("unknown function is rejected", () => {
  rejects({mode:"derivative",expression:"foo(x)"}, /Only one-argument/);
});
test("array syntax is rejected", () => {
  rejects({mode:"derivative",expression:"[x,1]"}, /unsupported construct/);
});
test("property access is rejected", () => {
  rejects({mode:"derivative",expression:"x.constructor"}, /unsupported construct/);
});
test("assignment syntax is rejected", () => {
  rejects({mode:"derivative",expression:"x=2"}, /unsupported construct/);
});
test("import call is rejected", () => {
  rejects({mode:"derivative",expression:"import('fs')"}, /Only one-argument/);
});
test("variable name is constrained", () => {
  rejects({mode:"derivative",expression:"x",variable:"pi"}, /variable name/);
});
test("unbounded power exponent is rejected", () => {
  rejects({mode:"derivative",expression:"x^100"}, /bounded rational/);
});
test("variable exponent is rejected", () => {
  rejects({mode:"derivative",expression:"x^x"}, /bounded rational/);
});
test("oversized expression is rejected", () => {
  rejects({mode:"derivative",expression:"x+"+"1+".repeat(250)+"1"}, /1 to 400 characters/);
});
test("approach point cannot contain a variable or code", () => {
  rejects({mode:"limit",expression:"x^2",at:"x+1"}, /numeric value or a constant expression/);
});
test("approach point must be finite and bounded", () => {
  rejects({mode:"limit",expression:"x^2",at:"1e100"}, /finite number/);
});
test("unknown mode is rejected", () => {
  rejects({mode:"integral",expression:"x"}, /Choose derivative/);
});
test("limit requires a finite approach point", () => {
  rejects({mode:"limit",expression:"x"}, /finite real point/);
});

if (!process.exitCode) console.log("Solver tests passed:", passed);
