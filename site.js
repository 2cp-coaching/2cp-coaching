(function(){
  var h=document.querySelector('header'),mb=document.getElementById('menu-btn');
  if(mb)mb.addEventListener('click',function(){var o=h.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
  document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){h.classList.remove('open');if(mb)mb.setAttribute('aria-expanded','false');});});

  /* Einblenden beim Scrollen */
  var els=document.querySelectorAll('.inc .card,.steps li,.people .card,.stats div,.res-card,.extra .card,.seg button,main section h2,.info h3,.pagehead h1');
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
    els.forEach(function(el,i){
      el.classList.add('rv');
      var sib=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.transitionDelay=Math.min(sib,5)*70+'ms';
      io.observe(el);
    });
  }else{document.documentElement.classList.remove('js');}

  /* Mobile Leiste ausblenden, solange das Formular im Bild ist */
  var bar=document.querySelector('.cta-bar'),k=document.getElementById('kontakt');
  if(bar&&k&&'IntersectionObserver' in window){
    new IntersectionObserver(function(es){bar.classList.toggle('gone',es[0].isIntersecting);},{threshold:.15}).observe(k);
  }
})();
