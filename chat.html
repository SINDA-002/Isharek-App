<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>الدعم الصوتي — إشعارك (Chat)</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header" style="justify-content:space-between">
    <a href="index.html" class="btn ghost" style="color:#fff;border-color:rgba(255,255,255,0.28)">العودة</a>
    <div class="brand-text" style="color:#fff">مساعد إشعارك</div>
    <div></div>
  </header>

  <main class="content" style="max-width:760px">
    <section style="margin-top:18px">
      <div style="background:#fff;padding:12px;border-radius:12px;box-shadow:var(--shadow)">
        <h2>مساعد النص والصوت (تجريبي)</h2>
        <p class="muted">مناسب لكبار السن ومستخدمي خاص. ادخل سؤالك أو اضغط على الميكروفون للنطق.</p>

        <div id="chatBox" style="min-height:200px;border-radius:10px;padding:10px;background:#f8fdf8;margin-top:8px" aria-live="polite"></div>

        <div style="display:flex;gap:8px;margin-top:10px">
          <input id="userInput" placeholder="اكتب سؤالك هنا..." aria-label="حقل إدخال السائل" style="flex:1;padding:10px;border-radius:8px;border:1px solid #ddd">
          <button id="send" class="btn primary">إرسال</button>
          <button id="speak" class="btn ghost" id="speakBtn" title="التحدث باستخدام الميكروفون">🎤 نطق</button>
        </div>

        <div style="margin-top:8px">
          <label class="muted"><input id="largeText" type="checkbox"> نص كبير</label>
          <label class="muted" style="margin-right:12px"><input id="voiceOn" type="checkbox"> تفعيل الصوت (قراءة النتائج)</label>
        </div>
      </div>
    </section>
  </main>

<script>
  (function(){
    const chatBox = document.getElementById('chatBox');
    const input = document.getElementById('userInput');
    const send = document.getElementById('send');
    const speak = document.getElementById('speakBtn') || document.getElementById('speak');
    const voiceOn = document.getElementById('voiceOn');
    const largeText = document.getElementById('largeText');

    function addMessage(from, text){
      const div = document.createElement('div');
      div.style.padding='8px';
      div.style.marginBottom='6px';
      div.style.borderRadius='8px';
      div.style.maxWidth='90%';
      div.style.wordBreak='break-word';
      if(from === 'user'){
        div.style.background = '#e6f7ea';
        div.style.marginInlineStart = 'auto';
        div.style.textAlign = 'right';
      } else {
        div.style.background = '#fff';
        div.style.textAlign = 'left';
      }
      div.textContent = text;
      if(largeText.checked){ div.style.fontSize='20px'; }
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function replySim(text){
      let lower = (text || '').toLowerCase();
      let resp = 'عذراً، لا أستطيع فعليًا فحص الروابط هنا. جرّب "فحص رابط" أو "رفع بلاغ".';
      if(lower.includes('رابط') || lower.includes('فحص')) resp = 'يمكنك التوجّه إلى صفحة فحص الرابط أو لصق الرابط الآن.';
      if(lower.includes('كيف') || lower.includes('طريقة')) resp = 'للفحص: اذهب إلى "فحص رابط" ثم الصق الرابط واضغط فحص.';
      if(lower.includes('بلاغ') || lower.includes('رفع')) resp = 'لرفع بلاغ استخدم صفحة "رفع بلاغ" واملأ الحقول ثم اضغط إرسال.';
      addMessage('bot', resp);
      if(voiceOn.checked && 'speechSynthesis' in window){
        const u = new SpeechSynthesisUtterance(resp);
        u.lang='ar-SA';
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    }

    send.addEventListener('click', ()=>{
      const v = input.value.trim();
      if(!v) return;
      addMessage('user', v);
      input.value = '';
      setTimeout(()=> replySim(v), 400);
    });

    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send.click(); }
    });

    speak && speak.addEventListener('click', ()=>{
      if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){
        alert('الميكروفون غير مدعوم في المتصفح الحالي (جرّب كروم).');
        return;
      }
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const txt = e.results[0][0].transcript;
        addMessage('user', txt);
        replySim(txt);
      };
      rec.onerror = (evt) => {
        alert('حدث خطأ أثناء التعرف الصوتي: ' + (evt.error || 'غير معروف'));
      };
      try { rec.start(); } catch(e){ alert('تعذر بدء التعرف الصوتي: ' + e.message); }
    });

  })();
</script>
</body>
</html>
