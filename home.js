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
  var imgs=document.querySelectorAll('#res-img img'),btns=document.querySelectorAll('#res-tabs button');
  btns.forEach(function(b,i){b.addEventListener('click',function(){
    btns.forEach(function(x,j){x.setAttribute('aria-pressed',j===i);imgs[j].classList.toggle('on',j===i);});
  });});
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

(()=>{const P=[["24.02.25", 79.73, 44.0, 217.2], ["03.03.25", 80.33, 54.2, 206.5], ["10.03.25", 80.06, 64.4, 211.4], ["24.03.25", 79.79, 84.9, 216.2], ["31.03.25", 79.58, 95.1, 219.9], ["07.04.25", 78.18, 105.3, 244.9], ["14.04.25", 79.96, 115.5, 213.1], ["21.04.25", 82.05, 125.7, 175.8], ["28.04.25", 81.19, 135.9, 191.2], ["05.05.25", 81.43, 146.2, 186.9], ["12.05.25", 80.75, 156.4, 199.0], ["19.05.25", 80.23, 166.6, 208.3], ["26.05.25", 81.02, 176.8, 194.2], ["02.06.25", 82.31, 187.0, 171.2], ["09.06.25", 82.77, 197.2, 163.0], ["16.06.25", 83.03, 207.4, 158.3], ["23.06.25", 82.07, 217.7, 175.5], ["30.06.25", 81.47, 227.9, 186.2], ["07.07.25", 81.63, 238.1, 183.3], ["14.07.25", 82.57, 248.3, 166.5], ["21.07.25", 81.25, 258.5, 190.1], ["28.07.25", 82.36, 268.7, 170.3], ["11.08.25", 83.86, 289.2, 143.5], ["18.08.25", 84.39, 299.4, 134.0], ["25.08.25", 84.67, 309.6, 129.0], ["01.09.25", 84.86, 319.8, 125.6], ["08.09.25", 85.17, 330.0, 120.1], ["15.09.25", 85.51, 340.2, 114.0], ["22.09.25", 85.33, 350.5, 117.3], ["29.09.25", 85.2, 360.7, 119.6], ["13.10.25", 85.6, 381.1, 112.4], ["27.10.25", 85.01, 401.5, 123.0], ["03.11.25", 85.27, 411.8, 118.3], ["10.11.25", 85.73, 422.0, 110.1], ["24.11.25", 85.66, 442.4, 111.4], ["08.12.25", 85.4, 462.8, 116.0], ["15.12.25", 86.36, 473.0, 98.9], ["22.12.25", 86.94, 483.3, 88.5], ["29.12.25", 87.84, 493.5, 72.4], ["05.01.26", 87.19, 503.7, 84.0], ["12.01.26", 86.6, 513.9, 94.6], ["19.01.26", 86.44, 524.1, 97.4], ["26.01.26", 86.86, 534.3, 89.9], ["02.02.26", 87.23, 544.6, 83.3], ["16.02.26", 87.06, 565.0, 86.4], ["23.02.26", 87.63, 575.2, 76.2], ["02.03.26", 88.43, 585.4, 61.9], ["09.03.26", 88.74, 595.6, 56.4], ["16.03.26", 89.64, 605.8, 40.3], ["23.03.26", 89.07, 616.1, 50.5], ["30.03.26", 89.33, 626.3, 45.8], ["06.04.26", 88.71, 636.5, 56.9], ["13.04.26", 88.27, 646.7, 64.8], ["20.04.26", 87.07, 656.9, 86.2], ["27.04.26", 87.99, 667.1, 69.8], ["04.05.26", 87.27, 677.4, 82.6], ["11.05.26", 85.9, 687.6, 107.1], ["25.05.26", 82.7, 708.0, 164.2]],s=document.getElementById('fc-svg');if(!s)return;
const hit=document.getElementById('fc-hit'),x=document.getElementById('fc-x'),c=document.getElementById('fc-hov'),tip=document.getElementById('fc-tip');
function mv(e){const r=s.getBoundingClientRect(),k=720/r.width,px=(e.clientX-r.left)*k;let b=P[0];for(const p of P)if(Math.abs(p[2]-px)<Math.abs(b[2]-px))b=p;
x.setAttribute('x1',b[2]);x.setAttribute('x2',b[2]);c.setAttribute('cx',b[2]);c.setAttribute('cy',b[3]);x.hidden=c.hidden=tip.hidden=false;
tip.innerHTML='<b>'+b[1].toFixed(1).replace('.',',')+' kg</b>Woche ab '+b[0];tip.style.left=(b[2]/k)+'px';tip.style.top=(b[3]/k)+'px';}
function out(){x.hidden=c.hidden=tip.hidden=true}
hit.addEventListener('pointermove',mv);hit.addEventListener('pointerdown',mv);hit.addEventListener('pointerleave',out);})();

(function(){var imgs=document.querySelectorAll('#res-img2 img'),btns=document.querySelectorAll('#res-tabs2 button');
btns.forEach(function(b,i){b.addEventListener('click',function(){btns.forEach(function(x,j){x.setAttribute('aria-pressed',j===i);imgs[j].classList.toggle('on',j===i);});});});})();
