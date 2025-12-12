// app.js — تفاعل الشات، الوصول، sidebar state, basic check & storage
document.addEventListener('DOMContentLoaded', ()=>{

  // accessibility buttons (header may be in index)
  const btnContrast = document.getElementById('btn-contrast');
  const btnZoom = document.getElementById('btn-zoom');
  const btnReset = document.getElementById('btn-reset');

  if(btnContrast) btnContrast.addEventListener('click', ()=> document.body.classList.toggle('high-contrast'));
  if(btnZoom) btnZoom.addEventListener('click', ()=> document.body.classList.toggle('large-text'));
  if(btnReset) btnReset.addEventListener('click', ()=> { document.body.classList.remove('large-text','high-contrast'); });

  // Chat widget
  const chatLaunch = document.querySelector('.chat-launch');
  const chatPanel = document.querySelector('.chat-panel');
  const chatClose = document.getElementById('chat-close');
  const chatLog = document.getElementById('chat-log');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  function addMsg(txt, who='bot'){
    const d = document.createElement('div'); d.className='msg '+(who==='bot'?'bot':'user'); d.textContent = txt;
    chatLog && chatLog.appendChild(d); chatLog && (chatLog.scrollTop = chatLog.scrollHeight);
    if(who==='bot') speak(txt);
  }
  function speak(t){
    if(!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(t); u.lang='ar-SA'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  }

  if(chatLaunch){
    chatLaunch.addEventListener('click', ()=>{
      chatPanel && chatPanel.classList.toggle('open');
      if(chatPanel && chatPanel.classList.contains('open')) addMsg('أهلاً! أنا مساعد إشعارك. ألصق الرابط أو اكتب سؤالك.');
    });
  }
  if(chatClose) chatClose.addEventListener('click', ()=> chatPanel.classList.remove('open'));

  if(chatForm){
    chatForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const v = chatInput.value.trim(); if(!v) return;
      addMsg(v,'user'); chatInput.value='';
      // if link -> try check
      if(v.startsWith('http') || v.includes('.')){
        addMsg('جارٍ فحص الرابط... (فحص مبدئي من المتصفح).');
        const res = await tryCheck(v);
        addMsg(res);
      } else {
        // canned
        if(/كيف|ماذا|فحص/.test(v)) addMsg('للفحص ألصق الرابط أو افتح صفحة فحص الرابط. يمكنني مساعدةك في رفع بلاغ أيضًا.');
        else addMsg('يمكنك لصق الرابط أو كتابة "فحص: <الرابط>".');
      }
    });
  }

  async function tryCheck(url){
    try{ new URL(url); } catch(e){ return 'الرابط غير صالح.'; }
    if(url.includes('bit.ly')||url.includes('tinyurl')) return 'رابط مختصر — توخّ الحذر.';
    if(url.match(/\.(exe|zip|msi|scr)$/i)) return 'يحمل امتداد تنزيل — خطر محتمل';
    try{
      const ctrl = new AbortController(); const t = setTimeout(()=>ctrl.abort(),5000);
      const r = await fetch(url, {method:'HEAD', mode:'cors', signal:ctrl.signal});
      clearTimeout(t);
      if(r.ok) return 'تم الوصول للرابط — الحالة: '+r.status;
      return 'تم الوصول ولكن الاستجابة: '+r.status;
    }catch(err){ return 'تعذر الفحص المباشر من المتصفح (CORS/Timeout). ضع البلاغ ليتم فحصه عبر خادم.'; }
  }

  // report storage helper (used in report.html)
  window.saveReport = function(obj){
    const arr = JSON.parse(localStorage.getItem('isharek_reports')||'[]');
    obj.id = 'R-'+Date.now();
    obj.ts = Date.now();
    arr.push(obj); localStorage.setItem('isharek_reports', JSON.stringify(arr));
    return obj.id;
  };
});
