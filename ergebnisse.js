/* Vorher-nachher-Umschalter: in jeder Karte schalten die Buttons die Bilder derselben Karte */
document.querySelectorAll('.res-card').forEach(function(card){
  var imgs=card.querySelectorAll('.res-img img'),btns=card.querySelectorAll('.tabs button');
  btns.forEach(function(b,i){b.addEventListener('click',function(){
    btns.forEach(function(x,j){x.setAttribute('aria-pressed',j===i);if(imgs[j])imgs[j].classList.toggle('on',j===i);});
  });});
});
/* Gewichtskurven: Wochenwert beim Darüberfahren / Antippen */
document.querySelectorAll('.fc-chart').forEach(function(box){
  var s=box.querySelector('svg'),P=JSON.parse(s.getAttribute('data-points')),hit=s.querySelector('.fc-hit'),x=s.querySelector('.fc-x'),c=s.querySelector('.fc-hov'),tip=box.querySelector('.fc-tip');
  function mv(e){var r=s.getBoundingClientRect(),k=720/r.width,px=(e.clientX-r.left)*k,b=P[0];
    P.forEach(function(p){if(Math.abs(p[2]-px)<Math.abs(b[2]-px))b=p;});
    x.setAttribute('x1',b[2]);x.setAttribute('x2',b[2]);c.setAttribute('cx',b[2]);c.setAttribute('cy',b[3]);x.hidden=c.hidden=tip.hidden=false;
    tip.innerHTML='<b>'+b[1].toFixed(1).replace('.',',')+' kg</b>Woche ab '+b[0];
    var l=b[2]/k;tip.style.left=Math.min(Math.max(l,60),r.width-60)+'px';tip.style.top=(b[3]/k)+'px';}
  function out(){x.hidden=c.hidden=tip.hidden=true;}
  hit.addEventListener('pointermove',mv);hit.addEventListener('pointerdown',mv);hit.addEventListener('pointerleave',out);
});
