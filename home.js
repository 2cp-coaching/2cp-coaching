(function(){
  var tabs=document.querySelectorAll('.tabs button'),panels=document.querySelectorAll('.panel');
  tabs.forEach(function(b){b.addEventListener('click',function(){
    tabs.forEach(function(x,i){var on=x===b;x.setAttribute('aria-selected',on);panels[i].classList.toggle('on',on);});
  });});
  var dur=document.querySelectorAll('#dur button'),pay=document.querySelectorAll('#pay button'),main=document.getElementById('sum-main');
  function upd(){
    var d=document.querySelector('#dur [aria-pressed="true"]'),p=document.querySelector('#pay [aria-pressed="true"]').dataset.p;
    main.textContent=d.dataset.m+' Monate · '+(p==='mo'?d.dataset.mo+' € pro Monat':d.dataset.all+' € bei Vorauszahlung');
  }
  function sync(){var d=document.querySelector('#dur [aria-pressed="true"]'),p=document.querySelector('#pay [aria-pressed="true"]').dataset.p,a=document.getElementById('k-lz'),b=document.getElementById('k-zahl');if(a)a.value='Coaching: '+d.dataset.m+' Monate';if(b)b.value=p==='mo'?'Monatlich':'Einmalig im Voraus';}
  function pick(list){list.forEach(function(b){b.addEventListener('click',function(){list.forEach(function(x){x.setAttribute('aria-pressed',x===b);});upd();sync();});});}
  pick(dur);pick(pay);upd();
  var go=document.querySelector('#preise .btns a.btn:not(.ghost)');if(go)go.addEventListener('click',sync);
})();


(function(){
  var $=function(id){return document.getElementById(id)};

  var f=$('kform'),st=$('kstatus');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    st.textContent='Wird gesendet …';
    fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}})
      .then(function(r){if(!r.ok)throw 0;f.reset();st.textContent='Danke, Deine Anfrage ist bei uns angekommen. Wir melden uns bald bei Dir.';})
      .catch(function(){st.textContent='Das Senden hat nicht geklappt. Schreib uns bitte direkt an info@2cp-coaching.de.';});
  });
})();


