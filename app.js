// app.js (خفيف وسريع)
(function(){
  // keyboard-friendly focus: nothing heavy
  window.addEventListener('load', ()=>{ /* reserved */ });

  // optional helpers (يمكن استدعاؤها)
  window.toggleContrast = function(){
    document.body.classList.toggle('high-contrast');
  };
  window.scaleUp = function(){
    document.body.style.fontSize = (parseFloat(getComputedStyle(document.body).fontSize)||16) + 2 + 'px';
  };
  window.scaleDown = function(){
    document.body.style.fontSize = (parseFloat(getComputedStyle(document.body).fontSize)||18) - 2 + 'px';
  };
})();
