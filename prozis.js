(function(){
  var code='2CPCOACHING',btn=document.getElementById('pz-copy'),st=document.getElementById('pz-status');
  function ok(){st.textContent='Code kopiert: '+code;}
  function fb(){var t=document.createElement('textarea');t.value=code;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy')?ok():st.textContent='Bitte markiere den Code und kopiere ihn manuell.';}catch(e){st.textContent='Bitte markiere den Code und kopiere ihn manuell.';}document.body.removeChild(t);}
  btn.addEventListener('click',function(){
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(code).then(ok,fb);}else{fb();}
  });
  /* Aktions-Bilder erscheinen nur, wenn die Datei im Ordner images/ liegt */
  document.querySelectorAll('#promo-grid figure').forEach(function(f){
    var im=f.querySelector('img'),t=new Image();
    t.onload=function(){f.hidden=false;};t.src=im.getAttribute('src');
  });
  var g=document.getElementById('promo-grid');
})();
