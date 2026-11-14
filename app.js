// Fourth version - static - Manrope + Fraunces, no build step
const pages=document.querySelectorAll('.page');
function showPage(name){
  let target=name||'home';
  if(!document.querySelector('[data-page="'+target+'"]')) target='home';
  pages.forEach(x=>x.classList.toggle('active',x.dataset.page===target));
  document.querySelectorAll('[data-nav]').forEach(a=>{ a.classList.toggle('active',a.getAttribute('data-nav')===target); });
  document.querySelectorAll('.bottom-nav button').forEach(b=>{ b.classList.toggle('active',b.getAttribute('data-nav')===target); });
  window.scrollTo({top:0,behavior:'smooth'});
  closeDrawer();
}
function fromHash(){ showPage(location.hash.replace('#','')||'home'); }
window.addEventListener('hashchange',fromHash);
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-nav]');
  if(t){
    const page=t.getAttribute('data-nav');
    const svc=t.getAttribute('data-service');
    if(svc){ const sel=document.getElementById('serviceSelect'); if(sel) sel.value=svc; }
    if(location.hash==='#'+page){ showPage(page); } else { location.hash=page; }
  }
});
const drawer=document.getElementById('drawer'), overlay=document.getElementById('drawerOverlay');
function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }
document.getElementById('burger').addEventListener('click',openDrawer);
document.getElementById('drawerClose').addEventListener('click',closeDrawer);
overlay.addEventListener('click',closeDrawer);
// How it works
const howData=[
  {img:'assets/classroom.webp',cap:'A short discovery conversation. No jargon, no long forms. We ask where decisions stall, where handoffs break, and what you want to feel calmer about.'},
  {img:'assets/org-chart.webp',cap:'We follow the work from request to completion and draw the real map — not the one in the handbook. Gaps and overlaps become visible.'},
  {img:'assets/workshop.webp',cap:'Recommendations are prioritised and plain-spoken. You know what to keep, what to fix, and what to stop doing — and in what order.'},
  {img:'assets/campus.webp',cap:'We leave behind templates and a calm cadence for follow-up. Your team keeps the routine after we leave.'}
];
document.addEventListener('click',e=>{
  const b=e.target.closest('.how-item'); if(!b) return;
  document.querySelectorAll('.how-item').forEach(x=>{ x.classList.remove('active'); x.querySelector('.how-detail').classList.add('hidden'); });
  b.classList.add('active'); b.querySelector('.how-detail').classList.remove('hidden');
  const idx=parseInt(b.dataset.how||'0'); const img=document.getElementById('howImg'); if(img) img.src=howData[idx].img; const cap=document.getElementById('howCap'); if(cap) cap.textContent=howData[idx].cap;
});
// FAQ
document.addEventListener('click',e=>{
  const b=e.target.closest('.faq-item'); if(!b) return;
  const ans=b.nextElementSibling; if(ans) ans.classList.toggle('hidden');
});
// Org chart demo
const orgData=[
  {name:'Head of School',line:'Owns whole-school decisions • Reports to: Board / Proprietor',detail:'Sets direction and owns final decisions. When this line is unclear, every decision waits.'},
  {name:'Deputy Head',line:'Owns day-to-day operations • Reports to: Head of School',detail:'Turns direction into daily rhythm. Coordinates heads and follows up on priorities.'},
  {name:'Head of Academics',line:'Owns teaching & learning • Reports to: Deputy Head',detail:'Owns curriculum, timetables and academic standards — and the handoffs with pastoral care.'},
  {name:'Head of Operations',line:'Owns admissions, facilities & admin • Reports to: Deputy Head',detail:'Owns the processes parents feel first: admissions, fees, facilities and admin follow-through.'}
];
document.addEventListener('click',e=>{
  const b=e.target.closest('.org-btn'); if(!b) return;
  document.querySelectorAll('.org-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  const d=orgData[parseInt(b.dataset.org||'0')]; document.getElementById('orgName').textContent=d.name; document.getElementById('orgLine').textContent=d.line; document.getElementById('orgDetail').textContent=d.detail;
});
// Diagnostic - exact 4th version questions
const diagQ=[
  {q:'Where is work getting stuck?',opts:[['Decisions stall — no one owns them','service-organisational-hierarchy-audit','Organisational Hierarchy Audit'],['Processes are slow or repeated','service-process-mapping','Process Mapping'],['Departments pull in different directions','service-department-coordination','Department Coordination'],['Tools & systems don\u2019t fit the work','service-systems-review','Systems Review']]},
  {q:'How clear are roles in your institution?',opts:[['Very unclear — lots of overlap','service-organisational-hierarchy-audit','Organisational Hierarchy Audit'],['Some overlap, some gaps','service-workflow-optimisation','Workflow Optimisation'],['Mostly clear, but handoffs slip','service-process-mapping','Process Mapping'],['Clear on paper, messy in practice','service-staff-productivity-training','Staff Productivity Training']]},
  {q:'What do you want to fix first?',opts:[['Clearer structure & ownership','service-organisational-hierarchy-audit','Organisational Hierarchy Audit'],['Faster, simpler workflows','service-workflow-optimisation','Workflow Optimisation'],['Better coordination','service-department-coordination','Department Coordination'],['Skills & daily routines','service-staff-productivity-training','Staff Productivity Training']]}
];
let diagStep=0, diagAnswers=[];
const diagOptsEl=document.getElementById('diagOpts'), diagQEl=document.getElementById('diagQ');
function renderDiag(){
  document.getElementById('diagStep').textContent=diagStep+1;
  document.getElementById('diagBar').style.width=(diagStep/3*100)+'%';
  document.querySelectorAll('.diag-dots i').forEach((el,i)=>{ el.classList.toggle('on', i<=diagStep); });
  document.getElementById('diagResult').classList.add('hidden');
  diagQEl.textContent=diagQ[diagStep].q;
  diagOptsEl.innerHTML=diagQ[diagStep].opts.map(o=>'<button data-svc="'+o[1]+'" data-title="'+o[2]+'">'+o[0]+'</button>').join('');
}
if(diagOptsEl){
  renderDiag();
  diagOptsEl.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b) return;
    diagAnswers.push(b.dataset.svc); diagStep++;
    if(diagStep<3){ renderDiag(); } else {
      const counts={}; diagAnswers.forEach(a=>{ counts[a]=(counts[a]||0)+1; });
      let best='service-organisational-hierarchy-audit', bv=-1; for(const k in counts){ if(counts[k]>bv){ bv=counts[k]; best=k; } }
      const title = diagQ[0].opts.find(o=>o[1]===best)?.[2] || 'Organisational Hierarchy Audit';
      document.getElementById('diagResult').classList.remove('hidden');
      document.getElementById('diagRecTitle').textContent='We recommend: '+title;
      document.getElementById('diagRecText').textContent='Based on your answers, this is the clearest place to start.';
      document.getElementById('diagRecBtn').onclick=()=>{ location.hash=best; };
      diagOptsEl.innerHTML='';
      document.getElementById('diagBar').style.width='100%';
    }
  });
  document.getElementById('diagBack').addEventListener('click',()=>{ if(diagStep>0){ diagStep--; diagAnswers.pop(); renderDiag(); } });
  document.getElementById('diagRestart').addEventListener('click',()=>{ diagStep=0; diagAnswers=[]; renderDiag(); });
  document.getElementById('diagRetake').addEventListener('click',()=>{ diagStep=0; diagAnswers=[]; renderDiag(); });
}
// Booking wizard
let bookStep=0;
function showBookStep(){
  document.querySelectorAll('.wizard-step').forEach((el,i)=>{ el.classList.toggle('active', i===bookStep); });
  document.getElementById('bookStepLabel').textContent=bookStep+1;
  document.getElementById('bookBar').style.width=((bookStep+1)/3*100)+'%';
  const titles=['Your details','Institution & Service','Date & Message']; document.getElementById('bookStepTitle').textContent=titles[bookStep];
}
function nextBookStep(){
  const cur=document.querySelector('.wizard-step.active');
  if(cur && !cur.checkValidity()){ cur.reportValidity(); return; }
  if(bookStep<2){ bookStep++; showBookStep(); }
}
function prevBookStep(){ if(bookStep>0){ bookStep--; showBookStep(); } }
function bookingSubmit(e){
  e.preventDefault();
  const f=e.target; const d={}; ['fullName','email','phone','organisation','role','institutionType','service','date','message'].forEach(k=>{ const el=f.querySelector('[name="'+k+'"]'); if(el) d[k]=el.value; });
  try{ const key='cmh_consultation_requests'; const prev=JSON.parse(localStorage.getItem(key)||'[]'); prev.push({...d,_savedAt:new Date().toISOString()}); localStorage.setItem(key,JSON.stringify(prev)); }catch{}
  document.getElementById('bookingSuccess').classList.remove('hidden');
  const subject=encodeURIComponent('New Consultation Booking - '+d.fullName+' - '+d.service);
  const body=encodeURIComponent('Full Name: '+d.fullName+'\nEmail: '+d.email+'\nPhone: '+d.phone+'\nOrganisation: '+d.organisation+'\nRole: '+d.role+'\nInstitution Type: '+d.institutionType+'\nService: '+d.service+'\nPreferred Date: '+d.date+'\n\nMessage:\n'+d.message);
  setTimeout(()=>{ window.location.href='mailto:corporatemeridianhub@gmail.com?subject='+subject+'&body='+body; },600);
  return false;
}
function contactSubmit(e){
  e.preventDefault();
  const f=e.target; const name=f.querySelector('[name="cname"]').value, email=f.querySelector('[name="cemail"]').value, msg=f.querySelector('[name="cmsg"]').value;
  try{ const key='cmh_contact_messages'; const prev=JSON.parse(localStorage.getItem(key)||'[]'); prev.push({name,email,message:msg,_savedAt:new Date().toISOString()}); localStorage.setItem(key,JSON.stringify(prev)); }catch{}
  document.getElementById('contactSuccess').classList.remove('hidden');
  const subject=encodeURIComponent('New message from '+name); const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+msg);
  window.location.href='mailto:corporatemeridianhub@gmail.com?subject='+subject+'&body='+body;
  return false;
}
function waitlistSubmit(e,industry){
  e.preventDefault();
  const f=e.target; const name=f.querySelector('[name="wname"]').value, email=f.querySelector('[name="wemail"]').value;
  try{ const key='cmh_waitlist_requests'; const prev=JSON.parse(localStorage.getItem(key)||'[]'); prev.push({name,email,industry,_savedAt:new Date().toISOString()}); localStorage.setItem(key,JSON.stringify(prev)); }catch{}
  document.getElementById('wait-'+industry).classList.remove('hidden');
  const subject=encodeURIComponent('Waitlist - '+industry+' - '+name); const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\nIndustry: '+industry);
  window.location.href='mailto:corporatemeridianhub@gmail.com?subject='+subject+'&body='+body;
  return false;
}
window.addEventListener('scroll',()=>{ const b=document.getElementById('backTop'); if(b) b.style.display=window.scrollY>600?'block':'none'; });
document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
fromHash(); showBookStep();
