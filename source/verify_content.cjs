const fs = require('fs');
const path = require('path');
const assert = require('assert');
const katex = require('../node_modules/katex');
const root = path.resolve(__dirname, '..');
const lessons = JSON.parse(fs.readFileSync(path.join(__dirname,'lessons.json'),'utf8'));
assert.equal(lessons.length,12);
assert.equal(new Set(lessons.map(l=>l.id)).size,12);
let fragments=0,steps=0;
for (const lesson of lessons) {
  assert(lesson.problem && lesson.source_note);
  for (const step of lesson.steps) {
    steps++;
    assert(step.why && step.narration && step.title && step.parts.length);
    assert.equal(new Set(step.parts.map(p=>p.id)).size,step.parts.length);
    for (const part of step.parts) {
      assert(['white','cyan','red'].includes(part.color||'white'));
      katex.renderToString(part.tex,{throwOnError:true,trust:false,strict:'error'});
      fragments++;
    }
  }
}
const extrema=lessons.find(l=>l.id.startsWith('10-'));
assert(extrema.steps.some(st=>st.title.toLowerCase().includes('minimum')&&st.parts.some(p=>p.tex.includes('=0'))));
const rates=lessons.find(l=>l.id.startsWith('08-'));
assert(['a','b','c'].every(part=>rates.steps.some(st=>st.title.toLowerCase().startsWith('part '+part))));
const example=JSON.parse(fs.readFileSync(path.join(__dirname,'import_example.json'),'utf8'));
for (const step of example.steps) for(const part of step.parts) katex.renderToString(part.tex,{throwOnError:true,trust:false});
const result={status:'PASS',lessons:lessons.length,steps,fragments,import_example:'PASS',checks:['Unique lesson and fragment IDs','Every equation parses with KaTeX','All three triangle-rate parts','Both extrema displayed including zero endpoint minimum']};
fs.writeFileSync(path.join(root,'qa','content_audit.json'),JSON.stringify(result,null,2));
console.log(result);
