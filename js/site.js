
var _y=document.getElementById('yr');if(_y)_y.textContent=new Date().getFullYear();
const nav=document.getElementById('nav');
const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>40);
onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const mb=document.getElementById('menuBtn');if(mb)mb.addEventListener('click',()=>{const o=document.getElementById('links').classList.toggle('open');mb.textContent=o?'✕':'☰'});
document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>{document.getElementById('links').classList.remove('open');mb.textContent='☰'}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*90+'ms';io.observe(el)});

if(document.getElementById('leadForm')){
let mode='sell';
const lbl={sell:{purpose:'الغرض',price:'السعر المطلوب (د.ك)',notes:'تفاصيل إضافية'},buy:{purpose:'تبي',price:'الميزانية (د.ك)',notes:'مواصفات تبيها'}};
document.querySelectorAll('.ftabs .tab').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.ftabs .tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');mode=b.dataset.f;
  document.getElementById('purpose').innerHTML=mode==='sell'?'<option>للبيع</option><option>للإيجار</option>':'<option>شراء</option><option>إيجار</option>';
  document.getElementById('purposeLbl').textContent=lbl[mode].purpose;document.getElementById('priceLbl').textContent=lbl[mode].price;document.getElementById('notesLbl').textContent=lbl[mode].notes;
  document.getElementById('fdone').style.display='none';
}));
document.getElementById('leadForm').addEventListener('submit',e=>{
  e.preventDefault();const f=e.target;const v=n=>(f.elements[n].value||'').trim();
  if(!v('name')||!v('phone')||!v('area')){['name','phone','area'].forEach(n=>{if(!v(n))f.elements[n].style.borderColor='#e5484d'});return}
  const head=mode==='sell'?'📌 عرض عقار جديد من الموقع':'🔎 طلب عقار جديد من الموقع';
  const lines=[head,'الاسم: '+v('name'),'الرقم: '+v('phone'),'النوع: '+v('type'),(mode==='sell'?'الغرض: ':'يبي: ')+v('purpose'),'المنطقة: '+v('area')];
  if(v('block'))lines.push('القطعة: '+v('block'));if(v('size'))lines.push('المساحة: '+v('size')+' م²');
  if(v('price'))lines.push((mode==='sell'?'السعر: ':'الميزانية: ')+v('price'));if(v('notes'))lines.push('تفاصيل: '+v('notes'));
  const a=document.getElementById('waLink');a.href='https://wa.me/96598926543?text='+encodeURIComponent(lines.join('\n'));
  document.getElementById('fdone').style.display='block';a.scrollIntoView({behavior:'smooth',block:'center'});
});

}


(function(){
  var URL_=location.href.split('#')[0];
  var TXT='شركة الاعتماد الدولية العقارية 🏡\nبيع وشراء وتأجير السكن الخاص في جميع مناطق الكويت\nتصفح عروضنا 👇\n'+URL_;
  var ov=document.getElementById('shareOv'),toast=document.getElementById('shareToast'),tt;
  function show(m){toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on')},3200)}
  function open(){ov.classList.add('open');ov.setAttribute('aria-hidden','false')}
  function close(){ov.classList.remove('open');ov.setAttribute('aria-hidden','true')}
  function copy(t){
    if(navigator.clipboard&&navigator.clipboard.writeText){return navigator.clipboard.writeText(t).catch(fb)}
    fb();return Promise.resolve();
    function fb(){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}
  }
  window.openShare=open;
  document.querySelectorAll('[data-share-open]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open()})});
  document.getElementById('shareClose').addEventListener('click',close);
  ov.addEventListener('click',function(e){if(e.target===ov)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  ov.querySelectorAll('.share-opt').forEach(function(b){b.addEventListener('click',function(){
    var s=b.dataset.s;
    if(s==='wa'){window.open('https://wa.me/?text='+encodeURIComponent(TXT),'_blank','noopener');close()}
    else if(s==='ig'){copy(TXT).then(function(){show('تم نسخ الرابط ✔ الصقه في رسالة انستجرام');setTimeout(function(){window.open('https://www.instagram.com/direct/inbox/','_blank','noopener')},700)});close()}
    else if(s==='cp'){copy(URL_).then(function(){show('تم نسخ رابط الموقع ✔')});close()}
    else{if(navigator.share){navigator.share({title:'شركة الاعتماد الدولية العقارية',text:TXT.replace('\n'+URL_,''),url:URL_}).catch(function(){})}else{copy(URL_).then(function(){show('تم نسخ رابط الموقع ✔')})}close()}
  })});
})();

/* old one-page links (#sold, #listings ...) -> new pages */
(function(){
  var p=location.pathname.split('/').pop();
  if(p&&p!=='index.html')return;
  var m={'#listings':'for-sale.html','#sold':'sold.html','#request':'request.html','#areas':'areas.html','#faq':'faq.html','#about':'about.html','#reviews':'reviews.html','#services':'about.html#services','#contact':'contact.html'};
  if(m[location.hash])location.replace(m[location.hash]);
})();
