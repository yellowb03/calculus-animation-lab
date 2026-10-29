(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("mathjs"));
  else root.CalculusSolver = factory(root.math);
})(typeof globalThis !== "undefined" ? globalThis : this, function (math) {
  "use strict";

  if (!math || typeof math.parse !== "function") throw new Error("CalculusSolver needs the bundled math.js library.");

  const FUNCTIONS = new Set(["sin", "cos", "tan", "sqrt", "exp", "log"]);
  const OPS = new Set(["+", "-", "*", "/", "^"]);
  const MAX_SOURCE = 400;
  const MAX_NODES = 80;
  const MAX_DEPTH = 20;
  const EPS = 1e-10;

  function fail(message) { throw new Error(message); }

  function finiteScalar(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

  function constantNumber(node) {
    if (node.isConstantNode && typeof node.value === "number") return node.value;
    if (node.isParenthesisNode) return constantNumber(node.content);
    if (node.isSymbolNode && node.name === "pi") return Math.PI;
    if (node.isSymbolNode && node.name === "e") return Math.E;
    if (node.isOperatorNode) {
      const a=constantNumber(node.args[0]); if(a===null) return null;
      if(node.args.length===1) return node.op==="-"?-a:node.op==="+"?a:null;
      const b=constantNumber(node.args[1]); if(b===null) return null;
      let v;
      if(node.op==="+") v=a+b;
      else if(node.op==="-") v=a-b;
      else if(node.op==="*") v=a*b;
      else if(node.op==="/") { if(Math.abs(b)<EPS) return null; v=a/b; }
      else if(node.op==="^") { if(Math.abs(b)>12) return null; v=Math.pow(a,b); }
      else return null;
      return Number.isFinite(v) && Math.abs(v)<=1e6 ? v : null;
    }
    if(node.isFunctionNode && node.args.length===1 && node.fn && node.fn.isSymbolNode && FUNCTIONS.has(node.fn.name)) {
      const a=constantNumber(node.args[0]); if(a===null) return null;
      let v; try { v=math[node.fn.name](a); } catch (_) { return null; }
      return finiteScalar(v) && Math.abs(v)<=1e6 ? v : null;
    }
    return null;
  }

  function rationalConstant(node) {
    if(node.isConstantNode) return typeof node.value==="number" && Number.isFinite(node.value);
    if(node.isParenthesisNode) return rationalConstant(node.content);
    if(node.isOperatorNode) return node.args.every(rationalConstant) && constantNumber(node)!==null;
    return false;
  }

  function validateVariable(variable) {
    if (typeof variable !== "string" || !/^[A-Za-z][A-Za-z0-9_]{0,7}$/.test(variable) || variable === "pi" || variable === "e") {
      fail("Use a variable name with one to eight letters or digits, such as x or t.");
    }
  }

  function parseFiniteInput(value, label) {
    if (typeof value === "number") {
      if (finiteScalar(value) && Math.abs(value) <= 1e6) return value;
      fail(label + " must be a finite number between -1,000,000 and 1,000,000.");
    }
    if (typeof value !== "string" || !value.trim() || value.length > 80) fail(label + " must be a finite numeric value or a constant expression such as pi/2.");
    let constantNode;
    try { constantNode=math.parse(value); } catch (_) { fail(label + " must be a finite numeric value or a constant expression such as pi/2."); }
    const n = constantNumber(constantNode);
    if (n===null) fail(label + " must be a finite numeric value or a constant expression such as pi/2.");
    if (!finiteScalar(n) || Math.abs(n) > 1e6) fail(label + " must be a finite number between -1,000,000 and 1,000,000.");
    return n;
  }

  function validateExpression(source, variable) {
    if (typeof source !== "string" || !source.trim() || source.length > MAX_SOURCE) {
      fail("Enter an expression from 1 to " + MAX_SOURCE + " characters.");
    }
    let rootNode;
    try { rootNode = math.parse(source); }
    catch (_) { fail("I could not parse that expression. Check its parentheses and operators."); }
    let count = 0;
    const walk = (node, depth) => {
      count++;
      if (count > MAX_NODES || depth > MAX_DEPTH) fail("That expression is too complex. Shorten it and try again.");
      if (node.isConstantNode) {
        if (typeof node.value !== "number" || !Number.isFinite(node.value) || Math.abs(node.value) > 1e6) {
          fail("Only finite numeric constants are supported.");
        }
        return;
      }
      if (node.isSymbolNode) {
        if (node.name !== variable && node.name !== "pi" && node.name !== "e") {
          fail("The symbol '" + node.name + "' is not allowed. Use only " + variable + ", pi, and e.");
        }
        return;
      }
      if (node.isParenthesisNode) { walk(node.content, depth + 1); return; }
      if (node.isOperatorNode) {
        if (!OPS.has(node.op) || !node.args || (node.args.length !== 1 && node.args.length !== 2)) {
          fail("Only scalar addition, subtraction, multiplication, division, powers, and unary signs are supported.");
        }
        if (node.op === "^" && node.args.length === 2) {
          const exponent = constantNumber(node.args[1]);
          if (!(rationalConstant(node.args[1]) && Number.isFinite(exponent) && Math.abs(exponent) <= 12)) {
            fail("Symbolic differentiation supports bounded rational constant powers, such as 1/2, 1/4, -1/3, or 2.");
          }
        }
        node.args.forEach(arg => walk(arg, depth + 1));
        return;
      }
      if (node.isFunctionNode) {
        const nameNode = node.fn;
        const name = nameNode && nameNode.isSymbolNode ? nameNode.name : "";
        if (!FUNCTIONS.has(name) || node.args.length !== 1) {
          fail("Only one-argument sin, cos, tan, sqrt, exp, and log calls are supported.");
        }
        walk(node.args[0], depth + 1);
        return;
      }
      fail("This expression uses an unsupported construct. Use scalar arithmetic and the supported elementary functions.");
    };
    walk(rootNode, 0);
    return rootNode;
  }

  function tex(node) { return node.toTex(); }

  function expressionTex(node) {
    // math.js inserts harmless spaces inside symbol braces; KaTeX accepts these.
    return tex(node).replace(/\s+/g, " ").trim();
  }

  function evalAt(node, variable, at) {
    let value;
    try { value = node.evaluate({ [variable]: at }); }
    catch (_) { fail("The expression is not defined at " + variable + "=" + at + ". Choose a point in its real domain."); }
    if (!finiteScalar(value)) fail("The expression is not a finite real number at " + variable + "=" + at + ". Choose another point.");
    return value;
  }

  function numberString(n) {
    if (!Number.isFinite(n)) return String(n);
    const rounded=Number(n.toPrecision(12));
    return Object.is(rounded,-0) ? "0" : String(rounded);
  }

  function spokenVar(v) {
    return v === "a" ? "A" : String(v);
  }

  function unwrapParens(node) {
    while (node && node.isParenthesisNode) node = node.content;
    return node;
  }

  function isCompoundSumDiff(node) {
    const n = unwrapParens(node);
    return !!(n && n.isOperatorNode && n.args.length === 2 && (n.op === "+" || n.op === "-"));
  }

  function isSimpleImplicitMulTarget(node) {
    const n = unwrapParens(node);
    if (!n) return false;
    if (n.isSymbolNode || n.isFunctionNode) return true;
    if (n.isOperatorNode && n.op === "^" && n.args[0] && unwrapParens(n.args[0]).isSymbolNode) return true;
    return false;
  }

  function spokenMath(input) {
    if (input == null) return "";
    let node = input;
    if (typeof input === "number") {
      return input < 0 ? "negative " + numberString(Math.abs(input)) : numberString(input);
    }
    if (typeof input === "string") {
      try {
        node = math.parse(input);
      } catch (_) {
        return input
          .replace(/\b([fghLpqy])'\(([^()]+)\)/g, "$1-prime of $2")
          .replace(/\bsqrt\(([^()]+)\)/g, "the square root of $1")
          .replace(/\bsin\(([^()]+)\)/g, "sine of $1")
          .replace(/\bcos\(([^()]+)\)/g, "cosine of $1")
          .replace(/\btan\(([^()]+)\)/g, "tangent of $1")
          .replace(/\b([A-Za-z])\^2\b/g, "$1-squared")
          .replace(/\b([A-Za-z])\^3\b/g, "$1-cubed")
          .replace(/\*/g, " times ")
          .replace(/\s+/g, " ")
          .trim();
      }
    }
    node = unwrapParens(node);
    if (!node) return "";
    if (node.isConstantNode) {
      const val = Number(node.value);
      return val < 0 ? "negative " + numberString(Math.abs(val)) : numberString(val);
    }
    if (node.isSymbolNode) {
      if (node.name === "pi") return "pi";
      if (node.name === "e") return "e";
      return spokenVar(node.name);
    }
    if (node.isFunctionNode) {
      const argNode = unwrapParens(node.args[0]);
      const arg = spokenMath(argNode);
      const name = node.fn && node.fn.name ? node.fn.name : "";
      const quantityArg = isCompoundSumDiff(argNode) ? "the quantity " + arg : arg;
      if (name === "sin") return "sine of " + quantityArg;
      if (name === "cos") return "cosine of " + quantityArg;
      if (name === "tan") return "tangent of " + quantityArg;
      if (name === "sqrt") return "the square root of " + arg;
      if (name === "exp") return "e to the power of " + arg;
      if (name === "log") return "natural log of " + quantityArg;
      return name + " of " + arg;
    }
    if (node.isOperatorNode) {
      if (node.args.length === 1) {
        const inner = spokenMath(node.args[0]);
        return node.op === "-" ? "negative " + inner : inner;
      }
      const left = unwrapParens(node.args[0]);
      const right = unwrapParens(node.args[1]);
      const L = spokenMath(left);
      const R = spokenMath(right);
      if (node.op === "+") return L + " plus " + R;
      if (node.op === "-") return L + " minus " + R;
      if (node.op === "*") {
        if (left.isConstantNode && isSimpleImplicitMulTarget(right)) {
          return L + " " + R;
        }
        const leftPart = isCompoundSumDiff(left) ? "the quantity " + L + "," : L;
        const rightPart = isCompoundSumDiff(right) ? "the quantity " + R : R;
        return leftPart + " times " + rightPart;
      }
      if (node.op === "/") {
        if (left.isConstantNode && right.isConstantNode) {
          const pair = left.value + "/" + right.value;
          if (pair === "1/2") return "one-half";
          if (pair === "3/2") return "three-halves";
          if (pair === "1/3") return "one-third";
          if (pair === "2/3") return "two-thirds";
          if (pair === "1/4") return "one-fourth";
          if (pair === "3/4") return "three-fourths";
          if (pair === "1/6") return "one-sixth";
        }
        if (left.isSymbolNode && left.name === "pi" && right.isConstantNode) {
          return "pi over " + numberString(right.value);
        }
        if (isCompoundSumDiff(left) || isCompoundSumDiff(right)) {
          return L + ", all over " + R;
        }
        return L + " over " + R;
      }
      if (node.op === "^") {
        const expVal = constantNumber(right);
        const compoundBase = left.isOperatorNode || left.isFunctionNode;
        const basePhrase = compoundBase ? "the quantity " + L + "," : L;
        if (expVal === 2) return compoundBase ? basePhrase + " squared" : L + "-squared";
        if (expVal === 3) return compoundBase ? basePhrase + " cubed" : L + "-cubed";
        if (expVal === 4) return basePhrase + " to the fourth";
        return basePhrase + " to the power of " + R;
      }
    }
    return String(input);
  }

  function displacement(variable, at) {
    const n=numberString(Math.abs(at));
    return "("+variable+(at<0?"+"+n:"-"+n)+")";
  }

  function subtractPoint(value) {
    return "y"+(value<0?"+"+numberString(Math.abs(value)):"-"+numberString(value));
  }

  function signedSum(a, b) {
    return numberString(a)+(b<0?"-":"+")+numberString(Math.abs(b));
  }

  function derivativeSource(node, variable) {
    const src=n=>"("+n.toString()+")";
    const d=n=>"("+derivativeSource(n,variable)+")";
    if (node.isConstantNode) return "0";
    if (node.isSymbolNode) return node.name===variable?"1":"0";
    if (node.isParenthesisNode) return derivativeSource(node.content,variable);
    if (node.isOperatorNode) {
      if (node.args.length===1) return node.op==="-"?"-"+d(node.args[0]):d(node.args[0]);
      const a=node.args[0],b=node.args[1], da=d(a), db=d(b), A=src(a), B=src(b);
      if (node.op==="+") return da+"+"+db;
      if (node.op==="-") return da+"-"+db;
      if (node.op==="*") return da+"*"+B+"+"+A+"*"+db;
      if (node.op==="/") return "("+da+"*"+B+"-"+A+"*"+db+")/("+B+")^2";
      if (node.op==="^") {
        const n=constantNumber(b);
        return n===0?"0":String(n)+"*"+A+"^("+String(n-1)+")*"+da;
      }
    }
    if (node.isFunctionNode) {
      const u=node.args[0], U=src(u), du=d(u), f=node.fn.name;
      if (f==="sin") return "cos"+U+"*"+du;
      if (f==="cos") return "-sin"+U+"*"+du;
      if (f==="tan") return du+"/(cos"+U+")^2";
      if (f==="sqrt") return du+"/(2*sqrt"+U+")";
      if (f==="exp") return "exp"+U+"*"+du;
      if (f==="log") return du+"/"+U;
    }
    fail("I could not form a derivative rule for this expression.");
  }

  function continuousAt(node, variable, at) {
    if (node.isConstantNode || node.isSymbolNode) return true;
    if (node.isParenthesisNode) return continuousAt(node.content, variable, at);
    if (node.isOperatorNode) {
      const args = node.args;
      if (!args.every(arg => continuousAt(arg, variable, at))) return false;
      if (node.op === "/" && Math.abs(evalAt(args[1], variable, at)) < EPS) return false;
      if (node.op === "^") {
        const base = evalAt(args[0], variable, at);
        const exponent = constantNumber(args[1]);
        if (exponent < 0 && Math.abs(base) < EPS) return false;
        if (!Number.isInteger(exponent) && base <= 0) return false;
      }
      return true;
    }
    if (node.isFunctionNode) {
      const arg = node.args[0];
      if (!continuousAt(arg, variable, at)) return false;
      const v = evalAt(arg, variable, at);
      const name = node.fn.name;
      if (name === "log" && v <= 0) return false;
      if (name === "sqrt" && (v < 0 || (Math.abs(v)<EPS && dependsOn(arg,variable)))) return false;
      if (name === "tan" && Math.abs(Math.cos(v)) < EPS) return false;
      return true;
    }
    return false;
  }

  function dependsOn(node, variable) {
    if(node.isSymbolNode) return node.name===variable;
    if(node.isParenthesisNode) return dependsOn(node.content,variable);
    if(node.isOperatorNode) return node.args.some(a=>dependsOn(a,variable));
    if(node.isFunctionNode) return node.args.some(a=>dependsOn(a,variable));
    return false;
  }

  const RULE_TEXT = {
    constant: ["Keep the constant multiplier while differentiating the remaining factor.", "A fixed negative sign or constant multiple stays in front of the derivative."],
    sum: ["Use the sum and difference rules term by term.", "The derivative of a sum or difference, is the sum or difference of the derivatives."],
    product: ["Apply the product rule without dropping either contribution.", "By the product rule, differentiate the first factor and keep the second, plus keep the first factor and differentiate the second."],
    quotient: ["Apply the quotient rule and keep the denominator squared.", "By the quotient rule, take the derivative of the top times the bottom, minus the top times the derivative of the bottom, all over the bottom squared."],
    power: ["Apply the power rule to each supported rational constant power.", "By the power rule, bring the exponent down in front, subtract one from the exponent, and multiply by the inner derivative."],
    chain: ["Apply the Chain Rule to each supported elementary function.", "By the Chain Rule, differentiate the outer function, keep the inside unchanged, and multiply by the derivative of the inside."]
  };

  function makeStep(title, why, narration, texValue, color) {
    return { title, why, narration, parts: [{ id: "eq", tex: texValue, ...(color ? { color } : {}) }] };
  }

  function rawTerm(node) { return {kind:"raw",node}; }
  function derivativeTerm(node) { return {kind:"derivative",node}; }
  function opTerm(op,args) { return {kind:"operator",op,args}; }
  function callTerm(name,args) { return {kind:"call",name,args}; }

  function termTex(term, variable) {
    if(term.kind==="raw") return expressionTex(term.node);
    if(term.kind==="derivative") return "\\frac{d}{d"+variable+"}\\left("+expressionTex(term.node)+"\\right)";
    if(term.kind==="call") {
      const a=termTex(term.args[0],variable);
      if(term.name==="sqrt") return "\\sqrt{"+a+"}";
      if(term.name==="exp") return "e^{"+a+"}";
      if(term.name==="log") return "\\ln\\left("+a+"\\right)";
      const fn=term.name==="sin"?"\\sin":term.name==="cos"?"\\cos":"\\tan";
      return fn+"\\left("+a+"\\right)";
    }
    const a=term.args[0], A=termTex(a,variable);
    if(term.args.length===1) return term.op==="-"?"-\\left("+A+"\\right)":A;
    const B=termTex(term.args[1],variable);
    if(term.op==="+") return "\\left("+A+"+"+B+"\\right)";
    if(term.op==="-") return "\\left("+A+"-"+B+"\\right)";
    if(term.op==="*") return "\\left("+A+"\\right)\\left("+B+"\\right)";
    if(term.op==="/") return "\\frac{"+A+"}{"+B+"}";
    if(term.op==="^") return "\\left("+A+"\\right)^{"+B+"}";
    fail("Could not display an intermediate derivative step.");
  }

  function expandDerivative(node,variable) {
    if(node.isParenthesisNode) return expandDerivative(node.content,variable);
    if(node.isConstantNode) return {term:rawTerm(math.parse("0")),rule:null};
    if(node.isSymbolNode) return {term:rawTerm(math.parse(node.name===variable?"1":"0")),rule:null};
    if(node.isOperatorNode) {
      if(node.args.length===1) return {term:opTerm(node.op,[derivativeTerm(node.args[0])]),rule:"constant"};
      const a=node.args[0],b=node.args[1], A=rawTerm(a),B=rawTerm(b), da=derivativeTerm(a),db=derivativeTerm(b);
      if(node.op==="+") return {term:opTerm("+",[da,db]),rule:"sum"};
      if(node.op==="-") return {term:opTerm("-",[da,db]),rule:"sum"};
      if(node.op==="*") return {term:opTerm("+",[opTerm("*",[da,B]),opTerm("*",[A,db])]),rule:"product"};
      if(node.op==="/") return {term:opTerm("/",[opTerm("-",[opTerm("*",[da,B]),opTerm("*",[A,db])]),opTerm("^",[B,rawTerm(math.parse("2"))])]),rule:"quotient"};
      if(node.op==="^") {
        const n=constantNumber(b);
        const inner=n===1?rawTerm(math.parse("1")):opTerm("^",[A,rawTerm(math.parse(numberString(n-1)))]);
        const leading=opTerm("*",[rawTerm(math.parse(numberString(n))),inner]);
        return {term:n===0?rawTerm(math.parse("0")):opTerm("*",[leading,derivativeTerm(a)]),rule:"power"};
      }
    }
    if(node.isFunctionNode) {
      const u=node.args[0], U=rawTerm(u), du=derivativeTerm(u), f=node.fn.name;
      if(f==="sin") return {term:opTerm("*",[callTerm("cos",[U]),du]),rule:"chain"};
      if(f==="cos") return {term:opTerm("*",[opTerm("-",[callTerm("sin",[U])]),du]),rule:"chain"};
      if(f==="tan") return {term:opTerm("/",[du,opTerm("^",[callTerm("cos",[U]),rawTerm(math.parse("2"))])]),rule:"chain"};
      if(f==="sqrt") return {term:opTerm("/",[du,opTerm("*",[rawTerm(math.parse("2")),callTerm("sqrt",[U])])]),rule:"chain"};
      if(f==="exp") return {term:opTerm("*",[callTerm("exp",[U]),du]),rule:"chain"};
      if(f==="log") return {term:opTerm("/",[du,U]),rule:"chain"};
    }
    fail("I could not form an intermediate derivative for this expression.");
  }

  function expandFirst(term,variable) {
    if(term.kind==="derivative") return {...expandDerivative(term.node,variable),expanded:true};
    if(term.args) {
      for(let i=0;i<term.args.length;i++) {
        const next=expandFirst(term.args[i],variable);
        if(next.expanded) {
          const args=term.args.slice(); args[i]=next.term;
          return {term:{...term,args},rule:next.rule,expanded:true};
        }
      }
    }
    return {term,expanded:false};
  }

  function hasDerivative(term) {
    if(term.kind==="derivative") return true;
    return !!(term.args && term.args.some(arg=>hasDerivative(arg)));
  }

  function derivativeSteps(node, variable, source) {
    // Ask math.js to verify its supported symbolic path; our small tree keeps rule substitutions visible.
    math.derivative(node, variable, { simplify: false });
    const raw = math.parse(derivativeSource(node,variable));
    const simplified = math.simplify(raw);
    const vSpoken = spokenVar(variable);
    const lhs="\\frac{d}{d"+variable+"}f("+variable+")";
    const steps=[makeStep("Write the function", "Keep the original function visible before differentiating it.",
      "We start with the function f of "+vSpoken+", equals "+spokenMath(node)+". Let's take its derivative with respect to "+vSpoken+".",
      "f("+variable+")="+expressionTex(node))];
    let current=derivativeTerm(node), expansions=0;
    while(expansions<12) {
      const next=expandFirst(current,variable);
      if(!next.expanded) break;
      current=next.term; expansions++;
      const rule=next.rule;
      const title=rule?"Apply the "+rule+" rule":"Differentiate a constant or variable";
      const why=rule?RULE_TEXT[rule][0]:"Replace the derivative of this basic term with its known value.";
      const narration=rule?RULE_TEXT[rule][1]:"A standalone constant differentiates to zero, and the variable "+vSpoken+" differentiates to one.";
      let displayed=termTex(current,variable);
      if(displayed.length>1700) { current=rawTerm(raw); displayed=expressionTex(raw); break; }
      steps.push(makeStep(title,why,narration,lhs+"="+displayed,"cyan"));
    }
    // If the stage cap is reached, expose math.js's verified unsimplified form before simplification.
    if(hasDerivative(current)) {
      steps.push(makeStep("Finish the derivative terms", "Use the verified rule expansion for the remaining nested factors.",
        "The remaining inner factors differentiate by the same rules, giving this complete unsimplified derivative.",
        "f'("+variable+")="+expressionTex(raw)));
    }
    steps.push(makeStep("Simplify the derivative", "Combine constants and like factors after the rule steps.",
      "Now combine and simplify the terms: f-prime of "+vSpoken+", equals "+spokenMath(simplified)+".",
      "f'("+variable+")="+expressionTex(simplified), "cyan"));
    return { raw, simplified, steps };
  }

  function polynomial(node, variable) {
    // Return ascending coefficient arrays only for real polynomials.
    const trim = a => { while (a.length > 1 && Math.abs(a[a.length - 1]) < EPS) a.pop(); return a; };
    const add = (a, b, sign) => { const c = Array(Math.max(a.length, b.length)).fill(0); for (let i=0;i<c.length;i++) c[i]=(a[i]||0)+sign*(b[i]||0); return trim(c); };
    const mul = (a, b) => { const c=Array(a.length+b.length-1).fill(0); for(let i=0;i<a.length;i++) for(let j=0;j<b.length;j++) c[i+j]+=a[i]*b[j]; return trim(c); };
    const go = n => {
      if (n.isParenthesisNode) return go(n.content);
      if (n.isConstantNode) return [n.value];
      if (n.isSymbolNode) return n.name === variable ? [0,1] : (n.name === "pi" ? [Math.PI] : [Math.E]);
      if (!n.isOperatorNode) return null;
      const a=go(n.args[0]); if (!a) return null;
      if (n.args.length===1) return n.op==="-" ? a.map(v=>-v) : a;
      const b=go(n.args[1]); if (!b) return null;
      if (n.op==="+") return add(a,b,1);
      if (n.op==="-") return add(a,b,-1);
      if (n.op==="*") return mul(a,b);
      if (n.op==="/") return b.length===1 && Math.abs(b[0])>=EPS ? a.map(v=>v/b[0]) : null;
      if (n.op==="^") {
        const exponent=constantNumber(n.args[1]);
        if (exponent===null || !Number.isInteger(exponent) || exponent<0 || exponent>12) return null;
        let out=[1]; for(let i=0;i<exponent;i++) out=mul(out,a); return out;
      }
      return null;
    };
    return go(node);
  }

  function divideByRoot(coeffs, at) {
    const n=coeffs.length-1;
    if (n<1) return null;
    const q=Array(n).fill(0); q[n-1]=coeffs[n];
    for(let k=n-2;k>=0;k--) q[k]=coeffs[k+1]+at*q[k+1];
    const rem=coeffs[0]+at*q[0];
    if(Math.abs(rem)>EPS*Math.max(1,...coeffs.map(Math.abs))) return null;
    while(q.length>1 && Math.abs(q[q.length-1])<EPS) q.pop();
    return q;
  }

  function polyString(coeffs, variable) {
    const terms=[];
    for(let i=coeffs.length-1;i>=0;i--) {
      const c=coeffs[i]; if(Math.abs(c)<EPS) continue;
      const abs=Math.abs(c); let term;
      if(i===0) term=String(abs);
      else {
        const v=(abs===1?"":String(abs)+"*")+variable+(i===1?"":"^"+i);
        term=v;
      }
      terms.push({negative:c<0,term});
    }
    if(!terms.length) return "0";
    return terms.map((t,i)=>(i===0?(t.negative?"-":""):t.negative?" - ":" + ")+t.term).join("");
  }

  function rootFactor(variable, at) {
    const n=Number(at.toPrecision(12));
    return n<0 ? "("+variable+"+"+String(-n)+")" : "("+variable+"-"+String(n)+")";
  }

  function directLimitSteps(node, variable, at, value, originalSource) {
    const vSpoken = spokenVar(variable);
    const atSpoken = spokenMath(at);
    const valSpoken = spokenMath(value);
    return [
      makeStep("Check the expression at the approach point", "Direct substitution is valid only when the expression is continuous at the point.",
        "We want the limit of "+spokenMath(node)+", as "+vSpoken+" approaches "+atSpoken+". First, verify that the expression is continuous near "+vSpoken+" equals "+atSpoken+".",
        variable+"_{0}="+numberString(at)),
      makeStep("Substitute the approach value", "The validated expression is continuous at this finite point.",
        "Because the expression is continuous at "+vSpoken+" equals "+atSpoken+", substitute "+atSpoken+" directly into "+spokenMath(node)+".",
        "\\lim_{"+variable+"\\to"+numberString(at)+"}\\left("+expressionTex(node)+"\\right)="+numberString(value), "cyan"),
      makeStep("State the limit", "Continuity makes the evaluated value the two-sided limit.",
        "Therefore, as "+vSpoken+" approaches "+atSpoken+", the two-sided limit equals "+valSpoken+".",
        "\\lim_{"+variable+"\\to"+numberString(at)+"}\\left("+expressionTex(node)+"\\right)="+numberString(value), "cyan")
    ];
  }

  function removableLimitSteps(node, variable, at, top, bottom, topOrder, bottomOrder) {
    let p=top.slice(), q=bottom.slice(), k=0;
    while (Math.abs(evalPoly(p,at))<EPS && Math.abs(evalPoly(q,at))<EPS && p.length>1 && q.length>1) {
      p=divideByRoot(p,at); q=divideByRoot(q,at); if(!p||!q) break; k++;
    }
    if (!k || Math.abs(evalPoly(q,at))<EPS) return null;
    const factor=rootFactor(variable,at);
    const pStr=polyString(p,variable), qStr=polyString(q,variable);
    const pow=k===1?"":"^{"+k+"}";
    const factorTex=math.parse(factor).toTex();
    const vSpoken = spokenVar(variable);
    const atSpoken = spokenMath(at);
    const pVal = evalPoly(p,at), qVal = evalPoly(q,at), limVal = pVal / qVal;
    const steps=[
      makeStep("Check the original domain", "The original denominator vanishes at the approach point.",
        "As "+vSpoken+" approaches "+atSpoken+", both numerator and denominator evaluate to zero, giving a zero over zero indeterminate form.",
        "q("+variable+")=0\\quad\\mathrm{at}\\quad "+variable+"="+numberString(at), "red"),
      makeStep("Factor the shared zero", "Both numerator and denominator contain the same root factor.",
        "Synthetic division shows that the numerator and denominator share the common factor, "+spokenMath(factor)+".",
        "p("+variable+")="+factorTex+pow+"\\left("+math.parse(pStr).toTex()+"\\right),\\quad q("+variable+")="+factorTex+pow+"\\left("+math.parse(qStr).toTex()+"\\right)", "cyan"),
      makeStep("Cancel only off the hole", "Cancellation is valid for nearby x values where the common factor is nonzero.",
        "For "+vSpoken+" not equal to "+atSpoken+", cancel the common factor "+spokenMath(factor)+" to get the reduced quotient, "+spokenMath(pStr)+", all over "+spokenMath(qStr)+".",
        "\\frac{p("+variable+")}{q("+variable+")} = \\frac{"+factorTex+pow+"p_{1}("+variable+")}{"+factorTex+pow+"q_{1}("+variable+")}=\\frac{p_{1}("+variable+")}{q_{1}("+variable+")}", "red"),
      makeStep("Check the remaining denominator", "A nonzero remaining denominator proves continuity after cancellation.",
        "At "+vSpoken+" equals "+atSpoken+", the remaining denominator evaluates to "+spokenMath(qVal)+", which is nonzero, so the reduced quotient is continuous there.",
        "q_{1}("+String(at)+")="+String(qVal)+"\\ne0"),
      makeStep("Evaluate the reduced quotient", "The limit equals the reduced numerator value divided by the reduced denominator value.",
        "Substitute "+vSpoken+" equals "+atSpoken+" into the reduced quotient, giving "+spokenMath(pVal)+" divided by "+spokenMath(qVal)+".",
        "\\lim_{"+variable+"\\to"+String(at)+"}\\frac{p_{1}("+variable+")}{q_{1}("+variable+")}="+String(pVal)+"/"+String(qVal), "cyan"),
      makeStep("State the limit", "The original function and reduced quotient agree on a punctured neighborhood.",
        "Thus, as "+vSpoken+" approaches "+atSpoken+", the two-sided limit equals "+spokenMath(limVal)+", even though the original function is undefined at the hole.",
        "\\lim_{"+variable+"\\to"+String(at)+"}\\frac{p("+variable+")}{q("+variable+")}="+String(limVal), "cyan")
    ];
    return {steps, value:limVal};
  }

  function evalPoly(c,x) { let s=0; for(let i=c.length-1;i>=0;i--) s=s*x+c[i]; return s; }

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,36) || "expression"; }

  function buildLesson(options) {
    if (!options || typeof options !== "object" || Array.isArray(options)) fail("Pass an options object with mode and expression.");
    const mode=options.mode;
    if (!["derivative","tangent","linearization","limit"].includes(mode)) fail("Choose derivative, tangent, linearization, or limit mode.");
    const variable=options.variable == null ? "x" : options.variable;
    validateVariable(variable);
    const source=options.expression;
    const node=validateExpression(source,variable);
    const at=options.at == null ? (mode==="derivative" ? 0 : null) : parseFiniteInput(options.at,"Approach point");
    if (mode!=="derivative" && at===null) fail("Enter a finite real point for this mode.");
    const steps=[];
    let graph={kind:"function",expression:node.toString(),variable,base:at==null?0:at,xRange:[(at==null?0:at)-3,(at==null?0:at)+3],tangent:false};

    if (mode==="derivative") {
      const d=derivativeSteps(node,variable,source); steps.push(...d.steps);
      graph.derivative=d.simplified.toString();
      return lessonObject(mode,source,variable,at,steps,graph);
    }

    if (mode==="tangent" || mode==="linearization") {
      if (!continuousAt(node,variable,at)) fail("Choose a point where the function is real and smooth on an open interval around it.");
      const f0=evalAt(node,variable,at);
      const d=derivativeSteps(node,variable,source); steps.push(...d.steps);
      const slopeNode=d.simplified;
      const slope=evalAt(slopeNode,variable,at);
      const vSpoken = spokenVar(variable);
      const atSpoken = spokenMath(at);
      const f0Spoken = spokenMath(f0);
      const slopeSpoken = spokenMath(slope);
      steps.push(makeStep("Evaluate the point", "A tangent and linearization are built from the function and derivative at the same point.",
        "At "+vSpoken+" equals "+atSpoken+", f of "+atSpoken+", equals "+f0Spoken+". The graph marks this point on the curve.",
        "f("+numberString(at)+")="+numberString(f0), "cyan"));
      steps.push(makeStep("Evaluate the slope", "Substitute the base point into the simplified derivative.",
        "Evaluating the derivative at "+vSpoken+" equals "+atSpoken+" gives f-prime of "+atSpoken+", equals "+slopeSpoken+", which is the tangent slope.",
        "f'("+numberString(at)+")="+numberString(slope), "cyan"));
      const dx=displacement(variable,at);
      if (mode==="tangent") {
        steps.push(makeStep("Use point-slope form", "The tangent passes through the base point with the evaluated derivative as slope.",
          "Substitute the point "+vSpoken+" equals "+atSpoken+", y equals "+f0Spoken+", and slope "+slopeSpoken+" into point-slope form: "+spokenMath(subtractPoint(f0))+", equals "+slopeSpoken+" times the quantity "+spokenMath(dx)+".",
          subtractPoint(f0)+"="+numberString(slope)+dx, "cyan"));
        const intercept=f0-slope*at;
        const lineTex=Math.abs(slope)<EPS?"y="+numberString(f0):"y="+numberString(slope)+variable+(intercept<0?"":"+")+numberString(intercept);
        steps.push(makeStep("Write the tangent line", "Simplify the point-slope equation while preserving the same line.",
          "Simplifying into slope-intercept form, the tangent line has slope "+slopeSpoken+" and vertical intercept "+spokenMath(intercept)+".",
          lineTex, "cyan"));
      } else {
        steps.push(makeStep("Use the linearization formula", "A linearization is the tangent line written as a function of the input.",
          "The local linearization L of "+vSpoken+", equals f of "+vSpoken+" naught, plus f-prime of "+vSpoken+" naught, times the quantity "+spokenMath(dx)+".",
          "L("+variable+")=f("+variable+"_{0})+f'("+variable+"_{0})"+dx));
        steps.push(makeStep("Write the linearization", "Substitute the evaluated function value and slope.",
          "Substitute the base value "+f0Spoken+" and slope "+slopeSpoken+" to obtain the linear approximation: L of "+vSpoken+", equals "+f0Spoken+(slope<0?" minus ":" plus ")+numberString(Math.abs(slope))+" times the quantity "+spokenMath(dx)+".",
          "L("+variable+")="+signedSum(f0,slope)+dx, "cyan"));
      }
      graph.tangent=true; graph.derivative=slopeNode.toString();
      return lessonObject(mode,source,variable,at,steps,graph);
    }

    // Finite two-sided limits are deliberately narrow: continuity or a verified polynomial hole.
    if (continuousAt(node,variable,at)) {
      const value=evalAt(node,variable,at);
      steps.push(...directLimitSteps(node,variable,at,value,source));
      graph.limitTarget=value;
      return lessonObject(mode,source,variable,at,steps,graph);
    }
    const quotient=node.isParenthesisNode?node.content:node;
    if (quotient.isOperatorNode && quotient.op==="/") {
      const top=polynomial(quotient.args[0],variable), bottom=polynomial(quotient.args[1],variable);
      if (top && bottom && Math.abs(evalPoly(top,at))<EPS && Math.abs(evalPoly(bottom,at))<EPS) {
        const removable=removableLimitSteps(node,variable,at,top,bottom);
        if (removable) {
          steps.push(...removable.steps);
          graph.limitTarget=removable.value;
          graph.holes=[{x:at,y:removable.value}];
          return lessonObject(mode,source,variable,at,steps,graph);
        }
      }
    }
    fail("I cannot determine this limit reliably. Supported cases are continuous expressions at a finite point and polynomial quotients with a verified removable factor.");
  }

  function lessonObject(mode,source,variable,at,steps,graph) {
    return {
      id:"custom-"+slug(mode+"-"+variable+"-"+source+(at===null?"":"-"+numberString(at))),
      title:"Generated "+mode+" walkthrough",
      homework:"Custom", section:"Generated "+mode, exercise:source,
      problem:"Use the "+mode+" mode for "+source+" with respect to "+variable+(at===null?"":" at "+at)+".",
      source_note:"Generated locally from the expression you entered; no textbook source is claimed.",
      graph, steps
    };
  }

  return Object.freeze({
    buildLesson,
    spokenMath,
    examples:Object.freeze([
      {mode:"derivative",expression:"x^2+3*x",variable:"x"},
      {mode:"tangent",expression:"x^2",variable:"x",at:"2"},
      {mode:"linearization",expression:"sqrt(x)",variable:"x",at:"4"},
      {mode:"limit",expression:"(x^2-1)/(x-1)",variable:"x",at:"1"}
    ])
  });
});
