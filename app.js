(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const els = {
    sidebar:$('lessonSidebar'), menu:$('menuToggle'), list:$('lessonList'), count:$('lessonCount'), search:$('lessonSearch'), sidebarFoot:$('sidebarFoot'),
    mainColumn:$('mainColumn'), modeSwitcher:$('modeSwitcher'), homeworkMode:$('homeworkModeButton'), homeworkModeLabel:$('homeworkModeLabel'), conceptDemos:$('conceptDemosButton'), conceptDemosLabel:$('conceptDemosLabel'), examEssentials:$('examEssentialsButton'), examEssentialsLabel:$('examEssentialsLabel'),
    conceptDemoStrip:$('conceptDemoStrip'), essentialsView:$('examEssentialsView'), essentialsGrid:$('essentialsGrid'), essentialsFilterBar:$('essentialsFilterBar'), closeEssentials:$('closeEssentialsButton'),
    title:$('lessonTitle'), meta:$('lessonMeta'), promptDetails:$('promptDetails'), problem:$('problemText'), source:$('sourceNote'), givenFunctionCard:$('givenFunctionCard'), givenFunctionLabel:$('givenFunctionLabel'), givenFunctionMath:$('givenFunctionMath'), problemConceptNote:$('problemConceptNote'), operation:$('operationLabel'), equation:$('equationLine'), equationView:$('equationViewport'),
    stepTitle:$('stepTitle'), why:$('stepWhy'), stepCount:$('stepCount'), clock:$('stepClock'), dots:$('stepDots'), narration:$('narrationText'), speech:$('speechToggle'),
    playStepAudioButton:$('playStepAudioButton'), playStepAudioLabel:$('playStepAudioLabel'),
    voiceButton:$('voiceButton'), voiceIcon:$('voiceIcon'), voiceLabel:$('voiceLabel'),
    graphDrawer:$('graphDrawer'), graphToggle:$('graphToggleButton'), graphToggleLabel:$('graphToggleLabel'),
    back:$('backButton'), next:$('nextButton'), play:$('playButton'), playIcon:$('playIcon'), playLabel:$('playLabel'), replay:$('replayButton'), timeline:$('timelineSlider'), timelineLabel:$('timelineStepLabel'), percent:$('timelinePercent'), speed:$('speedSelect'),
    canvas:$('graphCanvas'), inspect:$('inspectSlider'), inspectValue:$('inspectValue'), clearInspect:$('clearInspect'), zoomIn:$('zoomIn'), zoomOut:$('zoomOut'), resetGraph:$('resetGraph'),
    newProblem:$('newProblemButton'), dialog:$('problemDialog'), mode:$('problemMode'), expression:$('problemExpression'), variable:$('problemVariable'), at:$('problemAt'), atLabel:$('atLabel'), generate:$('generateProblem'), formError:$('formError'), importButton:$('importButton'), importFile:$('importFile'), exportButton:$('exportButton'), live:$('liveAnnouncement'),
  };
  const STORE='calculus-animation-lab-v1';
  const TTS_ENDPOINT='http://127.0.0.1:8765/api/tts';
  const PLAY_SVG='<svg class="zen-icon" viewBox="0 0 20 20" fill="none"><path d="M7.25 5.25L14.75 10l-7.5 4.75V5.25Z" fill="currentColor"/></svg>';
  const PAUSE_SVG='<svg class="zen-icon" viewBox="0 0 20 20" fill="none"><rect x="6.25" y="5.25" width="2.5" height="9.5" rx="1.2" fill="currentColor"/><rect x="11.25" y="5.25" width="2.5" height="9.5" rx="1.2" fill="currentColor"/></svg>';
  const VOICE_ON_SVG='<svg class="zen-icon" viewBox="0 0 20 20" fill="none"><path d="M4.5 8.25v3.5M7.75 5.75v8.5M11 7.25v5.5M14.25 4.75v10.5M17.25 8.25v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  const VOICE_OFF_SVG='<svg class="zen-icon" viewBox="0 0 20 20" fill="none"><path d="M4.5 8.25v3.5M7.75 5.75v8.5M11 7.25v5.5M14.25 4.75v10.5M17.25 8.25v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".32"/><path d="M4 16L16 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

  const DEFAULT_DEFINITIONS = [
    {
      term: 'Limit of a Function (§1.2–1.3)',
      tex: '\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L',
      meaning: 'The two-sided limit exists if and only if both one-sided limits exist and are equal. The value f(a) itself does not need to equal L.'
    },
    {
      term: 'Continuity at a Point (§1.8)',
      tex: '\\lim_{x\\to a} f(x) = f(a)',
      meaning: 'Requires three conditions: (1) f(a) is defined, (2) the two-sided limit as x → a exists, and (3) the limit equals f(a).'
    },
    {
      term: 'Intermediate Value Theorem (§1.8)',
      tex: 'f \\text{ continuous on } [a,b],\\; N \\text{ between } f(a),f(b) \\implies \\exists c\\in(a,b): f(c)=N',
      meaning: 'A continuous function on a closed interval takes on every intermediate value between its endpoint values. Used to prove a root exists when f(a) and f(b) have opposite signs.'
    },
    {
      term: 'Limit Definition of the Derivative (§2.1–2.2)',
      tex: 'f\'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h} = \\lim_{t\\to x}\\frac{f(t)-f(x)}{t-x}',
      meaning: 'Instantaneous rate of change and slope of the tangent line. Differentiability at x = a implies continuity at x = a, but continuity does not imply differentiability.'
    },
    {
      term: 'Product, Quotient & Chain Rules (§2.3, §2.5)',
      tex: '(uv)\'=u\'v+uv\',\\quad \\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2},\\quad \\frac{d}{dx}[f(g(x))]=f\'(g(x))\\cdot g\'(x)',
      meaning: 'Core differentiation rules for products, ratios, and composite functions. Always differentiate from the outer shell inward and multiply by the derivative of the inside.'
    },
    {
      term: 'Linearization & Differential (§2.9)',
      tex: 'L(x) = f(a) + f\'(a)(x-a),\\qquad dy = f\'(x)\\,dx',
      meaning: 'Uses the tangent line at x = a to approximate f(x) for x near a.'
    },
    {
      term: 'Mean Value Theorem (§3.2)',
      tex: 'f \\text{ cont. on } [a,b],\\text{ diff. on } (a,b) \\implies \\exists c\\in(a,b): f\'(c)=\\frac{f(b)-f(a)}{b-a}',
      meaning: 'Guarantees at least one point c inside (a,b) where the instantaneous tangent slope equals the average secant slope across the interval.'
    },
    {
      term: 'Critical Numbers, Extrema & Inflection Points (§3.1, §3.3)',
      tex: 'f\'(c)=0 \\text{ or DNE};\\quad f\'\'>0 \\text{ (concave up)},\\; f\'\'<0 \\text{ (concave down)}',
      meaning: 'Closed-interval absolute extrema occur at critical numbers in (a,b) or endpoints {a,b}. An inflection point occurs where concavity actually changes sign.'
    }
  ];

  const state={
    lessons:[],originalIds:new Set(),cramIds:new Set(),customIds:new Set(),
    lessonIndex:0,stepIndex:0,progress:0,playing:false,stepAnimating:false,transitioning:false,
    speed:1,frame:0,lastFrame:0,stepDuration:7,zoom:1,panX:0,panY:0,inspectX:null,bounds:null,
    renderToken:0,speechEnabled:true,sidebarClosed:true,viewOpen:true,
    activeMode:'homework',essentialsOpen:false,essentialsChapter:'all',showAllSteps:false,
    graphVisible:false,drag:null,graphWarned:false,isMobile:window.innerWidth<=760
  };
  const neuralAudio=new Audio();
  neuralAudio.preload='auto';
  neuralAudio.playsInline=true;
  try{neuralAudio.setAttribute('playsinline','')}catch{}
  let activeAudioKey='';
  let activeAudioStage='none';
  let pendingAutoplay=false;
  let stepAudioPlaying=false;
  function isLocalDevEnv(){
    const h=String(window.location?.hostname||'');
    const p=String(window.location?.protocol||'');
    return h==='localhost'||h==='127.0.0.1'||p==='file:';
  }
  function syncStepAudioButton(playing){
    stepAudioPlaying=!!playing;
    if(els.playStepAudioButton){
      els.playStepAudioButton.classList.toggle('is-playing',stepAudioPlaying);
      els.playStepAudioButton.setAttribute('aria-pressed',String(stepAudioPlaying));
    }
    if(els.playStepAudioLabel){
      els.playStepAudioLabel.textContent=stepAudioPlaying?'\u23f8 Stop Step Audio':'\ud83d\udd0a Play Step Audio';
    }
  }
  neuralAudio.addEventListener('play',()=>syncStepAudioButton(true));
  neuralAudio.addEventListener('pause',()=>syncStepAudioButton(false));
  neuralAudio.addEventListener('ended',()=>syncStepAudioButton(false));

  function safeStorageGet(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch{return {}}}
  function stripTexColor(input){
    let s=String(input||'');
    let guard=0;
    while(guard++<60){
      const idx=s.indexOf('\\color{');
      if(idx===-1)break;
      let i=idx+7,depth=1;
      while(i<s.length&&depth>0){
        if(s[i]==='{')depth++;
        else if(s[i]==='}')depth--;
        i++;
      }
      let j=i;
      while(j<s.length&&/\s/.test(s[j]))j++;
      if(j<s.length&&s[j]==='{'){
        let k=j+1,d2=1;
        while(k<s.length&&d2>0){
          if(s[k]==='{')d2++;
          else if(s[k]==='}')d2--;
          k++;
        }
        const inner=s.slice(j+1,k-1);
        s=s.slice(0,idx)+inner+s.slice(k);
      }else{
        s=s.slice(0,idx)+s.slice(i);
      }
    }
    return s;
  }

  function validLesson(lesson){
    if(!lesson||typeof lesson!=='object'||typeof lesson.id!=='string'||!lesson.id||lesson.id.length>100||typeof lesson.title!=='string'||!Array.isArray(lesson.steps)||lesson.steps.length<1||lesson.steps.length>50)throw new Error('This JSON is not a supported lesson. It needs an id, title, and 1\u201350 steps.');
    if(typeof lesson.homework!=='string'||typeof lesson.section!=='string'||typeof lesson.exercise!=='string'||typeof lesson.problem!=='string')throw new Error('Lesson metadata is incomplete. Include homework, section, exercise, and problem.');
    for(const [i,s] of lesson.steps.entries()){
      if(!s||typeof s.title!=='string'||typeof s.why!=='string'||typeof s.narration!=='string'||!Array.isArray(s.parts)||s.parts.length<1||s.parts.length>12)throw new Error(`Step ${i+1} needs a title, explanation, narration, and 1\u201312 equation parts.`);
      if(s.title.length>180||s.why.length>1500||s.narration.length>2500)throw new Error(`Step ${i+1} has text that is too long.`);
      for(const p of s.parts){if(!p||typeof p.id!=='string'||typeof p.tex!=='string'||p.tex.length>2000||!['white','cyan','red',undefined].includes(p.color))throw new Error(`Step ${i+1} has an invalid math fragment.`)}
    }
    if(lesson.graph!==undefined){const g=lesson.graph;if(!g||g.kind!=='function'||typeof g.expression!=='string'||typeof g.variable!=='string'||g.expression.length>300||g.variable.length>8)throw new Error('The graph needs a supported function expression and variable.');}
    return lesson;
  }

  function getOriginalLessons(){
    const hw=Array.isArray(window.CALCULUS_LESSONS)?window.CALCULUS_LESSONS:[];
    const cram=Array.isArray(window.EXAM_CONCEPT_LESSONS)?window.EXAM_CONCEPT_LESSONS:[];
    state.cramIds=new Set(cram.filter(x=>x&&typeof x.id==='string').map(x=>x.id));
    return [...hw,...cram].filter(x=>{try{validLesson(x);return true}catch(e){console.warn('Skipping invalid built-in lesson:',e.message);return false}});
  }
  function isCramLesson(lesson){
    return !!lesson&&(state.cramIds.has(lesson.id)||lesson.id.startsWith('cram-')||String(lesson.homework||'').toUpperCase().includes('CRAM'));
  }
  function updateModeCounts(){
    const hwCount=state.lessons.filter(l=>!isCramLesson(l)&&!isCustom(l)).length;
    const cramCount=state.lessons.filter(l=>isCramLesson(l)).length;
    const compact=window.innerWidth<=760;
    if(els.homeworkModeLabel)els.homeworkModeLabel.textContent=`Homework (${hwCount})`;
    if(els.conceptDemosLabel)els.conceptDemosLabel.textContent=compact?`Examples (${cramCount})`:`Concept Examples (${cramCount})`;
    if(els.examEssentialsLabel)els.examEssentialsLabel.textContent=compact?'\u26a1 Must-Knows':'\u26a1 Tomorrow\'s Must-Knows';
    if(els.sidebarFoot)els.sidebarFoot.textContent=`${hwCount} homework exercises + ${cramCount} concept examples`;
  }
  function loadLessons(){
    const originals=getOriginalLessons();state.originalIds=new Set(originals.map(x=>x.id));
    const saved=safeStorageGet();let customs=[];
    if(Array.isArray(saved.customLessons))for(const lesson of saved.customLessons){try{validLesson(lesson);if(!state.originalIds.has(lesson.id))customs.push(lesson)}catch(e){console.warn('Skipping saved lesson:',e.message)}}
    state.customIds=new Set(customs.map(x=>x.id));state.lessons=[...originals,...customs];
    const id=saved.lessonId;const index=state.lessons.findIndex(x=>x.id===id);state.lessonIndex=index>=0?index:0;
    state.stepIndex=Math.max(0,Math.min(Number(saved.stepIndex)||0,(state.lessons[state.lessonIndex]?.steps.length||1)-1));
    state.activeMode=isCramLesson(state.lessons[state.lessonIndex])?'concepts':'homework';
    try{const savedVoice=localStorage.getItem(STORE+'.neuralVoice');state.speechEnabled=savedVoice!=='false'}catch{state.speechEnabled=true}
    updateModeCounts();
    syncVoiceControls();
    syncGraphVisibility();
    syncModeControls();
  }
  function syncVoiceControls(){
    if(els.speech)els.speech.checked=state.speechEnabled;
    if(els.voiceButton)els.voiceButton.setAttribute('aria-pressed',String(state.speechEnabled));
    if(els.voiceIcon)els.voiceIcon.innerHTML=state.speechEnabled?VOICE_ON_SVG:VOICE_OFF_SVG;
    if(els.voiceLabel)els.voiceLabel.textContent=state.speechEnabled?'Voice':'Muted';
  }
  function syncGraphVisibility(){
    if(els.graphDrawer)els.graphDrawer.hidden=!state.graphVisible;
    if(els.graphToggle){
      els.graphToggle.setAttribute('aria-pressed',String(state.graphVisible));
    }
    if(els.graphToggleLabel){
      els.graphToggleLabel.textContent=state.graphVisible?'Hide graph':'Show graph';
    }
    if(state.graphVisible){
      requestAnimationFrame(()=>{syncCanvasSize();drawGraph()});
    }
  }
  function toggleGraph(force){
    state.graphVisible=force===undefined?!state.graphVisible:!!force;
    syncGraphVisibility();
  }
  function stopSpeech(){
    pendingAutoplay=false;
    try{neuralAudio.pause()}catch{}
    if('speechSynthesis'in window)window.speechSynthesis.cancel();
    syncStepAudioButton(false);
  }
  function setVoiceEnabled(enabled){
    state.speechEnabled=!!enabled;
    syncVoiceControls();
    try{localStorage.setItem(STORE+'.neuralVoice',String(state.speechEnabled));localStorage.setItem(STORE+'.speech',String(state.speechEnabled))}catch{}
    if(state.speechEnabled)speakCurrent({resumeOffset:state.progress*state.stepDuration});
    else stopSpeech();
  }
  function currentLesson(){return state.lessons[state.lessonIndex]||null}
  function currentStep(){return currentLesson()?.steps[state.stepIndex]||null}
  function isCustom(lesson){return !!lesson&&state.customIds.has(lesson.id)}
  function persistPosition(){const l=currentLesson();if(l){try{const x=safeStorageGet();x.lessonId=l.id;x.stepIndex=state.stepIndex;localStorage.setItem(STORE,JSON.stringify(x))}catch{}}}

  function renderLessonList(){
    const query=els.search.value.trim().toLowerCase(),frag=document.createDocumentFragment();let shown=0;
    state.lessons.forEach((lesson,index)=>{
      const hay=[lesson.homework,lesson.section,lesson.exercise,lesson.title,lesson.problem].join(' ').toLowerCase();if(query&&!hay.includes(query))return;
      const cram=isCramLesson(lesson);
      const button=document.createElement('button');button.type='button';
      button.className='lesson-item'+(isCustom(lesson)?' custom':'')+(cram?' cram-item':'');
      button.setAttribute('aria-current',index===state.lessonIndex?'true':'false');button.dataset.index=String(index);
      const meta=document.createElement('span');meta.className='lesson-item-meta';
      meta.textContent=cram?`${lesson.homework} \u00b7 \u00a7${lesson.section} \u00b7 ${lesson.exercise}`:`${lesson.homework} \u00b7 \u00a7${lesson.section} \u00b7 #${lesson.exercise}`;
      const title=document.createElement('span');title.className='lesson-item-title';title.textContent=lesson.title;
      button.append(meta,title);button.addEventListener('click',()=>{setEssentialsView(false);selectLesson(index,true)});frag.append(button);shown++;
    });
    els.list.replaceChildren(frag);els.count.textContent=`${state.lessons.length} lesson${state.lessons.length===1?'':'s'}`;
    if(!shown){const empty=document.createElement('p');empty.className='empty-search';empty.textContent='No matching lessons.';els.list.append(empty)}
    updateModeCounts();
    renderConceptDemoStrip();
  }
  function renderConceptDemoStrip(){
    if(!els.conceptDemoStrip)return;
    const cramEntries=state.lessons.map((lesson,index)=>({lesson,index})).filter(x=>isCramLesson(x.lesson));
    if(!cramEntries.length||state.activeMode!=='concepts'||state.essentialsOpen){
      els.conceptDemoStrip.hidden=true;
      return;
    }
    els.conceptDemoStrip.hidden=false;
    const frag=document.createDocumentFragment();
    cramEntries.forEach(({lesson,index},i)=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='concept-strip-pill'+(index===state.lessonIndex?' is-active':'');
      btn.textContent=`Ex ${i+1} \u00b7 \u00a7${lesson.section}`;
      btn.title=lesson.title;
      btn.addEventListener('click',()=>selectLesson(index,true));
      frag.append(btn);
    });
    els.conceptDemoStrip.replaceChildren(frag);
  }
  function syncModeControls(){
    const mode=state.essentialsOpen?'essentials':state.activeMode;
    if(els.homeworkMode){
      const active=mode==='homework';
      els.homeworkMode.classList.toggle('is-active',active);
      els.homeworkMode.setAttribute('aria-pressed',String(active));
    }
    if(els.conceptDemos){
      const active=mode==='concepts';
      els.conceptDemos.classList.toggle('is-active',active);
      els.conceptDemos.setAttribute('aria-pressed',String(active));
    }
    if(els.examEssentials){
      const active=mode==='essentials';
      els.examEssentials.classList.toggle('is-active',active);
      els.examEssentials.setAttribute('aria-pressed',String(active));
    }
    if(els.mainColumn)els.mainColumn.hidden=!!state.essentialsOpen;
    if(els.essentialsView)els.essentialsView.hidden=!state.essentialsOpen;
    renderConceptDemoStrip();
  }
  function setEssentialsView(open){
    const next=!!open;
    if(state.essentialsOpen===next){
      syncModeControls();
      return;
    }
    state.essentialsOpen=next;
    if(next){
      pause();
      toggleSidebar(false);
      renderExamEssentials(state.essentialsChapter);
      window.scrollTo({top:0,behavior:'smooth'});
    }else{
      syncModeControls();
      if(state.graphVisible)requestAnimationFrame(()=>drawGraph());
    }
    syncModeControls();
  }
  function switchMode(mode){
    if(mode==='essentials'){
      setEssentialsView(!state.essentialsOpen);
      return;
    }
    setEssentialsView(false);
    if(mode==='concepts'){
      state.activeMode='concepts';
      const current=currentLesson();
      if(!isCramLesson(current)){
        const firstCram=state.lessons.findIndex(isCramLesson);
        if(firstCram>=0)selectLesson(firstCram,true);
      }
      syncModeControls();
      return;
    }
    state.activeMode='homework';
    const current=currentLesson();
    if(isCramLesson(current)){
      const firstHw=state.lessons.findIndex(l=>!isCramLesson(l));
      if(firstHw>=0)selectLesson(firstHw,true);
    }
    syncModeControls();
  }
  function updateHeader(){
    const l=currentLesson();
    if(!l){
      els.title.textContent='Calculus Animation Lab';
      els.meta.textContent='NO LESSONS LOADED';
      els.problem.textContent='The local lesson file is not ready. Reload when lessons.js is available.';
      els.source.textContent='';
      if(els.givenFunctionMath)els.givenFunctionMath.replaceChildren();
      if(els.problemConceptNote)els.problemConceptNote.textContent='';
      return;
    }
    const prefix=isCramLesson(l)?`${l.homework}  \u00b7  SECTION ${l.section}  \u00b7  ${l.exercise.toUpperCase()}`:`${l.homework}  \u00b7  SECTION ${l.section}  \u00b7  EXERCISE ${l.exercise}${l.textbook_page?`  \u00b7  P. ${l.textbook_page}`:''}`;
    els.meta.textContent=prefix;
    els.title.textContent=l.title;
    els.problem.replaceChildren();
    renderMixedTextWithMath(els.problem,l.problem);
    els.source.textContent=l.source_note||'';
    if(els.givenFunctionLabel){
      els.givenFunctionLabel.textContent=isCramLesson(l)
        ?`GIVEN CONCEPT EXAMPLE \u00b7 \u00a7${l.section}`
        :`GIVEN FUNCTION / STARTING EXPRESSION \u00b7 ${l.homework} #${l.exercise}`;
    }
    if(els.givenFunctionMath&&Array.isArray(l.steps?.[0]?.parts)){
      els.givenFunctionMath.replaceChildren();
      for(const part of l.steps[0].parts){
        const span=document.createElement('span');
        span.className='given-function-part';
        mathRender(span,part.tex);
        els.givenFunctionMath.append(span);
      }
    }
    if(els.problemConceptNote){
      els.problemConceptNote.replaceChildren();
      renderMixedTextWithMath(els.problemConceptNote,getCoreConceptSummary(l));
    }
    els.exportButton.disabled=!isCustom(l);
  }
  function mathRender(container,tex){
    const rawTex=String(tex||'');
    if(window.katex){
      try{
        window.katex.render(rawTex,container,{throwOnError:true,trust:true,strict:'ignore',output:'htmlAndMathml',maxExpand:1000});
        return true;
      }catch{
        const cleanTex=stripTexColor(rawTex);
        try{
          window.katex.render(cleanTex,container,{throwOnError:true,trust:true,strict:'ignore',output:'htmlAndMathml',maxExpand:1000});
          return true;
        }catch(err){
          container.textContent=cleanTex;
          container.classList.add('equation-error');
          container.title=`Math preview: ${err.message}`;
          return false;
        }
      }
    }
    container.textContent=stripTexColor(rawTex);
    return false;
  }
  function normText(str){
    return String(str||'').replace(/\s+/g,' ').trim().toLowerCase();
  }
  function getCoreConceptSummary(lesson){
    if(lesson.definition)return lesson.definition;
    if(lesson.concept_note)return lesson.concept_note;
    const sec=String(lesson.section||'');
    if(sec.startsWith('1.6'))return 'Core Method (§1.6 Limit Laws): Eliminate 0/0 indeterminate forms algebraically (conjugate multiplication, common denominator, factoring, or sin(u)/u -> 1) before direct substitution, or bound oscillating factors via the Squeeze Theorem.';
    if(sec.startsWith('1.8'))return 'Core Method (§1.8 Continuity & IVT): Verify left limit, right limit, and function value agree for continuity; on a closed continuous interval [a,b] with opposite endpoint signs, apply the Intermediate Value Theorem.';
    if(sec.startsWith('2.1')||sec.startsWith('2.2'))return 'Core Definition (§2.1–2.2 Derivative from First Principles): Evaluate f\'(x) = lim_{h->0} [f(x+h) - f(x)]/h by expanding, canceling every h in the numerator against the denominator h, and taking the limit.';
    if(sec.startsWith('2.3'))return 'Core Rule (§2.3 Product & Quotient Rules): For a product, (uv)\' = u\'v + uv\'; for a quotient, (u/v)\' = (u\'v - uv\') / v^2.';
    if(sec.startsWith('2.4'))return 'Core Rule (§2.4 Trigonometric Derivatives): Apply d/dx[sin x] = cos x, d/dx[cos x] = -sin x, d/dx[tan x] = sec^2 x, and set f\'(x) = 0 to locate horizontal tangents.';
    if(sec.startsWith('2.5'))return 'Core Rule (§2.5 Chain Rule): Differentiate the outer function evaluated at the unchanged inner expression, then multiply by the derivative of the inner expression: d/dx[f(g(x))] = f\'(g(x)) * g\'(x).';
    if(sec.startsWith('2.6'))return 'Core Method (§2.6 Implicit Differentiation): Differentiate both sides with respect to x, multiplying by dy/dx (y\') whenever differentiating a y-term by the Chain Rule, then isolate dy/dx.';
    if(sec.startsWith('2.8'))return 'Core Method (§2.8 Related Rates): Write the geometric equation relating the variables, differentiate implicitly with respect to time t BEFORE plugging in instantaneous numerical values, and solve for the unknown rate.';
    if(sec.startsWith('2.9'))return 'Core Definition (§2.9 Linearization): Approximate f(x) near x = a using the tangent line L(x) = f(a) + f\'(a)(x - a).';
    if(sec.startsWith('3.1'))return 'Core Method (§3.1 Closed Interval Method): Find all critical numbers c in (a,b) where f\'(c) = 0 or f\'(c) DNE, then compare f(c) with endpoint values f(a) and f(b).';
    if(sec.startsWith('3.2'))return 'Core Theorem (§3.2 Rolle\'s & Mean Value Theorem): Verify f is continuous on [a,b] and differentiable on (a,b), then solve f\'(c) = [f(b) - f(a)] / (b - a).';
    if(sec.startsWith('3.3'))return 'Core Test (§3.3 First & Second Derivative Tests): Use the sign of f\'(x) for increasing/decreasing intervals and local extrema, and the sign of f\'\'(x) for concavity and inflection points.';
    if(sec.startsWith('3.4'))return 'Core Method (§3.4 Limits at Infinity & Horizontal Asymptotes): Divide numerator and denominator by the highest power of x in the denominator, remembering sqrt(x^2) = |x| = -x when x -> -infinity.';
    return 'Full Textbook Derivation: Follow each algebraic and calculus step from top to bottom exactly as written on a homework or exam solution sheet.';
  }

  function renderEquation(step,animateMorph=true){
    const lesson=currentLesson();
    if(!lesson||!els.equationView)return;
    const activeIdx=state.stepIndex;
    const currStep=lesson.steps[activeIdx]||step;
    const prevStep=activeIdx>0?lesson.steps[activeIdx-1]:null;
    const contextStep=activeIdx>1?lesson.steps[activeIdx-2]:null;

    // 1. Capture previous bounding rects of active and previous equation parts for 60fps FLIP morphing
    const prevRectById=new Map();
    const prevRectByTex=new Map();
    if(animateMorph){
      const existingParts=els.equationView.querySelectorAll('.derivation-line.is-current .equation-part, #equationLine .equation-part');
      existingParts.forEach((el)=>{
        const r=el.getBoundingClientRect();
        if(r.width>0&&r.height>0){
          if(el.dataset.partId)prevRectById.set(el.dataset.partId,r);
          if(el.dataset.tex&&!prevRectByTex.has(el.dataset.tex))prevRectByTex.set(el.dataset.tex,r);
        }
      });
    }

    // 2. Diff prevStep vs currStep to highlight source changes (Amber-Gold) and result changes (Cerulean Blue / Coral)
    const prevById=new Map((prevStep?.parts||[]).map(p=>[p.id,p]));
    const currById=new Map((currStep?.parts||[]).map(p=>[p.id,p]));
    const prevTexSet=new Set((prevStep?.parts||[]).map(p=>String(p.tex||'').trim()));
    const currTexSet=new Set((currStep?.parts||[]).map(p=>String(p.tex||'').trim()));

    const sourceChangedIds=new Set();
    if(prevStep){
      for(const p of prevStep.parts){
        const nextP=currById.get(p.id);
        if(!nextP||String(nextP.tex||'').trim()!==String(p.tex||'').trim()||!currTexSet.has(String(p.tex||'').trim())){
          sourceChangedIds.add(p.id);
        }
      }
      if(!sourceChangedIds.size){
        for(const p of prevStep.parts){
          if(p.color==='cyan'||p.color==='red')sourceChangedIds.add(p.id);
        }
      }
    }

    const resultChangedIds=new Set();
    if(activeIdx>0&&currStep){
      for(const p of currStep.parts){
        const oldP=prevById.get(p.id);
        if(!oldP||String(oldP.tex||'').trim()!==String(p.tex||'').trim()||!prevTexSet.has(String(p.tex||'').trim())||p.color==='cyan'){
          resultChangedIds.add(p.id);
        }
      }
    }

    let failed=false;

    // 3. Build the Animated 2-to-3 Line Morphing Derivation Stage (.derivation-stage)
    const stage=document.createElement('div');
    stage.className='derivation-stage';

    // Line A: Context Line (index - 2)
    if(contextStep){
      const ctxRow=document.createElement('div');
      ctxRow.className='derivation-line is-context';
      ctxRow.title=`Click to jump back to Step ${activeIdx-1}`;
      const badge=document.createElement('span');
      badge.className='derivation-step-badge';
      badge.textContent=`STEP ${activeIdx-1}`;
      const mathWrap=document.createElement('div');
      mathWrap.className='derivation-math-wrap';
      for(const p of contextStep.parts){
        const span=document.createElement('span');
        span.className='equation-part color-white';
        if(!mathRender(span,p.tex))failed=true;
        mathWrap.append(span);
      }
      ctxRow.append(badge,mathWrap);
      ctxRow.addEventListener('click',()=>setStep(activeIdx-2,{manual:true}));
      stage.append(ctxRow);
    }

    // Line B: Previous Step Line (FROM · STEP index) + Animated Operation Connector Bridge
    if(prevStep){
      const prevRow=document.createElement('div');
      prevRow.className='derivation-line is-prev';
      prevRow.title=`Click to return to Step ${activeIdx}`;
      const badge=document.createElement('span');
      badge.className='derivation-step-badge is-from';
      badge.textContent=`FROM \u00b7 STEP ${activeIdx}`;
      const mathWrap=document.createElement('div');
      mathWrap.className='derivation-math-wrap';
      for(const p of prevStep.parts){
        const span=document.createElement('span');
        const isSource=sourceChangedIds.has(p.id);
        span.className='equation-part '+(isSource?'is-source-change':'color-white');
        span.dataset.partId=p.id;
        span.dataset.tex=p.tex;
        if(!mathRender(span,p.tex))failed=true;
        mathWrap.append(span);
      }
      prevRow.append(badge,mathWrap);
      prevRow.addEventListener('click',()=>setStep(activeIdx-1,{manual:true}));
      stage.append(prevRow);

      // Animated Operation Connector Bridge (.derivation-bridge)
      const bridge=document.createElement('div');
      bridge.className='derivation-bridge';
      const arrowWrap=document.createElement('div');
      arrowWrap.className='bridge-arrow-wrap';
      arrowWrap.innerHTML='<span class="bridge-arrow" aria-hidden="true">\u2193</span>';
      const bridgeBody=document.createElement('div');
      bridgeBody.className='bridge-body';
      const bridgeTitle=document.createElement('div');
      bridgeTitle.className='bridge-title';
      bridgeTitle.textContent=`Step ${activeIdx+1} Operation: ${currStep.title}`;
      const bridgeWhy=document.createElement('div');
      bridgeWhy.className='bridge-why';
      renderMixedTextWithMath(bridgeWhy,currStep.why);
      bridgeBody.append(bridgeTitle,bridgeWhy);
      bridge.append(arrowWrap,bridgeBody);
      stage.append(bridge);
    }

    // Line C: Active Morphing Equation Line (NOW · STEP index + 1)
    const currRow=document.createElement('div');
    currRow.className='derivation-line is-current';
    const currBadge=document.createElement('span');
    currBadge.className='derivation-step-badge is-now';
    currBadge.textContent=activeIdx===0?`START \u00b7 STEP 1 OF ${lesson.steps.length}`:`NOW \u00b7 STEP ${activeIdx+1} OF ${lesson.steps.length}`;

    const activeLine=els.equation||document.createElement('div');
    activeLine.id='equationLine';
    activeLine.className='equation-line';
    activeLine.replaceChildren();

    const newPartEls=[];
    for(const part of (currStep?.parts||[])){
      const span=document.createElement('span');
      const isResult=resultChangedIds.has(part.id);
      const colorClass=part.color==='red'?'color-red':(part.color==='cyan'||isResult?'color-cyan':'color-white');
      span.className=`equation-part ${colorClass}`+(isResult?' is-result-change is-focused':'');
      span.dataset.partId=part.id;
      span.dataset.tex=part.tex;
      span.dataset.color=part.color||'white';
      if(!mathRender(span,part.tex))failed=true;
      activeLine.append(span);
      newPartEls.push({span,part,isResult});
    }
    currRow.append(currBadge,activeLine);
    stage.append(currRow);

    // 4. Progressive "Solution Steps Built So Far" Trail Below the Animated Stage (.textbook-solution-sheet)
    const sheet=document.createElement('div');
    sheet.className='textbook-solution-sheet';

    const trailHeader=document.createElement('div');
    trailHeader.className='solution-problem-header';
    const topMeta=document.createElement('div');
    topMeta.className='problem-header-top';
    const badge=document.createElement('span');
    badge.className='problem-header-badge';
    const visibleCount=state.showAllSteps?lesson.steps.length:(activeIdx+1);
    badge.textContent=`SOLUTION STEPS BUILT SO FAR \u00b7 SHOWING ${visibleCount} OF ${lesson.steps.length} STEPS`;

    const toggleAllBtn=document.createElement('button');
    toggleAllBtn.type='button';
    toggleAllBtn.className='quiet-button trail-toggle-button';
    toggleAllBtn.textContent=state.showAllSteps?`Show up to current step (${activeIdx+1})`:`Show all ${lesson.steps.length} steps`;
    toggleAllBtn.addEventListener('click',()=>{
      state.showAllSteps=!state.showAllSteps;
      renderEquation(currentStep(),false);
    });
    topMeta.append(badge,toggleAllBtn);
    trailHeader.append(topMeta);
    sheet.append(trailHeader);

    const list=document.createElement('div');
    list.className='solution-steps-list';

    lesson.steps.forEach((s,i)=>{
      if(!state.showAllSteps&&i>activeIdx)return;
      const row=document.createElement('div');
      const isActive=(i===activeIdx);
      const isBuilt=(i<=activeIdx);
      row.className='solution-step-row'+(isBuilt?' is-built':' is-upcoming')+(isActive?' is-active is-newly-built':'');
      row.dataset.stepIndex=String(i);
      row.setAttribute('role','button');
      row.setAttribute('tabindex','0');
      row.setAttribute('aria-current',isActive?'step':'false');

      const numCol=document.createElement('div');
      numCol.className='step-num-col';
      const numLabel=document.createElement('span');
      numLabel.textContent=`Step ${i+1}`;
      numCol.append(numLabel);
      if(i>0){
        const cont=document.createElement('span');
        cont.className='step-cont-symbol';
        cont.setAttribute('aria-hidden','true');
        const firstTex=String(s.parts?.[0]?.tex||'').trim();
        cont.textContent=(firstTex.startsWith('=')||firstTex.startsWith('\\implies')||firstTex.startsWith('\\Longrightarrow'))?'':'\u21d2';
        numCol.append(cont);
      }

      const mathCol=document.createElement('div');
      mathCol.className='step-math-col';
      const lineContainer=document.createElement('div');
      lineContainer.className='step-math-line';
      for(const part of s.parts){
        const span=document.createElement('span');
        const pColor=part.color==='red'?'color-red':(part.color==='cyan'?'color-cyan':'color-white');
        span.className=`equation-part ${pColor}`;
        span.dataset.partId=part.id;
        span.dataset.tex=part.tex;
        if(!mathRender(span,part.tex))failed=true;
        lineContainer.append(span);
      }
      mathCol.append(lineContainer);

      const explainCol=document.createElement('div');
      explainCol.className='step-explain-col';
      const titleEl=document.createElement('h3');
      titleEl.className='step-explain-title';
      titleEl.textContent=s.title;
      const whyEl=document.createElement('p');
      whyEl.className='step-explain-why';
      renderMixedTextWithMath(whyEl,s.why);
      explainCol.append(titleEl,whyEl);

      row.append(numCol,mathCol,explainCol);
      row.addEventListener('click',()=>{
        if(state.stepIndex!==i)setStep(i,{manual:true});
        else speakCurrent({resumeOffset:0});
      });
      row.addEventListener('keydown',(e)=>{
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();
          setStep(i,{manual:true});
        }
      });
      list.append(row);
    });

    sheet.append(list);
    els.equationView.replaceChildren(stage,sheet);

    // 5. Execute 60fps FLIP Term-Morphing Animations on #equationLine parts
    const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(animateMorph&&!reduceMotion){
      requestAnimationFrame(()=>{
        for(const {span,part,isResult} of newPartEls){
          if(typeof span.animate!=='function')continue;
          const newRect=span.getBoundingClientRect();
          if(!(newRect.width>0&&newRect.height>0))continue;
          const oldRect=prevRectById.get(part.id)||prevRectByTex.get(part.tex);
          if(oldRect){
            const dx=oldRect.left-newRect.left;
            const dy=oldRect.top-newRect.top;
            const sx=Math.max(0.72,Math.min(1.35,oldRect.width/Math.max(1,newRect.width)));
            const sy=Math.max(0.72,Math.min(1.35,oldRect.height/Math.max(1,newRect.height)));
            if(Math.abs(dx)>0.5||Math.abs(dy)>0.5||isResult){
              span.animate(
                isResult
                  ?[
                      {transform:`translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(2)}, ${sy.toFixed(2)})`,opacity:0.35,filter:'brightness(1.15)'},
                      {transform:'translate(0px, -3px) scale(1.04, 1.04)',opacity:1,offset:0.72},
                      {transform:'translate(0px, 0px) scale(1, 1)',opacity:1,filter:'brightness(1)'}
                    ]
                  :[
                      {transform:`translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`},
                      {transform:'translate(0px, 0px)'}
                    ],
                {duration:isResult?580:500,easing:'cubic-bezier(0.22, 1, 0.36, 1)',fill:'both'}
              );
            }
          }else if(activeIdx>0){
            span.animate(
              [
                {transform:'translateY(-16px) scale(0.86)',opacity:0},
                {transform:'translateY(2px) scale(1.03)',opacity:1,offset:0.75},
                {transform:'translateY(0px) scale(1)',opacity:1}
              ],
              {duration:540,easing:'cubic-bezier(0.22, 1, 0.36, 1)',fill:'both'}
            );
          }
        }
        const bridgeEl=stage.querySelector('.derivation-bridge');
        if(bridgeEl&&typeof bridgeEl.animate==='function'){
          bridgeEl.animate(
            [
              {transform:'translateY(-8px)',opacity:0},
              {transform:'translateY(0px)',opacity:1}
            ],
            {duration:420,easing:'cubic-bezier(0.22, 1, 0.36, 1)',fill:'both'}
          );
        }
      });
    }

    if(failed)els.live.textContent='Some equation notation could not be previewed. The source text remains visible.';
  }

  function fitEquation(){
    // Equations in the textbook solution sheet wrap naturally or scroll horizontally per math cell.
  }

  function renderMixedTextWithMath(container,text){
    const raw=stripTexColor(String(text||''));
    const mathPattern=/(\\lim_\{[^}]+\}(?:\\frac\{[^}]+\}\{[^}]+\}(?:=0)?)?(?:\\sin\(1\/x\)=0)?|-1\\le\\sin x\\le 1|\\sqrt\{x\^2\}=x|\\sin\(u\)\/u|[uxh]\s*\\to\s*(?:-\\infty|0)|-\\infty)/g;
    let lastIdx=0,match;
    while((match=mathPattern.exec(raw))!==null){
      if(match.index>lastIdx){
        container.append(document.createTextNode(raw.slice(lastIdx,match.index)));
      }
      const mathSpan=document.createElement('span');
      mathSpan.className='inline-katex';
      mathRender(mathSpan,match[0]);
      container.append(mathSpan);
      lastIdx=mathPattern.lastIndex;
    }
    if(lastIdx<raw.length){
      container.append(document.createTextNode(raw.slice(lastIdx)));
    }
  }

  function openLessonById(lessonId){
    if(!lessonId)return;
    let idx=state.lessons.findIndex(l=>l.id===lessonId);
    if(idx<0)idx=state.lessons.findIndex(l=>l.id.startsWith(lessonId)||lessonId.startsWith(l.id));
    setEssentialsView(false);
    if(idx>=0){
      const lesson=state.lessons[idx];
      state.activeMode=isCramLesson(lesson)?'concepts':'homework';
      state.lessonIndex=idx;
      state.zoom=1;state.panX=0;state.panY=0;state.inspectX=null;
      els.inspect.value='0';els.inspectValue.textContent='\u2014';
      updateHeader();
      syncModeControls();
      setStep(0,{manual:true,announce:true});
    }
  }

  function renderExamEssentials(chapterFilter='all'){
    if(!els.essentialsGrid)return;
    state.essentialsChapter=chapterFilter||'all';
    if(els.essentialsFilterBar){
      for(const btn of els.essentialsFilterBar.querySelectorAll('.filter-pill')){
        const active=btn.dataset.chapter===state.essentialsChapter;
        btn.classList.toggle('is-active',active);
        btn.setAttribute('aria-selected',String(active));
      }
    }
    const data=window.EXAM_ESSENTIALS_DATA;
    const definitions=Array.isArray(data?.definitions)&&data.definitions.length?data.definitions:DEFAULT_DEFINITIONS;
    const sections=Array.isArray(data?.sections)?data.sections:(Array.isArray(data)?[{id:'all',title:'Core Exam Concepts',subtitle:'',cards:data}]:[]);
    const frag=document.createDocumentFragment();

    // 1. Core Definitions & Master Rules Reference Table (shown when viewing All Chapters)
    if(state.essentialsChapter==='all'&&definitions.length){
      const defBlock=document.createElement('div');
      defBlock.className='essentials-definitions-block';
      const defHead=document.createElement('div');
      defHead.className='essentials-section-header';
      const h2=document.createElement('h2');
      h2.textContent='Core Definitions, Theorems & Master Derivative / Limit Rules';
      const sub=document.createElement('p');
      sub.textContent='Formal definitions and foundational formulas you must state and apply on the exam.';
      defHead.append(h2,sub);

      const table=document.createElement('div');
      table.className='definitions-table';
      for(const def of definitions){
        const row=document.createElement('div');
        row.className='definition-row';
        const term=document.createElement('div');
        term.className='definition-term';
        term.textContent=def.term||'Definition';
        const tex=document.createElement('div');
        tex.className='definition-tex';
        mathRender(tex,def.tex||'');
        const meaning=document.createElement('div');
        meaning.className='definition-meaning';
        renderMixedTextWithMath(meaning,def.meaning||'');
        row.append(term,tex,meaning);
        table.append(row);
      }
      defBlock.append(defHead,table);
      frag.append(defBlock);
    }

    // 2. Chapter Concept Sections & Worked Cards
    sections.forEach((sec)=>{
      const secId=String(sec.id||sec.title||'').toLowerCase();
      const secKey=secId.includes('ch1')||secId.includes('chapter 1')?'ch1':(secId.includes('ch2')||secId.includes('chapter 2')?'ch2':(secId.includes('ch3')||secId.includes('chapter 3')?'ch3':'all'));
      if(state.essentialsChapter!=='all'&&secKey!==state.essentialsChapter)return;
      const block=document.createElement('div');
      block.className='essentials-section-block';
      if(sec.title){
        const head=document.createElement('div');
        head.className='essentials-section-header';
        const h2=document.createElement('h2');
        h2.textContent=sec.title;
        head.append(h2);
        if(sec.subtitle){
          const p=document.createElement('p');
          p.textContent=sec.subtitle;
          head.append(p);
        }
        block.append(head);
      }
      const grid=document.createElement('div');
      grid.className='essentials-cards-grid';
      for(const card of (sec.cards||[])){
        const article=document.createElement('article');
        article.className='essential-card';

        const top=document.createElement('div');
        top.className='essential-card-top';
        const tag=document.createElement('span');
        tag.className='essential-tag';
        tag.textContent=card.tag||card.section||'CORE RULE';
        const title=document.createElement('h3');
        title.className='essential-title';
        title.textContent=card.title||'Core Concept';
        top.append(tag,title);
        article.append(top);

        if(card.definition){
          const defEl=document.createElement('div');
          defEl.className='essential-definition';
          const strong=document.createElement('strong');
          strong.textContent='Formal Definition / Theorem';
          defEl.append(strong);
          renderMixedTextWithMath(defEl,card.definition);
          article.append(defEl);
        }

        const pair=document.createElement('div');
        pair.className='essential-math-pair essentials-transform essentials-math-box';
        const row1=document.createElement('div');
        row1.className='math-pair-row';
        const p1=document.createElement('span');
        p1.className='math-pair-pill trigger';
        p1.textContent='FORM / PROBLEM';
        const tex1=document.createElement('div');
        tex1.className='math-pair-tex';
        mathRender(tex1,card.beforeTex||card.fromTex||'');
        row1.append(p1,tex1);

        const divRow=document.createElement('div');
        divRow.className='math-pair-divider';
        const arrowSpan=document.createElement('span');
        mathRender(arrowSpan,'\\longrightarrow');
        const divText=document.createElement('span');
        divText.textContent='applies rule / transforms into';
        divRow.append(arrowSpan,divText);

        const row2=document.createElement('div');
        row2.className='math-pair-row';
        const p2=document.createElement('span');
        p2.className='math-pair-pill result';
        p2.textContent='RULE / SOLUTION';
        const tex2=document.createElement('div');
        tex2.className='math-pair-tex';
        mathRender(tex2,card.afterTex||card.toTex||'');
        row2.append(p2,tex2);
        pair.append(row1,divRow,row2);
        article.append(pair);

        const callouts=document.createElement('div');
        callouts.className='essential-callouts';
        if(card.whatChanges){
          const wc=document.createElement('div');
          wc.className='essential-callout what-changes';
          const lbl=document.createElement('span');
          lbl.className='essential-callout-label';
          lbl.textContent='Explanation & Mathematical Justification';
          wc.append(lbl);
          renderMixedTextWithMath(wc,card.whatChanges);
          callouts.append(wc);
        }

        if(Array.isArray(card.workedExample)&&card.workedExample.length){
          const exBox=document.createElement('div');
          exBox.className='essential-worked-example';
          const exHead=document.createElement('div');
          exHead.className='worked-example-head';
          exHead.textContent='Worked Textbook Example';
          exBox.append(exHead);
          for(const exStep of card.workedExample){
            const exRow=document.createElement('div');
            exRow.className='worked-example-row';
            const exTex=document.createElement('div');
            exTex.className='worked-example-tex';
            mathRender(exTex,exStep.tex||'');
            const exNote=document.createElement('div');
            exNote.className='worked-example-note';
            renderMixedTextWithMath(exNote,exStep.note||'');
            exRow.append(exTex,exNote);
            exBox.append(exRow);
          }
          callouts.append(exBox);
        }

        if(card.examTrap){
          const trap=document.createElement('div');
          trap.className='essential-callout exam-trap';
          const lbl=document.createElement('span');
          lbl.className='essential-callout-label';
          lbl.textContent='Important Note / Exam Check';
          trap.append(lbl);
          renderMixedTextWithMath(trap,card.examTrap);
          callouts.append(trap);
        }
        article.append(callouts);

        const actions=document.createElement('div');
        actions.className='essential-card-actions';
        const watchBtn=document.createElement('button');
        watchBtn.type='button';
        watchBtn.className='watch-animation-button';
        watchBtn.textContent='Open Full Worked Solution \u2192';
        watchBtn.addEventListener('click',()=>openLessonById(card.lessonId));
        actions.append(watchBtn);
        article.append(actions);

        grid.append(article);
      }
      block.append(grid);
      frag.append(block);
    });
    els.essentialsGrid.replaceChildren(frag);
  }

  function stepDuration(step){const speechWords=(step.narration||'').trim().split(/\s+/).filter(Boolean).length;return Math.max(5.5,Number(step.hold)||0,Math.min(18,speechWords/2.3))}
  function formatClock(seconds){const n=Math.max(0,Math.floor(seconds));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`}
  function renderDots(){const l=currentLesson();els.dots.replaceChildren();if(!l)return;const frag=document.createDocumentFragment();l.steps.forEach((step,i)=>{const b=document.createElement('button');b.type='button';b.className='step-dot';b.title=`Step ${i+1}: ${step.title}`;b.setAttribute('aria-label',`Go to step ${i+1}: ${step.title}`);if(i===state.stepIndex)b.setAttribute('aria-current','step');b.addEventListener('click',()=>goToStep(i,true));frag.append(b)});els.dots.append(frag)}
  function fallbackBrowserSpeech(text,force=false){
    if((!state.speechEnabled&&!force)||!('speechSynthesis'in window)||!text)return;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.rate=Math.max(.75,Math.min(1.5,state.speed));
    const voices=window.speechSynthesis.getVoices();
    const preferred=voices.find(v=>/^en([-_]|$)/i.test(v.lang)&&/natural|online|neural|andrew|aria|guy|jenny/i.test(v.name))||voices.find(v=>/^en([-_]|$)/i.test(v.lang));
    if(preferred)utterance.voice=preferred;
    utterance.onstart=()=>syncStepAudioButton(true);
    utterance.onend=()=>syncStepAudioButton(false);
    utterance.onerror=()=>syncStepAudioButton(false);
    window.speechSynthesis.speak(utterance);
  }
  function applyAudioDuration(){
    if(Number.isFinite(neuralAudio.duration)&&neuralAudio.duration>0){
      state.stepDuration=Math.max(4.5,neuralAudio.duration+0.65);
      updateTimeline();
    }
  }
  function playNeuralAudio(offsetSeconds=0,force=false){
    if(!state.speechEnabled&&!force)return;
    neuralAudio.playbackRate=Math.max(0.5,Math.min(2,state.speed));
    if(Number.isFinite(neuralAudio.duration)&&neuralAudio.duration>0){
      if(offsetSeconds>=neuralAudio.duration-0.05&&!force)return;
      try{if(force||Math.abs(neuralAudio.currentTime-offsetSeconds)>0.2)neuralAudio.currentTime=Math.max(0,offsetSeconds)}catch{}
    }
    const p=neuralAudio.play();
    if(p&&typeof p.catch==='function'){
      p.then(()=>{pendingAutoplay=false;syncStepAudioButton(true)}).catch(()=>{
        if(force){
          const step=currentStep();
          if(step)fallbackBrowserSpeech(step.narration,true);
        }else{
          pendingAutoplay=true;
          syncStepAudioButton(false);
        }
      });
    }
  }
  neuralAudio.addEventListener('loadedmetadata',()=>{
    applyAudioDuration();
    if(state.speechEnabled){
      const offset=state.progress*state.stepDuration;
      if(offset>0.1&&Number.isFinite(neuralAudio.duration)&&offset<neuralAudio.duration){
        try{neuralAudio.currentTime=offset}catch{}
      }
    }
  });
  neuralAudio.addEventListener('error',()=>{
    const lesson=currentLesson(),step=currentStep();
    if(!lesson||!step)return;
    if(activeAudioStage==='local'&&isLocalDevEnv()){
      activeAudioStage='server';
      neuralAudio.src=`${TTS_ENDPOINT}?text=${encodeURIComponent(step.narration)}`;
      neuralAudio.playbackRate=Math.max(0.5,Math.min(2,state.speed));
      if(state.speechEnabled)playNeuralAudio(state.progress*state.stepDuration);
    }else{
      activeAudioStage='fallback';
      if(state.speechEnabled)fallbackBrowserSpeech(step.narration);
    }
  });
  function speakCurrent({resumeOffset=0,force=false}={}){
    const lesson=currentLesson(),step=currentStep();
    if(!lesson||!step)return;
    if('speechSynthesis'in window)window.speechSynthesis.cancel();
    const key=`${lesson.id}::${state.stepIndex}`;
    const isBuiltIn=state.originalIds.has(lesson.id)&&!isCustom(lesson);
    if(!isBuiltIn&&!isLocalDevEnv()){
      activeAudioKey=key;
      activeAudioStage='fallback';
      if(state.speechEnabled||force)fallbackBrowserSpeech(step.narration,force);
      return;
    }
    const targetSrc=isBuiltIn?`audio/${lesson.id}/step_${String(state.stepIndex+1).padStart(2,'0')}.mp3`:`${TTS_ENDPOINT}?text=${encodeURIComponent(step.narration)}`;
    if(activeAudioKey!==key||activeAudioStage==='fallback'){
      activeAudioKey=key;
      activeAudioStage=isBuiltIn?'local':'server';
      neuralAudio.src=targetSrc;
      neuralAudio.playbackRate=Math.max(0.5,Math.min(2,state.speed));
      if(state.speechEnabled||force)playNeuralAudio(resumeOffset,force);
    }else{
      applyAudioDuration();
      if(state.speechEnabled||force)playNeuralAudio(resumeOffset,force);
    }
  }
  function toggleStepAudioNow(){
    const speechBusy=('speechSynthesis'in window)&&window.speechSynthesis.speaking;
    if((!neuralAudio.paused&&!neuralAudio.ended)||speechBusy||stepAudioPlaying){
      stopSpeech();
      return;
    }
    try{neuralAudio.currentTime=0}catch{}
    speakCurrent({resumeOffset:0,force:true});
  }
  async function setStep(index,{manual=false,announce=true}={}){
    const lesson=currentLesson();if(!lesson)return;index=Math.max(0,Math.min(index,lesson.steps.length-1));if(manual)pause();
    stopSpeech();const token=++state.renderToken;
    const changedStep=index!==state.stepIndex;
    state.stepIndex=index;state.progress=0;state.stepDuration=stepDuration(lesson.steps[index]);
    const step=currentStep();
    els.operation.textContent=`STEP ${index+1} OF ${lesson.steps.length} \u00b7 ${step.title.toUpperCase()}`;
    renderEquation(step,changedStep);
    els.stepTitle.textContent=step.title;els.why.textContent=step.why;els.narration.textContent=step.narration;
    els.equationView.classList.remove('is-changing');
    els.stepCount.textContent=`STEP ${String(index+1).padStart(2,'0')} / ${String(lesson.steps.length).padStart(2,'0')}`;
    els.timelineLabel.textContent=`Step ${index+1} / ${lesson.steps.length}`;
    updateTimeline();
    renderDots();renderLessonList();persistPosition();
    if(state.graphVisible)drawGraph();
    if(announce)els.live.textContent=`Step ${index+1} of ${lesson.steps.length}: ${step.title}. ${step.why}`;
    speakCurrent({resumeOffset:0});
    startStepSweep();
    if(token!==state.renderToken)return;
  }
  function selectLesson(index,manual=false){
    const picked=state.lessons[index];
    if(picked)state.activeMode=isCramLesson(picked)?'concepts':'homework';
    state.showAllSteps=false;
    setEssentialsView(false);
    if(index===state.lessonIndex){if(manual)toggleSidebar(false);syncModeControls();return}
    state.lessonIndex=index;state.stepIndex=0;state.progress=0;state.zoom=1;state.panX=0;state.panY=0;state.inspectX=null;els.inspect.value='0';els.inspectValue.textContent='\u2014';updateHeader();syncModeControls();setStep(0,{manual:true});toggleSidebar(false);
  }
  function startStepSweep(){
    state.stepAnimating=true;state.lastFrame=0;
    if(!state.frame)state.frame=requestAnimationFrame(tick);
  }
  function pause(){state.playing=false;state.stepAnimating=false;state.transitioning=false;state.lastFrame=0;if(state.frame)cancelAnimationFrame(state.frame);state.frame=0;stopSpeech();els.play.setAttribute('aria-pressed','false');els.play.setAttribute('aria-label','Play steps');els.playIcon.innerHTML=PLAY_SVG;els.playLabel.textContent='Play'}
  function play(){const l=currentLesson();if(!l)return;if(!state.playing){if(state.progress>=0.999)state.progress=0;state.playing=true;state.stepAnimating=true;state.transitioning=false;state.lastFrame=0;els.play.setAttribute('aria-pressed','true');els.play.setAttribute('aria-label','Pause steps');els.playIcon.innerHTML=PAUSE_SVG;els.playLabel.textContent='Pause';if(state.speechEnabled)speakCurrent({resumeOffset:state.progress*state.stepDuration});if(!state.frame)state.frame=requestAnimationFrame(tick)}}
  function tick(now){
    if((!state.playing&&!state.stepAnimating)||state.transitioning){state.frame=0;return;}
    if(!state.lastFrame)state.lastFrame=now;
    const dt=(now-state.lastFrame)/1000;state.lastFrame=now;
    state.progress=Math.min(1,state.progress+dt*state.speed/state.stepDuration);
    updateTimeline();
    if(state.graphVisible)drawGraph();
    if(state.progress>=1){
      if(state.playing){
        const l=currentLesson();
        if(state.stepIndex<l.steps.length-1){
          state.transitioning=true;state.frame=0;
          setStep(state.stepIndex+1,{manual:false}).then(()=>{state.transitioning=false;if(state.playing&&!state.frame){state.lastFrame=0;state.frame=requestAnimationFrame(tick)}});
          return;
        }else{
          pause();state.progress=1;updateTimeline();if(state.graphVisible)drawGraph();return;
        }
      }else{
        state.stepAnimating=false;state.frame=0;state.lastFrame=0;state.progress=1;updateTimeline();if(state.graphVisible)drawGraph();return;
      }
    }
    state.frame=requestAnimationFrame(tick);
  }
  function updateTimeline(){const val=Math.round(state.progress*1000);els.timeline.value=String(val);els.percent.textContent=`${Math.round(state.progress*100)}%`;els.clock.textContent=formatClock(state.progress*state.stepDuration);if(els.equationView)els.equationView.style.setProperty('--step-progress',state.progress.toFixed(3))}
  function goToStep(index,manual){setStep(index,{manual:!!manual})}
  function manualProgress(value){pause();state.renderToken++;els.equationView.classList.remove('is-changing');state.progress=Math.max(0,Math.min(1,value));if(Number.isFinite(neuralAudio.duration)&&neuralAudio.duration>0){try{neuralAudio.currentTime=Math.min(neuralAudio.duration,state.progress*state.stepDuration)}catch{}}updateTimeline();if(state.graphVisible)drawGraph()}
  function syncCanvasSize(){
    const canvas=els.canvas;if(!canvas||!state.graphVisible)return null;
    const rect=canvas.getBoundingClientRect();
    const w=rect.width||canvas.clientWidth,h=rect.height||canvas.clientHeight;
    if(!(w>0&&h>0))return null;
    const dpr=Math.max(1,window.devicePixelRatio||1);
    const bw=Math.round(w*dpr),bh=Math.round(h*dpr);
    if(canvas.width!==bw)canvas.width=bw;
    if(canvas.height!==bh)canvas.height=bh;
    return {w,h,dpr};
  }
  function drawGraph(){
    if(!state.graphVisible)return;
    const lesson=currentLesson();if(!lesson)return;const canvas=els.canvas,size=syncCanvasSize();if(!size)return;const {w,h,dpr}=size;
    if(!window.CalculusGraphs||typeof window.CalculusGraphs.draw!=='function'){
      if(!state.graphWarned){state.graphWarned=true;const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,w,h);ctx.fillStyle='#86868b';ctx.font='12px Inter,Segoe UI,sans-serif';ctx.textAlign='center';ctx.fillText('Live graph module is loading',w/2,h/2)}return;
    }
    try{
      const result=window.CalculusGraphs.draw(canvas,lesson,state.stepIndex,state.progress,{zoom:state.zoom,panX:state.panX,panY:state.panY,inspectX:state.inspectX});
      if(result&&result.bounds){state.bounds=result.bounds;els.inspect.min=String(result.bounds.xMin);els.inspect.max=String(result.bounds.xMax);if(state.inspectX===null)els.inspect.value=String((result.bounds.xMin+result.bounds.xMax)/2);}
      if(state.inspectX!==null)els.inspectValue.textContent=Number(state.inspectX).toFixed(2);
    }catch(err){if(!state.graphWarned){state.graphWarned=true;console.error('Graph renderer error',err);const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#111114';ctx.font='12px sans-serif';ctx.fillText('Graph unavailable for this expression',12,24)}}
  }
  function applySidebarState(closed){
    state.sidebarClosed=!!closed;
    els.sidebar.classList.toggle('collapsed',state.sidebarClosed);
    els.menu.setAttribute('aria-expanded',String(!state.sidebarClosed));
    els.menu.setAttribute('aria-label',state.sidebarClosed?'Show homework list':'Hide homework list');
  }
  function toggleSidebar(force){const open=force===undefined?state.sidebarClosed:!!force;applySidebarState(!open);if(state.graphVisible)drawGraph()}
  function selectMode(){const mode=els.mode.value;els.atLabel.textContent=mode==='limit'?'Approach to':'At';els.at.placeholder=mode==='limit'?'For example: 0':'For example: 1';}
  function showError(message){els.formError.hidden=!message;els.formError.textContent=message||''}
  function addCustom(lesson){
    validLesson(lesson);let id=lesson.id.replace(/[^\w-]+/g,'-').slice(0,90)||'custom-problem';let candidate=id,n=2;while(state.lessons.some(l=>l.id===candidate)){candidate=`${id}-${n++}`}lesson.id=candidate;
    state.lessons.push(lesson);state.customIds.add(lesson.id);const saved=safeStorageGet();saved.customLessons=state.lessons.filter(isCustom);try{localStorage.setItem(STORE,JSON.stringify(saved))}catch{}
    state.lessonIndex=state.lessons.length-1;state.stepIndex=0;state.zoom=1;state.panX=0;state.panY=0;state.inspectX=null;updateHeader();renderLessonList();setStep(0,{manual:true});els.dialog.close();els.expression.value='';showError('');
  }
  function generateProblem(){
    showError('');if(!window.CalculusSolver||typeof window.CalculusSolver.buildLesson!=='function'){showError('The local symbolic solver is still loading. Reload the page once solver.js is available.');return}
    const expression=els.expression.value.trim(),variable=els.variable.value.trim(),at=els.at.value.trim();if(!expression||!variable||!at){showError('Fill in the expression, variable, and point or approach value.');return}
    els.generate.disabled=true;els.generate.textContent='Working\u2026';try{const lesson=window.CalculusSolver.buildLesson({mode:els.mode.value,expression,variable,at});validLesson(lesson);addCustom(lesson)}catch(err){showError(err&&err.message?err.message:'This expression is outside the supported methods. Try a simpler scalar expression.')}finally{els.generate.disabled=false;els.generate.textContent='Generate steps'}
  }
  function importLessons(file){if(!file)return;if(file.size>1024*1024){showError('That file is over 1 MB. Import one lesson at a time.');return}const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(String(reader.result));const list=Array.isArray(data)?data:(Array.isArray(data.lessons)?data.lessons:[data]);if(!list.length||list.length>20)throw new Error('Import 1\u201320 authored lessons at a time.');for(const lesson of list){validLesson(lesson);if(state.originalIds.has(lesson.id))throw new Error('An imported lesson cannot replace one of the built-in homework lessons.')}for(const lesson of list)addCustom(lesson);els.live.textContent=`Imported ${list.length} authored lesson${list.length===1?'':'s'}.`}catch(err){alert(`Could not import lesson JSON: ${err.message}`)}finally{els.importFile.value=''}};reader.onerror=()=>alert('The selected JSON file could not be read.');reader.readAsText(file)}
  function exportLesson(){const l=currentLesson();if(!l||!isCustom(l))return;const blob=new Blob([JSON.stringify(l,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${l.id}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  function setZoom(mult){state.zoom=Math.max(.5,Math.min(5,state.zoom*mult));drawGraph()}
  function resetGraph(){state.zoom=1;state.panX=0;state.panY=0;state.inspectX=null;els.inspectValue.textContent='\u2014';drawGraph()}
  function pointerDown(event){state.drag={x:event.clientX,y:event.clientY,panX:state.panX,panY:state.panY,moved:false};els.canvas.setPointerCapture?.(event.pointerId)}
  function pointerMove(event){if(!state.drag)return;const dx=event.clientX-state.drag.x,dy=event.clientY-state.drag.y;if(Math.abs(dx)+Math.abs(dy)>5)state.drag.moved=true;if(state.drag.moved){state.panX=state.drag.panX-dx/Math.max(1,els.canvas.clientWidth)*6/state.zoom;state.panY=state.drag.panY+dy/Math.max(1,els.canvas.clientHeight)*6/state.zoom;drawGraph()}}
  function pointerUp(event){if(!state.drag)return;const wasDrag=state.drag.moved;state.drag=null;if(!wasDrag&&window.CalculusGraphs&&syncCanvasSize()){try{const r=window.CalculusGraphs.draw(els.canvas,currentLesson(),state.stepIndex,state.progress,{zoom:state.zoom,panX:state.panX,panY:state.panY,inspectX:null});if(r&&r.pixelToWorld){const p=r.pixelToWorld(event.offsetX,event.offsetY);if(p&&Number.isFinite(p.x)){state.inspectX=p.x;els.inspect.value=String(p.x);els.inspectValue.textContent=p.x.toFixed(2);drawGraph()}}}catch{}}}

  // Navigation and timing controls.
  els.menu.addEventListener('click',()=>toggleSidebar());els.search.addEventListener('input',renderLessonList);
  els.back.addEventListener('click',()=>goToStep(state.stepIndex-1,true));els.next.addEventListener('click',()=>goToStep(state.stepIndex+1,true));els.play.addEventListener('click',()=>state.playing?pause():play());
  els.replay.addEventListener('click',()=>{pause();manualProgress(0);if(currentStep())renderEquation(currentStep(),true);speakCurrent({resumeOffset:0});startStepSweep()});els.timeline.addEventListener('input',e=>manualProgress(Number(e.target.value)/1000));
  els.speed.addEventListener('change',e=>{state.speed=Number(e.target.value)||1;neuralAudio.playbackRate=Math.max(0.5,Math.min(2,state.speed))});els.inspect.addEventListener('input',e=>{state.inspectX=Number(e.target.value);els.inspectValue.textContent=state.inspectX.toFixed(2);drawGraph()});els.clearInspect.addEventListener('click',()=>{state.inspectX=null;els.inspectValue.textContent='\u2014';drawGraph()});
  els.zoomIn.addEventListener('click',()=>setZoom(1.25));els.zoomOut.addEventListener('click',()=>setZoom(1/1.25));els.resetGraph.addEventListener('click',resetGraph);
  els.canvas.addEventListener('pointerdown',pointerDown);els.canvas.addEventListener('pointermove',pointerMove);els.canvas.addEventListener('pointerup',pointerUp);els.canvas.addEventListener('pointercancel',()=>state.drag=null);els.canvas.addEventListener('wheel',e=>{e.preventDefault();setZoom(e.deltaY<0?1.12:1/1.12)},{passive:false});
  els.speech.addEventListener('change',()=>setVoiceEnabled(els.speech.checked));
  if(els.voiceButton)els.voiceButton.addEventListener('click',()=>setVoiceEnabled(!state.speechEnabled));
  if(els.playStepAudioButton)els.playStepAudioButton.addEventListener('click',()=>toggleStepAudioNow());
  if(els.graphToggle)els.graphToggle.addEventListener('click',()=>toggleGraph());
  if(els.homeworkMode)els.homeworkMode.addEventListener('click',()=>switchMode('homework'));
  if(els.conceptDemos)els.conceptDemos.addEventListener('click',()=>switchMode('concepts'));
  if(els.examEssentials)els.examEssentials.addEventListener('click',()=>switchMode('essentials'));
  if(els.closeEssentials)els.closeEssentials.addEventListener('click',()=>setEssentialsView(false));
  if(els.essentialsFilterBar){
    els.essentialsFilterBar.addEventListener('click',e=>{
      const btn=e.target.closest('.filter-pill');
      if(btn&&btn.dataset.chapter)renderExamEssentials(btn.dataset.chapter);
    });
  }
  const unlockPendingAudio=(e)=>{
    if(!state.sidebarClosed&&e.target&&e.target.closest&&!e.target.closest('#lessonSidebar,#menuToggle'))toggleSidebar(false);
    if(els.promptDetails&&els.promptDetails.open&&e.target&&e.target.closest&&!e.target.closest('#promptDetails'))els.promptDetails.open=false;
    if(!pendingAutoplay||!state.speechEnabled)return;
    if(e.target&&e.target.closest&&e.target.closest('#voiceButton,#playStepAudioButton,#speechToggle,.speech-toggle,#playButton,#backButton,#nextButton,#replayButton,#timelineSlider'))return;
    pendingAutoplay=false;speakCurrent({resumeOffset:state.progress*state.stepDuration});
  };
  document.addEventListener('click',unlockPendingAudio,{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!state.sidebarClosed){toggleSidebar(false);return}if(e.key==='Escape'&&state.essentialsOpen){setEssentialsView(false);return}if(e.altKey||e.ctrlKey||e.metaKey||state.essentialsOpen)return;const target=e.target,typing=target.matches('input,select,textarea,[contenteditable="true"]')||els.dialog.open;if(typing)return;if(e.key==='ArrowLeft'){e.preventDefault();goToStep(state.stepIndex-1,true)}else if(e.key==='ArrowRight'){e.preventDefault();goToStep(state.stepIndex+1,true)}else if(e.code==='Space'){e.preventDefault();state.playing?pause():play()}});
  els.newProblem.addEventListener('click',()=>{showError('');els.dialog.showModal();selectMode();els.expression.focus()});els.mode.addEventListener('change',selectMode);els.generate.addEventListener('click',generateProblem);
  els.importButton.addEventListener('click',()=>els.importFile.click());els.importFile.addEventListener('change',()=>importLessons(els.importFile.files?.[0]));els.exportButton.addEventListener('click',exportLesson);
  window.addEventListener('resize',()=>{
    const wasMobile=state.isMobile;
    state.isMobile=window.innerWidth<=760;
    if(wasMobile!==state.isMobile)updateModeCounts();
    if(state.graphVisible)drawGraph();
  });
  if('ResizeObserver'in window){new ResizeObserver(()=>{if(state.graphVisible)drawGraph()}).observe(els.canvas)}

  loadLessons();renderExamEssentials('all');state.speed=Number(els.speed.value)||1;applySidebarState(true);updateHeader();renderLessonList();
  if(state.lessons.length){setStep(state.stepIndex,{announce:false});}else{els.live.textContent='No local lessons were found.';}
})();
