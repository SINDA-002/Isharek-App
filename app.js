// app.js — تفاعلات بسيطة لتجربة العرض
(function(){
  const root = document.documentElement;
  const btnContrast = document.getElementById('contrastBtn');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');

  let highContrast = false;
  btnContrast && btnContrast.addEventListener('click', ()=>{
    highContrast = !highContrast;
    if(highContrast){
      root.style.setProperty('--bg','#ffffff');
      root.style.setProperty('--card','#f6fff6');
      root.style.setProperty('--muted','#666');
      // تلميح مرئي للمستخدم
      btnContrast.textContent = 'تباين: نشط';
    } else {
      root.style.removeProperty('--bg');
      root.style.removeProperty('--card');
      root.style.removeProperty('--muted');
      btnContrast.textContent = 'تباين';
    }
  });

  let scale = 1;
  zoomIn && zoomIn.addEventListener('click', ()=>{
    scale = Math.min(1.4, +(scale + 0.05).toFixed(2));
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin='top center';
  });

  zoomOut && zoomOut.addEventListener('click', ()=>{
    scale = Math.max(0.85, +(scale - 0.05).toFixed(2));
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin='top center';
  });

  // تحسين الوصول: السماح بالتركيز للبطاقات والضغط عبر Enter
  document.querySelectorAll('.service-box').forEach(el=>{
    el.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Profile button — عرض تلميح مؤقت (محاكاة)
  const profileBtn = document.getElementById('profileBtn');
  profileBtn && profileBtn.addEventListener('click', ()=>{
    alert('هذه واجهة عرضية. لا توجد وظيفة لحسابي في النسخة التجريبية.');
  });

})();
