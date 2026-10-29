/* Responsive Apple-Zen 3Blue1Brown-on-White Canvas2D graphs for the Calculus Animation Lab. */
(function (global) {
  "use strict";

  const PALETTE = {
    bg: "#ffffff",
    holeBg: "#ffffff",
    curve: "#0071E3",
    curveHalo: "rgba(0, 113, 227, 0.14)",
    axis: "#CBD5E1",
    ink: "#1D1D1F",
    muted: "#64748B",
    cyan: "#0071E3",
    yellow: "#D97706",
    green: "#059669",
    red: "#E11D48",
    lavender: "#7C3AED",
    orange: "#EA580C",
    lensBg: "#F8FAFC",
    lensRing: "rgba(0, 113, 227, 0.28)"
  };
  const COLORS = PALETTE;
  const curves = new Map();
  const compiled = new Map();
  const TAU = Math.PI * 2;

  function configFor(lesson, view) {
    const id = String(lesson.id || "");
    const g = lesson.graph || {};
    if (g.kind === "function") {
      const rawX=Array.isArray(g.xRange)&&g.xRange.length===2?g.xRange.map(Number):null;
      const hasRange=rawX&&rawX.every(finite)&&rawX[1]>rawX[0]&&Math.abs(rawX[0])<1e6&&Math.abs(rawX[1])<1e6;
      const rawBase=g.base==null?null:Number(g.base),baseValue=rawBase!=null&&finite(rawBase)&&Math.abs(rawBase)<1e6?rawBase:null;
      const xr = hasRange?rawX:[baseValue!=null?baseValue-3:-4,baseValue!=null?baseValue+3:4];
      const rawY=Array.isArray(g.yRange)&&g.yRange.length===2?g.yRange.map(Number):null;
      const yr=rawY&&rawY.every(finite)&&rawY[1]>rawY[0]&&Math.abs(rawY[0])<1e6&&Math.abs(rawY[1])<1e6?rawY:null;
      return { kind: "generic", x: xr,
        y: yr, equal: false, xlabel: typeof g.variable==="string"?g.variable:"x", ylabel: "f(" + (typeof g.variable==="string"?g.variable:"x") + ")",
        cue: "Local linearity & limit corridor", lessonGraph: g };
    }
    if (id.startsWith("01-")) return { kind:"limit1",x:[-4,4],y:[.08,.36],xlabel:"h",ylabel:"quotient",cue:"Squeeze corridor \u00b7 hole stays open at (0, 1/6)" };
    if (id.startsWith("02-")) return { kind:"limit2",x:[-.8,1],y:[-.3,5.5],xlabel:"t",ylabel:"difference",cue:"Squeeze corridor \u00b7 hole at (0, 1), pole at \u22121" };
    if (id.startsWith("03-")) return { kind:"power4",x:[-.2,2],y:[-.4,17],xlabel:"x",ylabel:"f(x)=x\u2074",cue:"Rise/run dx-dy triangle \u00b7 secant \u2192 tangent" };
    if (id.startsWith("04-")) return { kind:"product",x:[0,2.4],y:[-.5,12],xlabel:"x",ylabel:"g(x)",cue:"Product rule \u00b7 local linearity at x = 1" };
    if (id.startsWith("05-")) return { kind:"quotient",x:[-3,1.65],y:[-6,14],xlabel:"u",ylabel:"y(u)",cue:"Quotient rule \u00b7 tangent at u = 0, pole u = 1" };
    if (id.startsWith("06-")) return { kind:"chain",x:[-1.12,1.12],y:[.2,3.2],xlabel:"t",ylabel:"F(t)",cue:"Chain rule \u00b7 central branch & zoom lens" };
    if (id.startsWith("07-")) return { kind:"implicit",x:[-4.5,4.5],y:[-4.5,4.5],xlabel:"x",ylabel:"y",cue:"Implicit lemniscate \u00b7 local linearity at (3, 1)",equal:true };
    if (id.startsWith("08-")) return { kind:"triangle",x:[-1.7,5.5],y:[-1.4,4.1],xlabel:"horizontal distance (cm)",ylabel:"height (cm)",cue:"Differential area sweep dA \u00b7 rates at t = 0",equal:true };
    if (id.startsWith("09-")) return { kind:"linear",x:[2.25,5.3],y:[-.1,3.6],xlabel:"x",ylabel:"f(x)",cue:"Linearization L(x) \u00b7 8\u00d7 local zoom at x = 3" };
    if (id.startsWith("10-")) return { kind:"extrema",x:[0,Math.PI/2],y:[-.5,3.4],xlabel:"t (radians)",ylabel:"f(t)",cue:"Closed-interval extrema \u00b7 sweeping tangent" };
    if (id.startsWith("11-")) return { kind:"infty1",x:[0,10],y:[-.18,2.2],xlabel:"t",ylabel:"original expression",cue:"Asymptotic corridor \u00b7 limit y = 0" };
    if (id.startsWith("12-")) return { kind:"infty2",x:[.1,10],y:[-.2,1.35],xlabel:"x",ylabel:"x sin(1/x)",cue:"Asymptotic corridor \u00b7 limit y = 1" };
    return null;
  }

  function fn(kind, x) {
    switch (kind) {
      case "limit1": return x <= -9 || Math.abs(x) < 1e-10 ? null : 1 / (Math.sqrt(9 + x) + 3);
      case "limit2": return Math.abs(x) < 1e-10 || Math.abs(x + 1) < 1e-10 ? null : 1 / (x + 1);
      case "power4": return x ** 4;
      case "product": return x < 0 ? null : x ** 1.5 + 2 * x;
      case "quotient": return Math.abs(x - 1) < 1e-8 ? null : (x + 2) ** 2 / (1 - x);
      case "chain": return Math.tan(Math.sqrt(1 + x * x));
      case "linear": return x <= Math.sqrt(5) ? null : 2 / Math.sqrt(x * x - 5);
      case "extrema": return x < -1e-9 || x > Math.PI / 2 + 1e-9 ? null : 2 * Math.cos(x) + Math.sin(2 * x);
      case "infty1": return x <= 0 ? null : 2 / (Math.sqrt(25 * x * x + 2) + 5 * x);
      case "infty2": return Math.abs(x) < 1e-12 ? null : x * Math.sin(1 / x);
      default: return null;
    }
  }

  function lessonTitle(lesson, i) {
    return lesson.steps && lesson.steps[i] ? String(lesson.steps[i].title || "").toLowerCase() : "";
  }
  function totalSteps(lesson) { return Math.max(1, (lesson.steps || []).length); }
  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
  function ease(t) {
    const u = clamp(Number(t) || 0, 0, 1);
    return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
  }
  function phase(step, progress, n, start = 0, end = n - 1) {
    const span = Math.max(1, end - start + 1);
    return clamp((step - start + ease(progress)) / span, 0, 1);
  }
  function finite(v) { return Number.isFinite(v); }
  function storeCurve(key,value){if(curves.has(key))curves.delete(key);curves.set(key,value);while(curves.size>128)curves.delete(curves.keys().next().value);}
  function storeCompiled(key,value){if(compiled.has(key))compiled.delete(key);compiled.set(key,value);while(compiled.size>128)compiled.delete(compiled.keys().next().value);}
  function niceStep(span) {
    const raw = span / 6; if (!(raw > 0)) return 1;
    const mag = Math.pow(10, Math.floor(Math.log10(raw))), q = raw / mag;
    return (q < 1.5 ? 1 : q < 3.5 ? 2 : q < 7.5 ? 5 : 10) * mag;
  }
  function fmt(v) {
    if (Math.abs(v) < 1e-10) return "0";
    if (Math.abs(v) >= 1000 || (Math.abs(v) < .01)) return Number(v.toPrecision(2)).toString();
    return Number(v.toFixed(2)).toString();
  }

  function viewport(ctx, canvas, cfg, view) {
    const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : null;
    const cssW = Math.max(1, rect && rect.width ? rect.width : (canvas.clientWidth || canvas.width || 600));
    const cssH = Math.max(1, rect && rect.height ? rect.height : (canvas.clientHeight || canvas.height || 360));
    const nativeDpr = clamp(Number(global.devicePixelRatio) || 1, 1, 4);
    const targetW = Math.round(cssW * nativeDpr);
    const targetH = Math.round(cssH * nativeDpr);
    if ((rect && rect.width > 0 && rect.height > 0) || (canvas.clientWidth > 0 && canvas.clientHeight > 0)) {
      if (canvas.width < targetW - 1 || canvas.height < targetH - 1) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    }
    const dprX = canvas.width ? canvas.width / cssW : nativeDpr;
    const dprY = canvas.height ? canvas.height / cssH : dprX;
    const dpr = dprX;
    ctx.setTransform(dprX, 0, 0, dprY, 0, 0);
    const w = cssW, h = cssH;
    const plot = { l: 58, t: 42, r: Math.max(80, w - 22), b: Math.max(90, h - 48) };
    plot.w = plot.r - plot.l; plot.h = plot.b - plot.t;
    let x0=cfg.x[0], x1=cfg.x[1], y0, y1;
    if (cfg.y) { y0=Number(cfg.y[0]); y1=Number(cfg.y[1]); }
    else if (cfg.kind === "generic") { y0=-3; y1=3; }
    else { y0=cfg.y[0]; y1=cfg.y[1]; }
    const zoom=finite(Number(view.zoom))?clamp(Number(view.zoom),.15,20):1;
    const panX=finite(Number(view.panX))?clamp(Number(view.panX),-1e6,1e6):0;
    const panY=finite(Number(view.panY))?clamp(Number(view.panY),-1e6,1e6):0;
    let cx=(x0+x1)/2+panX, cy=(y0+y1)/2+panY;
    let sx=(x1-x0)/zoom, sy=(y1-y0)/zoom;
    if (cfg.equal) {
      const unit=Math.min(plot.w/sx,plot.h/sy); sx=plot.w/unit;sy=plot.h/unit;
    }
    x0=cx-sx/2;x1=cx+sx/2;y0=cy-sy/2;y1=cy+sy/2;
    // Generic function views autoscale vertically from finite samples while respecting zoom and panY.
    if (cfg.kind === "generic" && !cfg.y) {
      const g=cfg.lessonGraph||{};
      const f=evaluator(g);
      let lo=Infinity,hi=-Infinity;
      for(let i=0;i<=100;i++){
        const x=x0+(x1-x0)*i/100,y=f&&f(x);
        if(finite(y)&&Math.abs(y)<1e4){lo=Math.min(lo,y);hi=Math.max(hi,y);}
      }
      const target=Number(g.limitTarget);
      if(g.limitTarget!=null&&finite(target)&&Math.abs(target)<1e4){lo=Math.min(lo,target);hi=Math.max(hi,target);}
      if(Array.isArray(g.holes)){
        for(const hole of g.holes){
          const hy=hole&&hole.y!=null?Number(hole.y):NaN;
          if(finite(hy)&&Math.abs(hy)<1e4){lo=Math.min(lo,hy);hi=Math.max(hi,hy);}
        }
      }
      if(finite(lo)&&finite(hi)){const pad=Math.max(.5,(hi-lo)*.16);sy=Math.max(.8,hi-lo+2*pad)/zoom;cy=(lo+hi)/2+panY;y0=cy-sy/2;y1=cy+sy/2;}
    }
    return { w,h,plot,bounds:{xMin:x0,xMax:x1,yMin:y0,yMax:y1}, dpr,
      worldToPixel(x,y){return {x:plot.l+(x-x0)/(x1-x0)*plot.w,y:plot.b-(y-y0)/(y1-y0)*plot.h};},
      pixelToWorld(px,py){return {x:x0+(px-plot.l)/plot.w*(x1-x0),y:y0+(plot.b-py)/plot.h*(y1-y0)};} };
  }

  function text(ctx, str, x, y, color=COLORS.muted, size=12, weight=400, align="left") {
    ctx.save();
    ctx.font=weight+" "+size+"px -apple-system, BlinkMacSystemFont, Inter, Segoe UI, sans-serif";
    ctx.textAlign=align;ctx.textBaseline="alphabetic";
    ctx.lineJoin="round";ctx.lineWidth=4;ctx.strokeStyle="rgba(255, 255, 255, 0.92)";
    if(typeof ctx.strokeText==="function")ctx.strokeText(str,x,y);
    ctx.fillStyle=color;ctx.fillText(str,x,y);
    ctx.restore();
  }

  // Minimalist Apple-Zen axes: NO background grid lines or squares, only slim axes & subtle tick marks
  function axes(ctx, v, cfg) {
    const p=v.plot,b=v.bounds;
    const dx=niceStep(b.xMax-b.xMin),dy=niceStep(b.yMax-b.yMin);
    const hasY0=b.yMin<=0&&b.yMax>=0, hasX0=b.xMin<=0&&b.xMax>=0;
    const axisY=hasY0?v.worldToPixel(0,0).y:p.b;
    const axisX=hasX0?v.worldToPixel(0,0).x:p.l;

    ctx.save();ctx.beginPath();ctx.rect(p.l,p.t,p.w,p.h);ctx.clip();
    ctx.strokeStyle=COLORS.axis;ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(p.l,axisY);ctx.lineTo(p.r,axisY);ctx.stroke();
    ctx.beginPath();ctx.moveTo(axisX,p.t);ctx.lineTo(axisX,p.b);ctx.stroke();

    // Subtle 3px tick marks on axes only (zero grid mesh)
    for(let x=Math.ceil(b.xMin/dx)*dx;x<=b.xMax+dx*.001;x+=dx){
      if(Math.abs(x)<dx*1e-8)continue;
      const q=v.worldToPixel(x,0);
      ctx.beginPath();ctx.moveTo(q.x,axisY-3);ctx.lineTo(q.x,axisY+3);ctx.stroke();
      text(ctx,fmt(x),q.x,axisY+15,COLORS.muted,11,400,"center");
    }
    for(let y=Math.ceil(b.yMin/dy)*dy;y<=b.yMax+dy*.001;y+=dy){
      if(Math.abs(y)<dy*1e-8)continue;
      const q=v.worldToPixel(0,y);
      ctx.beginPath();ctx.moveTo(axisX-3,q.y);ctx.lineTo(axisX+3,q.y);ctx.stroke();
      text(ctx,fmt(y),axisX-7,q.y+4,COLORS.muted,11,400,"right");
    }
    ctx.restore();
    text(ctx,cfg.xlabel,p.r,p.b+30,COLORS.muted,12,500,"right");
    text(ctx,cfg.ylabel,p.l,p.t-10,COLORS.muted,12,500,"left");
    text(ctx,cfg.cue,p.l+96,18,COLORS.muted,11,500,"left");
  }

  function path(ctx, v, pts, color=COLORS.curve, width=2.4, dash=[], glow=false) {
    if(!pts||pts.length<2)return;ctx.save();ctx.beginPath();ctx.rect(v.plot.l,v.plot.t,v.plot.w,v.plot.h);ctx.clip();
    ctx.beginPath();let started=false;
    for(const pt of pts){if(!pt||!finite(pt.x)||!finite(pt.y)){started=false;continue;}const q=v.worldToPixel(pt.x,pt.y);if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);}
    if(glow){ctx.shadowColor=COLORS.curveHalo;ctx.shadowBlur=10;}
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.restore();
  }
  function sampleFunction(f, v, key, holes=[]) {
    const b=v.bounds, cacheKey=key+"|"+JSON.stringify(holes.map(h=>h.x))+"|"+[b.xMin,b.xMax,b.yMin,b.yMax,v.plot.w|0].join(",");
    if(curves.has(cacheKey))return curves.get(cacheKey);
    const N=Math.max(300,Math.min(900,Math.round(v.plot.w*1.1))), result=[];let current=[];
    for(let i=0;i<=N;i++){
      const x=b.xMin+(b.xMax-b.xMin)*i/N;
      const cut=holes.some(h=>Math.abs(x-h.x)<(b.xMax-b.xMin)/N*1.2);
      let y=cut?null:f(x);
      if(!finite(y)||y<b.yMin||y>b.yMax){if(current.length>1)result.push(current);current=[];continue;}
      if(current.length){const prev=current[current.length-1];if(Math.abs(y-prev.y)>(b.yMax-b.yMin)*.4){if(current.length>1)result.push(current);current=[];}}
      current.push({x,y});
    }
    if(current.length>1)result.push(current);storeCurve(cacheKey,result);return result;
  }
  function drawCurve(ctx,v,f,key,holes=[],color=COLORS.curve){for(const segment of sampleFunction(f,v,key,holes))path(ctx,v,segment,color,2.8,[],true);}
  function dot(ctx,v,x,y,color=COLORS.cyan,r=5,open=false){if(!finite(x)||!finite(y))return;const q=v.worldToPixel(x,y);ctx.save();ctx.beginPath();ctx.rect(v.plot.l,v.plot.t,v.plot.w,v.plot.h);ctx.clip();ctx.beginPath();ctx.arc(q.x,q.y,r,0,TAU);ctx.fillStyle=open?COLORS.holeBg:color;ctx.fill();ctx.lineWidth=2.2;ctx.strokeStyle=color;ctx.stroke();ctx.restore();}
  function dashedHorizontal(ctx,v,y,label,color=COLORS.green){const a=v.worldToPixel(v.bounds.xMin,y),b=v.worldToPixel(v.bounds.xMax,y);ctx.save();ctx.beginPath();ctx.rect(v.plot.l,v.plot.t,v.plot.w,v.plot.h);ctx.clip();ctx.setLineDash([7,6]);ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.restore();if(label)text(ctx,label,v.plot.r-4,a.y-6,color,11,600,"right");}
  function dashedVertical(ctx,v,x,color=COLORS.red){const q=v.worldToPixel(x,0);ctx.save();ctx.beginPath();ctx.rect(v.plot.l,v.plot.t,v.plot.w,v.plot.h);ctx.clip();ctx.setLineDash([5,5]);ctx.strokeStyle=color;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(q.x,v.plot.t);ctx.lineTo(q.x,v.plot.b);ctx.stroke();ctx.restore();}
  function lineThrough(ctx,v,x0,y0,m,color=COLORS.cyan,width=2,dash=[]){const b=v.bounds,pts=[];for(const x of [b.xMin,b.xMax]){const y=y0+m*(x-x0);if(y>=b.yMin&&y<=b.yMax)pts.push({x,y});}for(const y of [b.yMin,b.yMax]){if(Math.abs(m)>1e-12){const x=x0+(y-y0)/m;if(x>=b.xMin&&x<=b.xMax)pts.push({x,y});}}const uniq=[];for(const p of pts)if(!uniq.some(q=>Math.abs(q.x-p.x)<1e-7&&Math.abs(q.y-p.y)<1e-7))uniq.push(p);if(uniq.length>=2)path(ctx,v,[uniq[0],uniq[1]],color,width,dash);}
  function tangentReveal(ctx,v,x0,y0,m,amount,span,color=COLORS.green){const half=Math.max(.005,span*clamp(amount,0,1));const a=Math.max(v.bounds.xMin,x0-half),b=Math.min(v.bounds.xMax,x0+half);if(b>a)path(ctx,v,[{x:a,y:y0+m*(a-x0)},{x:b,y:y0+m*(b-x0)}],color,2.8,[],true);}

  // 3Blue1Brown Rise-over-Run (dx / dy) Right Triangle on White Zen Canvas
  function drawSlopeTriangle(ctx, v, x0, y0, x1, y1) {
    if (!finite(x0) || !finite(y0) || !finite(x1) || !finite(y1) || Math.abs(x1 - x0) < 1e-6) return;
    const p0 = v.worldToPixel(x0, y0);
    const pCorner = v.worldToPixel(x1, y0);
    const p1 = v.worldToPixel(x1, y1);
    ctx.save();
    ctx.beginPath();
    ctx.rect(v.plot.l, v.plot.t, v.plot.w, v.plot.h);
    ctx.clip();
    // Soft translucent amber right-triangle interior
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(pCorner.x, pCorner.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.closePath();
    ctx.fillStyle = "rgba(217, 119, 6, 0.09)";
    ctx.fill();
    // Horizontal run dx in Emerald-Teal
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(pCorner.x, pCorner.y);
    ctx.strokeStyle = COLORS.green;
    ctx.lineWidth = 2.2;
    ctx.setLineDash([]);
    ctx.stroke();
    // Vertical rise dy in Warm Amber-Gold
    ctx.beginPath();
    ctx.moveTo(pCorner.x, pCorner.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.strokeStyle = COLORS.yellow;
    ctx.lineWidth = 2.2;
    ctx.stroke();
    if (Math.hypot(pCorner.x - p0.x, p1.y - pCorner.y) > 18) {
      text(ctx, "dx=" + fmt(x1 - x0), (p0.x + pCorner.x) / 2, pCorner.y + (p1.y < pCorner.y ? 14 : -6), COLORS.green, 11, 600, "center");
      text(ctx, "dy=" + fmt(y1 - y0), pCorner.x + (x1 >= x0 ? 6 : -6), (pCorner.y + p1.y) / 2 + 4, COLORS.yellow, 11, 600, x1 >= x0 ? "left" : "right");
    }
    ctx.restore();
  }

  // 3Blue1Brown Local Linearity Circular Magnifying Lens (8x zoom inset, zero square boxes)
  function drawZoomLens(ctx, v, f, x0, y0, m, zoomFactor = 8) {
    if (!finite(x0) || !finite(y0) || !finite(m) || v.plot.w < 200 || v.plot.h < 130) return;
    const R = Math.min(44, Math.max(28, Math.min(v.plot.w, v.plot.h) * 0.16));
    const pBase = v.worldToPixel(x0, y0);
    const placeLeft = pBase.x > (v.plot.l + v.plot.r) * 0.58;
    const cx = placeLeft ? v.plot.l + R + 14 : v.plot.r - R - 14;
    const cy = v.plot.t + R + 26;
    const wxSpan = (v.bounds.xMax - v.bounds.xMin) / zoomFactor * 0.45;
    const wySpan = (v.bounds.yMax - v.bounds.yMin) / zoomFactor * 0.45;
    if (!(wxSpan > 0) || !(wySpan > 0)) return;

    ctx.save();
    ctx.beginPath();
    ctx.rect(v.plot.l, v.plot.t, v.plot.w, v.plot.h);
    ctx.clip();

    // Delicate dashed tether from base point to circular lens
    ctx.beginPath();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = "rgba(0, 113, 227, 0.28)";
    ctx.lineWidth = 1.1;
    ctx.moveTo(pBase.x, pBase.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Circular lens body (moveTo + arc so path.length > 1, distinct from dot markers)
    ctx.beginPath();
    ctx.moveTo(cx + R, cy);
    ctx.arc(cx, cy, R, 0, TAU, false);
    ctx.fillStyle = COLORS.lensBg;
    ctx.fill();
    ctx.save();
    ctx.clip();

    // Whisper-light center crosshairs inside lens
    ctx.strokeStyle = "rgba(203, 213, 225, 0.65)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - R, cy);
    ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R);
    ctx.lineTo(cx, cy + R);
    ctx.stroke();

    // Magnified curve f(x) in Apple-Manim Blue
    if (typeof f === "function") {
      ctx.beginPath();
      let started = false;
      for (let k = -24; k <= 24; k++) {
        const wx = x0 + (k / 24) * wxSpan;
        const wy = f(wx);
        if (!finite(wy)) { started = false; continue; }
        const lx = cx + ((wx - x0) / wxSpan) * R;
        const ly = cy - ((wy - y0) / wySpan) * R;
        if (!started) { ctx.moveTo(lx, ly); started = true; }
        else ctx.lineTo(lx, ly);
      }
      ctx.strokeStyle = COLORS.curve;
      ctx.lineWidth = 2.4;
      ctx.stroke();
    }

    // Magnified tangent line in Emerald-Teal
    ctx.beginPath();
    const tx0 = -wxSpan, ty0 = m * tx0;
    const tx1 = wxSpan, ty1 = m * tx1;
    ctx.moveTo(cx + (tx0 / wxSpan) * R, cy - (ty0 / wySpan) * R);
    ctx.lineTo(cx + (tx1 / wxSpan) * R, cy - (ty1 / wySpan) * R);
    ctx.strokeStyle = COLORS.green;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // Delicate circular lens ring and caption
    ctx.beginPath();
    ctx.moveTo(cx + R, cy);
    ctx.arc(cx, cy, R, 0, TAU, false);
    ctx.strokeStyle = COLORS.lensRing;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    text(ctx, zoomFactor + "\u00d7 local linearity", cx, cy + R + 12, COLORS.muted, 10, 500, "center");
    ctx.restore();
  }

  // 3Blue1Brown Limit Squeeze / epsilon-delta Projection Corridor on White Canvas
  function drawLimitCorridor(ctx, v, xL, yL, xR, yR, xTarget, yTarget) {
    if (!finite(xTarget) || !finite(yTarget)) return;
    const pTarget = v.worldToPixel(xTarget, yTarget);
    const axisY = v.bounds.yMin <= 0 && v.bounds.yMax >= 0 ? v.worldToPixel(0, 0).y : v.plot.b;
    const axisX = v.bounds.xMin <= 0 && v.bounds.xMax >= 0 ? v.worldToPixel(0, 0).x : v.plot.l;

    ctx.save();
    ctx.beginPath();
    ctx.rect(v.plot.l, v.plot.t, v.plot.w, v.plot.h);
    ctx.clip();

    // Soft emerald epsilon horizontal band around yTarget
    const yVals = [yL, yR].filter(finite);
    const epsWorld = yVals.length ? Math.max(0.015 * (v.bounds.yMax - v.bounds.yMin), ...yVals.map(y => Math.abs(y - yTarget))) : 0.04 * (v.bounds.yMax - v.bounds.yMin);
    const pyTop = v.worldToPixel(xTarget, yTarget + epsWorld).y;
    const pyBot = v.worldToPixel(xTarget, yTarget - epsWorld).y;
    ctx.fillStyle = "rgba(5, 150, 105, 0.08)";
    ctx.fillRect(v.plot.l, Math.min(pyTop, pyBot), v.plot.w, Math.max(2, Math.abs(pyBot - pyTop)));

    // Projections from approaching points to x-axis and y-axis
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.3;
    for (const [xx, yy] of [[xL, yL], [xR, yR]]) {
      if (!finite(xx) || !finite(yy)) continue;
      const pq = v.worldToPixel(xx, yy);
      ctx.strokeStyle = COLORS.yellow;
      ctx.beginPath();
      ctx.moveTo(pq.x, pq.y);
      ctx.lineTo(pq.x, axisY);
      ctx.stroke();
      ctx.strokeStyle = COLORS.green;
      ctx.beginPath();
      ctx.moveTo(pq.x, pq.y);
      ctx.lineTo(axisX, pq.y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    text(ctx, "\u2192 x \u2192 " + fmt(xTarget) + " \u2190", pTarget.x, Math.min(v.plot.b - 4, axisY - 5), COLORS.yellow, 10, 600, "center");
    ctx.restore();
  }

  function trianglePath(ctx,v,a,b,theta,progress){
    const A={x:0,y:0},B={x:a,y:0},C={x:b*Math.cos(theta),y:b*Math.sin(theta)};
    const pA=v.worldToPixel(A.x,A.y),pB=v.worldToPixel(B.x,B.y),pC=v.worldToPixel(C.x,C.y);
    ctx.save();ctx.beginPath();ctx.rect(v.plot.l,v.plot.t,v.plot.w,v.plot.h);ctx.clip();
    // Base triangle interior fill
    ctx.beginPath();ctx.moveTo(pA.x,pA.y);ctx.lineTo(pB.x,pB.y);ctx.lineTo(pC.x,pC.y);ctx.closePath();
    ctx.fillStyle="rgba(0, 113, 227, 0.07)";ctx.fill();
    if(progress>0){
      const B0=v.worldToPixel(2,0),C0=v.worldToPixel(3*Math.cos(Math.PI/3),3*Math.sin(Math.PI/3));
      // 3B1B differential area strip dA between reference triangle and expanded triangle
      ctx.beginPath();
      ctx.moveTo(B0.x,B0.y);ctx.lineTo(pB.x,pB.y);ctx.lineTo(pC.x,pC.y);ctx.lineTo(C0.x,C0.y);ctx.closePath();
      ctx.fillStyle="rgba(217, 119, 6, 0.20)";ctx.fill();
      ctx.setLineDash([4,4]);ctx.strokeStyle=COLORS.lavender;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(pA.x,pA.y);ctx.lineTo(B0.x,B0.y);ctx.lineTo(C0.x,C0.y);ctx.closePath();ctx.stroke();
      ctx.setLineDash([]);
      text(ctx,"+dA",(pB.x+pC.x+B0.x+C0.x)/4+6,(pB.y+pC.y+B0.y+C0.y)/4,COLORS.yellow,11,600,"left");
    }
    ctx.strokeStyle=COLORS.curve;ctx.lineWidth=2.8;ctx.beginPath();ctx.moveTo(pA.x,pA.y);ctx.lineTo(pB.x,pB.y);ctx.lineTo(pC.x,pC.y);ctx.closePath();ctx.stroke();ctx.restore();
    dot(ctx,v,A.x,A.y,COLORS.cyan,3);dot(ctx,v,B.x,B.y,COLORS.cyan,3);dot(ctx,v,C.x,C.y,COLORS.cyan,3);
    text(ctx,"a = "+a.toFixed(2)+" cm",(pA.x+pB.x)/2,(pA.y+pB.y)/2+18,COLORS.green,12,600,"center");
    text(ctx,"b = "+b.toFixed(2)+" cm",(pA.x+pC.x)/2-5,(pA.y+pC.y)/2-8,COLORS.yellow,12,600,"center");
    ctx.save();ctx.strokeStyle=COLORS.orange;ctx.lineWidth=1.8;ctx.beginPath();ctx.arc(pA.x,pA.y,27,-theta,0,false);ctx.stroke();ctx.restore();
    text(ctx,"\u03b8 = "+theta.toFixed(2)+" rad",pA.x+34,pA.y-12,COLORS.orange,12,600,"left");
    if(progress>0) text(ctx,"simulated \u0394t = "+(0.12*progress).toFixed(2)+" min \u00b7 rates evaluated at t = 0",v.plot.r-4,v.plot.b-9,COLORS.muted,11,500,"right");
    else text(ctx,"specified instant: a=2, b=3, \u03b8=\u03c0/3",v.plot.r-4,v.plot.b-9,COLORS.muted,11,500,"right");
    return {A,B,C};
  }

  function implicitCurve(ctx,v){
    const key="lemniscate|"+[v.bounds.xMin,v.bounds.xMax,v.bounds.yMin,v.bounds.yMax,v.plot.w|0].join(",");
    let segs=curves.get(key);
    if(!segs){segs=[];for(const [a,b] of [[-Math.PI/4,Math.PI/4],[3*Math.PI/4,5*Math.PI/4]]){const pts=[];for(let i=0;i<=360;i++){const t=a+(b-a)*i/360,r=Math.sqrt(Math.max(0,12.5*Math.cos(2*t)));pts.push({x:r*Math.cos(t),y:r*Math.sin(t)});}segs.push(pts);}storeCurve(key,segs);}
    for(const s of segs)path(ctx,v,s,COLORS.curve,2.8,[],true);
  }

  function derivativeNumeric(f,x){const h=1e-5*Math.max(1,Math.abs(x));const a=f(x-h),b=f(x+h);return finite(a)&&finite(b)?(b-a)/(2*h):null;}

  function getMath(){return global.math || null;}
  function numericLiteral(n){
    if(!n)return null;
    if(n.isConstantNode&&typeof n.value==="number")return n.value;
    if(n.isParenthesisNode)return numericLiteral(n.content);
    if(n.isOperatorNode&&n.args.length===1&&(n.op==="-"||n.op==="+")){const v=numericLiteral(n.args[0]);return v==null?null:(n.op==="-"?-v:v);}
    if(n.isOperatorNode&&n.args.length===2&&n.op==="/"){const a=numericLiteral(n.args[0]),b=numericLiteral(n.args[1]);return a!=null&&b!=null&&b!==0?a/b:null;}
    return null;
  }
  function compileSafe(expr, variable){
    const key=variable+"|"+expr;if(compiled.has(key))return compiled.get(key);
    const math=getMath();if(!math||typeof expr!=="string"||expr.length>400){storeCompiled(key,null);return null;}
    try{
      const node=math.parse(expr);let count=0;
      const allowedFns=new Set(["sin","cos","tan","sec","csc","cot","asin","acos","atan","sqrt","abs","exp","log"]);
      function walk(n,depth){if(++count>100||depth>24)throw Error("complex expression");
        if(n.isConstantNode){if(typeof n.value!=="number"||!finite(n.value))throw Error("bad constant");return;}
        if(n.isSymbolNode){if(n.name!==variable&&n.name!=="pi"&&n.name!=="e")throw Error("unknown symbol");return;}
        if(n.isParenthesisNode){walk(n.content,depth+1);return;}
        if(n.isOperatorNode){if(!["+","-","*","/","^"].includes(n.op)||n.args.length>2)throw Error("operator blocked");if(n.op==="^"){const e=numericLiteral(n.args[1]);if(e==null||!finite(e)||Math.abs(e)>12)throw Error("power blocked");}walk(n.args[0],depth+1);if(n.args[1])walk(n.args[1],depth+1);return;}
        if(n.isFunctionNode&&n.fn&&n.fn.isSymbolNode&&allowedFns.has(n.fn.name)){if(n.args.length!==1)throw Error("arity blocked");walk(n.args[0],depth+1);return;}
        throw Error("node blocked");
      }
      walk(node,0);const c=node.compile();const f=x=>{try{const y=c.evaluate({[variable]:x});return typeof y==="number"&&finite(y)?y:null;}catch(_){return null;}};
      storeCompiled(key,f);return f;
    }catch(_){storeCompiled(key,null);return null;}
  }
  function evaluator(g){return g?compileSafe(g.expression,g.variable||"x"):null;}

  function drawGeneric(ctx,v,lesson,step,progress,view){
    const g=lesson.graph||{},f=evaluator(g);if(!f){text(ctx,"Unable to plot this expression safely",v.plot.l+12,v.plot.t+25,COLORS.red,13,500);return;}
    const holes=Array.isArray(g.holes)?g.holes.filter(h=>h&&finite(Number(h.x))).slice(0,20):[];drawCurve(ctx,v,f,"generic|"+g.expression+"|"+g.variable,holes);
    const target=Number(g.limitTarget),hasTarget=g.limitTarget!=null&&finite(target)&&Math.abs(target)<1e6;
    if(hasTarget)dashedHorizontal(ctx,v,target,"target y = "+fmt(target),COLORS.green);
    const titles=(lesson.steps||[]).map(s=>String(s.title||"").toLowerCase());
    const base=g.base==null?NaN:Number(g.base), hasBase=finite(base)&&Math.abs(base)<1e6, atY=hasBase?f(base):null;
    const holeAtBase=hasBase&&(!finite(atY)||holes.some(h=>Math.abs(Number(h.x)-base)<1e-7))&&hasTarget;
    if(hasTarget&&hasBase){
      const amount=phase(step,progress,totalSteps(lesson));
      const distance=(v.bounds.xMax-v.bounds.xMin)*(.22*(1-amount)+.003);
      const xL=base-distance,xR=base+distance,yL=f(xL),yR=f(xR);
      drawLimitCorridor(ctx,v,xL,yL,xR,yR,base,target);
      for(const [xx,yy] of [[xL,yL],[xR,yR]]){if(finite(yy))dot(ctx,v,xx,yy,COLORS.yellow,5);}
      if(holeAtBase)dot(ctx,v,base,target,COLORS.red,6,true);
      else if(finite(atY))dot(ctx,v,base,atY,COLORS.green,5);
    }
    const x=view.inspectX!=null&&finite(Number(view.inspectX))?Number(view.inspectX):null;
    const readyIndex=titles.findIndex(s=>/simplify the derivative|evaluate the slope|derivative at the base|write the tangent line|write the linearization/.test(s));
    const hasSlope=!!g.derivative||!!g.tangent;
    if(hasBase&&hasSlope&&finite(atY)){
      const span=(v.bounds.xMax-v.bounds.xMin),h=span*(.18*(1-phase(step,progress,totalSteps(lesson)))+.004);
      let x1=base+h,y1=f(x1);if(!finite(y1)){x1=base-h;y1=f(x1);}
      const df=g.derivative?compileSafe(g.derivative,g.variable||"x"):null;
      const m=df?df(base):derivativeNumeric(f,base);
      if(finite(y1)){
        const slope=(y1-atY)/(x1-base);
        drawSlopeTriangle(ctx,v,base,atY,x1,y1);
        lineThrough(ctx,v,base,atY,slope,COLORS.yellow,1.6,[6,4]);
        dot(ctx,v,x1,y1,COLORS.yellow,4);
      }
      const ready=readyIndex<0?step>=totalSteps(lesson)-1:step>=readyIndex;
      if(ready&&finite(m)){
        const start=readyIndex<0?totalSteps(lesson)-1:readyIndex;
        const amount=.35+.65*phase(step,progress,totalSteps(lesson),start,totalSteps(lesson)-1);
        tangentReveal(ctx,v,base,atY,m,amount,span*.24,COLORS.green);
        drawZoomLens(ctx,v,f,base,atY,m,8);
        if(amount>=.65)text(ctx,"tangent \u00b7 dy/dx = "+fmt(m),v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
        else text(ctx,"secant \u0394y/\u0394x \u2192 dy/dx = "+fmt(m),v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }else text(ctx,"rise/run \u0394y/\u0394x at base point",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,500);
      dot(ctx,v,base,atY,COLORS.cyan,5);
    }
    for(const hole of holes){const hx=Number(hole.x),hy=hole.y==null?f(hx):Number(hole.y);if(finite(hx)&&finite(hy))dot(ctx,v,hx,hy,COLORS.red,6,true);}
    if(x!=null){const y=f(x);if(finite(y)){dot(ctx,v,x,y,COLORS.yellow,5);const m=derivativeNumeric(f,x);if(g.tangent&&finite(m))lineThrough(ctx,v,x,y,m,COLORS.green,2);text(ctx,"(x, f(x)) = ("+fmt(x)+", "+fmt(y)+")",v.plot.l+9,v.plot.t+38,COLORS.ink,12,500);}}
  }

  function draw(canvas,lesson,stepIndex,progress,view={}){
    if(!canvas||!lesson)return null;const ctx=canvas.getContext("2d");if(!ctx)return null;
    const cfg=configFor(lesson,view);if(!cfg)return null;const v=viewport(ctx,canvas,cfg,view);
    ctx.save();ctx.fillStyle=COLORS.bg;ctx.fillRect(0,0,v.w,v.h);axes(ctx,v,cfg);
    const i=Math.max(0,Math.min(totalSteps(lesson)-1,stepIndex|0)),t=lessonTitle(lesson,i),p=clamp(Number(progress)||0,0,1),n=totalSteps(lesson),frac=phase(i,p,n);
    const spanX=v.bounds.xMax-v.bounds.xMin;
    if(cfg.kind==="generic"){drawGeneric(ctx,v,lesson,i,p,view);}
    else if(cfg.kind==="limit1"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"q1",[{x:0,y:1/6}]);
      dashedHorizontal(ctx,v,1/6,"y = 1/6",COLORS.green);
      const d=2.8*(1-frac)+.018;
      const yL=fn(cfg.kind,-d),yR=fn(cfg.kind,d);
      drawLimitCorridor(ctx,v,-d,yL,d,yR,0,1/6);
      for(const [xx,yy] of [[-d,yL],[d,yR]])dot(ctx,v,xx,yy,COLORS.yellow,5);
      dot(ctx,v,0,1/6,COLORS.red,6,true);
      text(ctx,"(0, 1/6) is a hole \u00b7 limit = 1/6",v.plot.l+8,v.plot.t+20,COLORS.ink,12,600);
    } else if(cfg.kind==="limit2"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"q2",[{x:0,y:1},{x:-1,y:null}]);
      dashedVertical(ctx,v,-1,COLORS.red);
      dashedHorizontal(ctx,v,1,"y = 1",COLORS.green);
      const d=.72*(1-frac)+.014;
      const yL=1/(1-d),yR=1/(1+d);
      drawLimitCorridor(ctx,v,-d,yL,d,yR,0,1);
      for(const [xx,yy] of [[-d,yL],[d,yR]])dot(ctx,v,xx,yy,COLORS.yellow,5);
      dot(ctx,v,0,1,COLORS.red,6,true);
      text(ctx,"hole at (0, 1) \u00b7 pole at \u22121",v.plot.l+8,v.plot.t+20,COLORS.ink,12,600);
    } else if(cfg.kind==="power4"){
      drawCurve(ctx,v,x=>x**4,"x4");
      const h=.72*(1-frac)+.015,end=1+h,y=end**4,slope=(y-1)/h;
      drawSlopeTriangle(ctx,v,1,1,end,y);
      lineThrough(ctx,v,1,1,slope,COLORS.yellow,1.6,[6,5]);dot(ctx,v,end,y,COLORS.yellow,4);
      dot(ctx,v,1,1,COLORS.cyan,5);
      drawZoomLens(ctx,v,x=>x**4,1,1,4,8);
      if(i>=8||/take the limit|final result/.test(t)){
        const amount=.35+.65*phase(i,p,n,8,n-1);
        tangentReveal(ctx,v,1,1,4,amount,spanX*.22,COLORS.green);
        text(ctx,"tangent at (1, 1) \u00b7 dy/dx = 4",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"\u0394y/\u0394x = "+slope.toFixed(2)+" \u2192 dy/dx = 4",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }
    } else if(cfg.kind==="product"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"prod");
      const xm=1+1.25*(1-frac)+.02,ym=fn(cfg.kind,xm);
      if(finite(ym)){
        drawSlopeTriangle(ctx,v,1,3,xm,ym);
        lineThrough(ctx,v,1,3,(ym-3)/(xm-1),COLORS.yellow,1.5,[5,4]);
        dot(ctx,v,xm,ym,COLORS.yellow,4);
      }
      dot(ctx,v,1,3,COLORS.cyan,5);
      drawZoomLens(ctx,v,x=>fn(cfg.kind,x),1,3,3.5,8);
      if(i>=8||/combine like terms|final result/.test(t)){
        const amount=.35+.65*phase(i,p,n,8,n-1);
        tangentReveal(ctx,v,1,3,3.5,amount,spanX*.24,COLORS.green);
        text(ctx,"tangent at (1, 3) \u00b7 slope = 3.5",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"base point (1, 3) \u00b7 \u0394y/\u0394x \u2192 3.5",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }
    } else if(cfg.kind==="quotient"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"quotient");
      dashedVertical(ctx,v,1,COLORS.red);
      const xm=-2.2*(1-frac)-.04,ym=fn(cfg.kind,xm);
      if(finite(ym)){
        drawSlopeTriangle(ctx,v,0,4,xm,ym);
        lineThrough(ctx,v,0,4,(ym-4)/xm,COLORS.yellow,1.5,[5,4]);
        dot(ctx,v,xm,ym,COLORS.yellow,4);
      }
      dot(ctx,v,0,4,COLORS.cyan,5);
      drawZoomLens(ctx,v,x=>fn(cfg.kind,x),0,4,8,8);
      if(i>=8||/collect numerator|keep denominator|factor and conclude/.test(t)){
        const amount=.35+.65*phase(i,p,n,8,n-1);
        tangentReveal(ctx,v,0,4,8,amount,spanX*.16,COLORS.green);
        text(ctx,"tangent at (0, 4) \u00b7 slope = 8",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"pole at u = 1 \u00b7 base point (0, 4)",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }
    } else if(cfg.kind==="chain"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"chain");
      const target=.6,fy=fn(cfg.kind,target),m=target/(Math.sqrt(1+target*target)*Math.cos(Math.sqrt(1+target*target))**2);
      const x=-.35+(target+.35)*frac-.02*(1-frac),y=fn(cfg.kind,x);
      if(finite(y)&&Math.abs(x-target)>1e-4){
        drawSlopeTriangle(ctx,v,target,fy,x,y);
        lineThrough(ctx,v,target,fy,(y-fy)/(x-target),COLORS.yellow,1.5,[5,4]);
        dot(ctx,v,x,y,COLORS.yellow,4);
      }
      dot(ctx,v,target,fy,COLORS.cyan,5);
      drawZoomLens(ctx,v,x=>fn(cfg.kind,x),target,fy,m,8);
      if(i>=6||/simplify the constants|final derivative/.test(t)){
        const amount=.35+.65*phase(i,p,n,6,n-1);
        tangentReveal(ctx,v,target,fy,m,amount,spanX*.2,COLORS.green);
        text(ctx,"tangent at 0.6 \u00b7 slope \u2248 "+m.toFixed(2),v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"chain layers \u00b7 approaching t = 0.6",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }
    } else if(cfg.kind==="implicit"){
      implicitCurve(ctx,v);
      const theta0=Math.atan2(1,3),theta1=theta0+0.28*(1-frac)+0.008;
      const r1=Math.sqrt(Math.max(0,12.5*Math.cos(2*theta1))),x1=r1*Math.cos(theta1),y1=r1*Math.sin(theta1);
      drawSlopeTriangle(ctx,v,3,1,x1,y1);
      dot(ctx,v,x1,y1,COLORS.yellow,4);
      dot(ctx,v,3,1,COLORS.cyan,5);
      // Upper branch near (3,1) for local zoom lens
      const localBranch=x=>{const s=12.5-x*x;return s<=0?null:Math.sqrt(Math.max(0,Math.sqrt(156.25-50*x*x)-x*x-12.5));};
      drawZoomLens(ctx,v,localBranch,3,1,-9/13,8);
      if(i>=7||/solve for the slope|evaluate the slope|point-slope|tangent line/.test(t)){
        const amount=.35+.65*phase(i,p,n,7,n-1);
        tangentReveal(ctx,v,3,1,-9/13,amount,spanX*.24,COLORS.green);
        text(ctx,"tangent at (3, 1) \u00b7 slope = \u22129/13",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"point (3, 1) on 2(x\u00b2+y\u00b2)\u00b2 = 25(x\u00b2\u2212y\u00b2)",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }
    } else if(cfg.kind==="triangle"){
      let da=0,db=0,sim=0,hdr="Specified instant: a = 2, b = 3, \u03b8 = \u03c0/3";
      if(t.startsWith("part a")||(i>=3&&i<=5)){
        da=0;db=0;sim=.25+.75*phase(i,p,n,3,5);
        hdr="Part (a): da/dt=0, db/dt=0, d\u03b8/dt=0.2 \u00b7 dA/dt = 0.3 cm\u00b2/min";
      } else if(t.startsWith("part b")||(i>=6&&i<=9)){
        da=0;db=1.5;sim=.25+.75*phase(i,p,n,6,9);
        hdr="Part (b): da/dt=0, db/dt=1.5, d\u03b8/dt=0.2 \u00b7 dA/dt = 3\u221a3/4 + 0.3 \u2248 1.60 cm\u00b2/min";
      } else if(t.startsWith("part c")||i>=10){
        da=2.5;db=1.5;sim=.25+.75*phase(i,p,n,10,n-1);
        hdr="Part (c): da/dt=2.5, db/dt=1.5, d\u03b8/dt=0.2 \u00b7 dA/dt = 21\u221a3/8 + 0.3 \u2248 4.85 cm\u00b2/min";
      }
      const dt=.12*sim,a=2+da*dt,b=3+db*dt,theta=Math.PI/3+.2*dt;
      trianglePath(ctx,v,a,b,theta,sim);
      text(ctx,hdr,v.plot.l+8,v.plot.t+20,COLORS.ink,12,600);
    } else if(cfg.kind==="linear"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"linear");
      const xProbe=3+.55*(1-frac)+.04,yProbe=fn(cfg.kind,xProbe);
      if(finite(yProbe))drawSlopeTriangle(ctx,v,3,1,xProbe,yProbe);
      dot(ctx,v,3,1,COLORS.cyan,5);
      drawZoomLens(ctx,v,x=>fn(cfg.kind,x),3,1,-.75,8);
      if(i>=5||/evaluate the slope|linearization|substitute the values|simplify/.test(t)){
        const amount=.35+.65*phase(i,p,n,5,n-1);
        tangentReveal(ctx,v,3,1,-.75,amount,spanX*.26,COLORS.green);
        const x=3+.32*Math.sin(p*TAU);dot(ctx,v,x,fn(cfg.kind,x),COLORS.yellow,4);
        text(ctx,"L(x) = 1 \u2212 (3/4)(x \u2212 3) at (3, 1) \u00b7 slope = \u22123/4",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"base point (3, 1) on f(x) = 2/\u221a(x\u00b2\u22125)",v.plot.l+8,v.plot.t+20,COLORS.yellow,12,600);
      }
    } else if(cfg.kind==="extrema"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"extrema");
      const xTrace=(Math.PI/2)*frac,yTrace=fn(cfg.kind,xTrace),mTrace=-2*Math.sin(xTrace)+2*Math.cos(2*xTrace);
      tangentReveal(ctx,v,xTrace,yTrace,mTrace,0.65,spanX*.12,Math.abs(mTrace)<0.25?COLORS.green:COLORS.yellow);
      dot(ctx,v,xTrace,yTrace,COLORS.yellow,4);
      if(i>=4){
        const yMax=3*Math.sqrt(3)/2;
        dashedHorizontal(ctx,v,yMax,"max 3\u221a3/2 \u2248 2.60",COLORS.green);
        tangentReveal(ctx,v,Math.PI/6,yMax,0,1,spanX*.16,COLORS.green);
        dot(ctx,v,Math.PI/6,yMax,COLORS.cyan,5);
      }
      if(i>=6){
        dashedHorizontal(ctx,v,2,"f(0) = 2",COLORS.lavender);
        dot(ctx,v,0,2,COLORS.lavender,5);
      }
      if(i>=7){
        dashedHorizontal(ctx,v,0,"min f(\u03c0/2) = 0",COLORS.red);
        dot(ctx,v,Math.PI/2,0,COLORS.red,5);
      }
      if(i>=7||/compare every candidate|state the maximum|state the minimum/.test(t)){
        text(ctx,"max 3\u221a3/2 at \u03c0/6 \u00b7 min 0 at \u03c0/2",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
      } else {
        text(ctx,"closed interval [0, \u03c0/2] \u00b7 f(\u03c0/6) = 3\u221a3/2",v.plot.l+8,v.plot.t+20,COLORS.ink,12,600);
      }
    } else if(cfg.kind==="infty1"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"infty1");
      dashedHorizontal(ctx,v,0,"y = 0",COLORS.green);
      const x=.18+9.3*frac,y=fn(cfg.kind,x);
      drawLimitCorridor(ctx,v,x,y,null,null,9.8,0);
      dot(ctx,v,x,y,COLORS.yellow,5);
      text(ctx,"t \u2192 \u221e \u00b7 y = "+fmt(y||0)+" \u2192 0",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
    } else if(cfg.kind==="infty2"){
      drawCurve(ctx,v,x=>fn(cfg.kind,x),"infty2");
      dashedHorizontal(ctx,v,1,"y = 1",COLORS.green);
      const x=.18+9.2*frac,y=fn(cfg.kind,x);
      drawLimitCorridor(ctx,v,x,y,null,null,9.8,1);
      dot(ctx,v,x,y,COLORS.yellow,5);
      if(i>=1||/reciprocal|substitute|fundamental|state the result/.test(t))text(ctx,"u = 1/x \u2192 0\u207a \u00b7 x sin(1/x) \u2192 1",v.plot.l+8,v.plot.t+20,COLORS.green,12,600);
    }
    if(view.inspectX!=null&&cfg.kind!=="triangle"&&cfg.kind!=="implicit"&&cfg.kind!=="generic"){
      const xx=Number(view.inspectX),yy=fn(cfg.kind,xx);if(finite(yy)){dot(ctx,v,xx,yy,COLORS.yellow,5);text(ctx,"("+fmt(xx)+", "+fmt(yy)+")",v.plot.l+8,v.plot.t+38,COLORS.ink,12,500);}
    }
    ctx.restore();
    return {bounds:v.bounds,pixelToWorld:v.pixelToWorld,worldToPixel:v.worldToPixel};
  }

  global.CalculusGraphs={draw};
})(window);
