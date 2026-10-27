(function(){
  var D=[["Filterkaffee (200 ml)",90],["Espresso (30 ml)",63],["Doppelter Espresso",126],["Energy Drink (250 ml)",80],["Energy Drink (500 ml)",160],["Pre Workout (halbe Portion)",100],["Pre Workout",200],["Pre Workout stark",300],["Schwarzer Tee (200 ml)",45],["Grüner Tee (200 ml)",30],["Cola (330 ml)",35]];
  var $=function(id){return document.getElementById(id)};
  var rows=$('kf-rows');
  function pad(n){return (n<10?'0':'')+n}
  function hm(v){var a=v.split(':');return (+a[0])*60+(+a[1])}
  function clock(m){var x=((m%1440)+1440)%1440;return pad(Math.floor(x/60))+':'+pad(x%60)}
  function addRow(di,n,t){
    var r=document.createElement('div');r.className='krow';
    var o='';D.forEach(function(d,i){o+='<option value="'+d[1]+'"'+(i===di?' selected':'')+'>'+d[0]+' · '+d[1]+' mg</option>'});
    var c='';for(var k=1;k<=6;k++)c+='<option value="'+k+'"'+(k===n?' selected':'')+'>'+k+'×</option>';
    r.innerHTML='<select class="k-d" aria-label="Getränk">'+o+'</select><select class="k-n" aria-label="Anzahl">'+c+'</select><input class="k-t" type="time" value="'+t+'" aria-label="Uhrzeit"><button type="button" class="k-x" aria-label="Getränk entfernen">×</button>';
    r.querySelector('.k-x').addEventListener('click',function(){if(rows.children.length>1)rows.removeChild(r)});
    rows.appendChild(r);
  }
  addRow(0,1,'08:00');
  $('kf-add').addEventListener('click',function(){addRow(0,1,'12:00')});

  $('kf').addEventListener('submit',function(e){
    e.preventDefault();
    var err=$('kf-err'),res=$('kf-res');
    var w=+$('kf-w').value,bedv=$('kf-bed').value,sp=$('kf-sp').value,minor=$('kf-minor').checked;
    var doses=[],bad=false;
    rows.querySelectorAll('.krow').forEach(function(r){
      var tv=r.querySelector('.k-t').value;
      if(!tv){bad=true;return}
      doses.push({t:hm(tv),mg:(+r.querySelector('.k-d').value)*(+r.querySelector('.k-n').value)});
    });
    if(bad||!bedv||!(w>=30&&w<=250)){
      err.textContent='Bitte gib bei jedem Getränk eine Uhrzeit sowie Dein Gewicht (30–250 kg) und Deine Schlafenszeit an.';
      res.classList.remove('show');return;
    }
    err.textContent='';
    var T={n:5.7,r:3.8,p:10,s:10}[sp];
    function conc(t){var x=0;doses.forEach(function(d){if(t>=d.t)x+=d.mg*Math.pow(0.5,(t-d.t)/60/T)});return x}
    var total=0,first=1e9,last=-1;
    doses.forEach(function(d){total+=d.mg;first=Math.min(first,d.t);last=Math.max(last,d.t)});
    var bed=hm(bedv);if(bed<240)bed+=1440;if(bed<last)bed+=1440;
    var atBed=conc(bed);
    var g=last;while(conc(g)>10&&g<last+6000)g+=5;
    var dayLim=sp==='s'?200:(minor?3*w:400),oneLim=sp==='s'?200:(minor?3*w:200);
    var single=doses.some(function(d){return d.mg>oneLim});
    var late=doses.some(function(d){return d.t>bed});
    var days=Math.floor(g/1440);
    $('kr-total').textContent=Math.round(total)+' mg';
    $('kr-bed').textContent=Math.round(atBed)+' mg';
    $('kr-gone').textContent=clock(g)+' Uhr'+(days===1?' (morgen)':days>=2?' (in '+days+' Tagen)':'');
    $('kr-hl').textContent=String(T).replace('.',',')+' h';
    var n=[];
    n.push(atBed>50?'Beim Schlafengehen sind noch rund '+Math.round(atBed)+' mg aktiv. Das kann das Einschlafen und den Tiefschlaf stören. Trink Deinen letzten Kaffee früher.':'Beim Schlafengehen sind nur noch rund '+Math.round(atBed)+' mg aktiv. Das dürfte Deinen Schlaf wenig stören.');
    if(total>dayLim)n.push('Du liegst über dem Richtwert von '+Math.round(dayLim)+' mg pro Tag (EFSA).');
    if(single)n.push('Eine einzelne Aufnahme liegt über '+Math.round(oneLim)+' mg. Verteile Deine Getränke besser über den Tag.');
    if(late)n.push('Getränke nach der Schlafenszeit zählen nicht für den Wert beim Schlafen.');
    $('kr-note').textContent=n.join(' ');

    var x0=Math.max(0,first-60),x1=Math.min(Math.max(g,bed)+60,x0+2880),pts=[],ymax=0,t,c;
    for(t=x0;t<=x1;t+=10){c=conc(t);ymax=Math.max(ymax,c);pts.push([t,c])}
    ymax=Math.max(ymax,20)*1.1;
    var X=function(v){return 40+(v-x0)/(x1-x0)*540},Y=function(v){return 190-v/ymax*170};
    var line=pts.map(function(q,i){return(i?'L':'M')+X(q[0]).toFixed(1)+' '+Y(q[1]).toFixed(1)}).join('');
    var svg='<svg viewBox="0 0 600 230" role="img" aria-label="Verlauf der Koffeinmenge im Körper über den Tag">'+
      '<path class="kc-area" d="'+line+'L'+X(x1).toFixed(1)+' 190L'+X(x0).toFixed(1)+' 190Z"/>'+
      '<line class="kc-axis" x1="40" y1="190" x2="580" y2="190"/>'+
      '<path class="kc-line" d="'+line+'"/>';
    if(bed>=x0&&bed<=x1)svg+='<line class="kc-bed" x1="'+X(bed).toFixed(1)+'" y1="20" x2="'+X(bed).toFixed(1)+'" y2="190"/><text class="kc-t" x="'+X(bed).toFixed(1)+'" y="14" text-anchor="middle">Schlafen</text>';
    svg+='<text class="kc-t" x="40" y="212">'+clock(x0)+'</text><text class="kc-t" x="580" y="212" text-anchor="end">'+clock(x1)+'</text><text class="kc-t" x="36" y="26" text-anchor="end">'+Math.round(ymax/1.1)+' mg</text></svg>';
    $('kf-chart').innerHTML=svg;
    res.classList.add('show');
    if(window.matchMedia('(max-width:899px)').matches)res.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();
