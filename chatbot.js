// بسيط: واجهة شات بوت أمامية مع دعم وصول (تكبير نص + قراءة صوت)
const Bot = (function(){
  const synth = window.speechSynthesis;
  function speak(text){
    if(!text) return;
    if(!('speechSynthesis' in window)) return;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'ar-SA';
    synth.cancel(); synth.speak(ut);
  }
  // قواعد بسيطة للرد
  function reply(message){
    message = (message||'').toLowerCase();
    if(message.includes('السلام')||message.includes('مرحبا')) return "أهلًا! كيف أقدر أساعدك؟ جرّب: فحص رابط، رفع بلاغ، أو مساعدة.";
    if(message.includes('فحص')||message.includes('رابط')) return "يمكنك فتح صفحة فحص الروابط من زر 'فحص رابط'، ألصق الرابط وسأحلله (تحليلي محلي، تجريبي).";
    if(message.includes('بلاغ')||message.includes('رفع')) return "افتح 'رفع بلاغ' واملأ الحقول. سأنشئ لك رقم مرجعي محليًا.";
    if(message.includes('مساعدة')||message.includes('كيف')) return "إذا تفضل الصوت اضغط زر الميكروفون، وإذا تفضل قراءة كبيرة استخدم زر التكبير.";
    return "عذرًا لم أفهم، اكتب: فحص رابط، رفع بلاغ، أو مساعدة.";
  }

  // تحويل صوتي إلى نص (إن تدعم المتصفح)
  function startRecognition(onResult){
    const SpeechRecognition = window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SpeechRecognition) { onResult(null,'no-recognition'); return;}
    const rec = new SpeechRecognition();
    rec.lang='ar-SA';rec.interimResults=false;rec.onresult = (e)=> onResult(e.results[0][0].transcript);
    rec.onerror = (e)=> onResult(null,e.error); rec.start();
    return rec;
  }

  return {speak,reply,startRecognition};
})();
