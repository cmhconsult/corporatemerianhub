// Premium router + interactions - no build step
const pages = document.querySelectorAll('.page');
function showPage(name){
  let target = name || 'home';
  if(!document.querySelector('[data-page="'+target+'"]')) target='home';
  pages.forEach(x=>x.classList.toggle('active', x.dataset.page===target));
  document.querySelectorAll('[data-nav]').forEach(a=>{ a.classList.toggle('active', a.getAttribute('data-nav')===target); });
  window.scrollTo({top:0, behavior:'smooth'});
  // subtle entrance
  const active = document.querySelector('.page.active');
  if(active){ active.querySelectorAll('.fancy-card,.glass-card').forEach((el,i)=>{ el.style.opacity='0'; el.style.transform='translateY(12px)'; setTimeout(()=>{ el.style.transition='all .5s'; el.style.opacity='1'; el.style.transform='none'; }, 70*i+80); }); }
}
function fromHash(){ showPage(location.hash.replace('#','') || 'home'); }
window.addEventListener('hashchange', fromHash);
document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-nav]');
  if(t){
    const page = t.getAttribute('data-nav');
    const svc = t.getAttribute('data-service');
    if(svc){ const sel=document.getElementById('serviceSelect'); if(sel) sel.value=svc; }
    location.hash = page;
    document.getElementById('mainNav').classList.remove('open');
  }
});
document.getElementById('burger').addEventListener('click', ()=>{ document.getElementById('mainNav').classList.toggle('open'); });
// How it works tabs
const howTexts = {
  1: 'We start by auditing how your institution actually works — not how it looks on paper.',
  2: 'We diagnose bottlenecks, overlaps and unclear accountability across departments.',
  3: 'You get a clear, practical plan — roles, processes and quick wins.',
  4: 'We support implementation with training and coordination rhythm.'
};
document.addEventListener('click', (e)=>{
  const b = e.target.closest('.how-btn'); if(!b) return;
  document.querySelectorAll('.how-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  const t=document.getElementById('howText'); if(t) t.textContent = howTexts[b.dataset.step] || howTexts[1];
});
// Diagnostic quiz
const quizSteps = [
  {q:'1. Where is work getting stuck most?', opts:[['Roles and reporting are unclear','hierarchy'],['Processes are slow or messy','process'],['Departments are not aligned','coordination']]},
  {q:'2. How clear are roles in your institution?', opts:[['Very unclear','hierarchy'],['Somewhat clear','workflow'],['Clear, but slow','systems']]},
  {q:'3. What do you want to fix first?', opts:[['Accountability','hierarchy'],['Speed','workflow'],['Team skills','training']]}
];
let quizIndex=0, quizScore={};
const mapService={hierarchy:['Organizational Hierarchy Audit','service-hierarchy'],process:['Process Mapping','service-process'],workflow:['Workflow Optimization','service-workflow'],systems:['Systems Review','service-systems'],training:['Staff Productivity Training','service-training'],coordination:['Department Coordination','service-coordination']};
const qQ=document.getElementById('quizQ'), qOpts=document.getElementById('quizOptions'), qRes=document.getElementById('quizResult'), qLink=document.getElementById('quizLink'), diagBar=document.getElementById('diagBar');
if(qOpts){
  qOpts.addEventListener('click', (e)=>{
    const b=e.target.closest('button'); if(!b) return;
    const key=b.dataset.answer; quizScore[key]=(quizScore[key]||0)+1; quizIndex++;
    if(diagBar) diagBar.style.width = Math.min(100, 33*(quizIndex+1)) + '%';
    if(quizIndex<quizSteps.length){
      qQ.textContent=quizSteps[quizIndex].q;
      qOpts.innerHTML=quizSteps[quizIndex].opts.map(o=>'<button data-answer="'+o[1]+'">'+o[0]+'</button>').join('');
    } else {
      let best='hierarchy', bv=-1; for(const k in quizScore){ if(quizScore[k]>bv){bv=quizScore[k]; best=k;} }
      const rec=mapService[best]||mapService.hierarchy;
      qQ.textContent='Your recommendation'; qOpts.innerHTML='';
      qRes.classList.remove('hidden'); qRes.textContent='We recommend: '+rec[0]+'. Book a free discovery call and we will map your next steps.';
      qLink.classList.remove('hidden'); qLink.setAttribute('href','#'+rec[1]); qLink.setAttribute('data-nav',rec[1]); qLink.textContent='View '+rec[0]+' →';
    }
  });
}
function notifyForm(e){ e.preventDefault(); e.target.reset(); alert('Thank you. We will notify you when this industry opens.'); return false; }
function contactForm(e){ e.preventDefault(); e.target.querySelector('.form-success').classList.remove('hidden'); const name=e.target.querySelector('input[type="text"]').value; const email=e.target.querySelector('input[type="email"]').value; const msg=e.target.querySelector('textarea').value; const subject=encodeURIComponent('New message from '+name+' - Corporate Meridian Hub'); const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+msg); window.location.href='mailto:corporatemeridianhub@gmail.com?subject='+subject+'&body='+body; return false; }
function bookingSubmit(e){ e.preventDefault(); const f=e.target; const data={}; ['name','org','role','email','phone','institution','service','date','message'].forEach(k=>{ const el=f.querySelector('[name="'+k+'"]'); if(el) data[k]=el.value; }); document.getElementById('bookingSuccess').classList.remove('hidden'); const subject=encodeURIComponent('New Consultation Booking - '+data.name+' - '+data.service); const body=encodeURIComponent('Full Name: '+data.name+'\nOrganisation: '+data.org+'\nRole: '+data.role+'\nEmail: '+data.email+'\nPhone: '+data.phone+'\nInstitution Type: '+data.institution+'\nService of Interest: '+data.service+'\nPreferred Date: '+data.date+'\n\nMessage:\n'+data.message); setTimeout(()=>{ window.location.href='mailto:corporatemeridianhub@gmail.com?subject='+subject+'&body='+body; }, 600); return false; }
fromHash();
