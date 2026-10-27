(function(){
  var acts=[["Ausdauer (Radfahren, Joggen, Crosstrainer)",7],["Fitnesskurse (Aerobic, Zumba)",6],["Krafttraining",5],["Kampfsport",8],["Klettern, Bouldern",7.5],["Mountainbiking",8.5],["Schwimmen",7],["Seilspringen",11],["Teamsport (Fußball, Basketball)",7.5],["Tennis, Squash",7.3],["Walking",3.8],["Yoga",2.8]];
  var mins=[15,30,45,60,75,90,120,150,180,240];
  var box=document.getElementById('acts');
  acts.forEach(function(a,i){
    var d='<option value="0">0</option>';for(var k=1;k<=7;k++)d+='<option value="'+k+'">'+k+'</option>';
    var m='';mins.forEach(function(x){m+='<option value="'+x+'"'+(x==60?' selected':'')+'>'+(x<60?x+' min':(x%60?Math.floor(x/60)+' h '+x%60+' min':x/60+' h'))+'</option>';});
    var r=document.createElement('div');r.className='act';
    r.innerHTML='<span>'+a[0]+'</span><select aria-label="Tage pro Woche: '+a[0]+'" data-i="'+i+'" class="d">'+d+'</select><select aria-label="Dauer pro Tag: '+a[0]+'" class="m">'+m+'</select>';
    box.appendChild(r);
  });
  var $=function(id){return document.getElementById(id)};
  var fmt=function(n,u){return Math.round(n).toLocaleString('de-DE')+' '+u};
  $('calc').addEventListener('submit',function(e){
    e.preventDefault();
    var sex=$('c-sex').value,h=+$('c-h').value,w=+$('c-w').value,age=+$('c-a').value,bf=$('c-bf').value===''?null:+$('c-bf').value;
    var pal=+$('c-pal').value,goal=+$('c-goal').value,prot=$('c-prot').value,err=$('c-err');
    if(!sex||!pal||!goal||!prot||!(h>=120&&h<=230)||!(w>=35&&w<=250)||!(age>=16&&age<=80)||(bf!==null&&!(bf>=4&&bf<=60))){
      err.textContent='Bitte prüfe Deine Eingaben auf Vollständigkeit. Größe 120–230 cm, Gewicht 35–250 kg, Alter 16–80 Jahre.';
      $('c-res').classList.remove('show');return;
    }
    err.textContent='';
    var fat=bf;
    if(fat===null){var bmi=w/Math.pow(h/100,2);fat=Math.min(50,Math.max(5,1.2*bmi+0.23*age-10.8*(sex==='m'?1:0)-5.4));}
    var ffm=w*(1-fat/100);
    var bmr=bf!==null?370+21.6*ffm:10*w+6.25*h-5*age+(sex==='m'?5:-161);
    var work=bmr*(pal-1);
    var sport=0,ds=box.querySelectorAll('.d'),ms=box.querySelectorAll('.m');
    acts.forEach(function(a,i){sport+=(a[1]-1)*w*(+ds[i].value*(+ms[i].value/60))/7;});
    var target=(bmr+work+sport)*goal,floored=false;
    if(target<bmr){target=bmr;floored=true;}
    var p=prot.split('|'),pg=(p[0]==='kg'?w:ffm)*(+p[1]);
    var fLo=sex==='m'?0.6*w:w,fHi=fLo;
    var cHi=Math.max(0,(target-pg*4-fLo*9)/4),cLo=Math.max(0,(target-pg*4-fHi*9)/4);
    function rng(a,b,u){return Math.round(a)===Math.round(b)?fmt(a,u):Math.round(a).toLocaleString('de-DE')+'–'+fmt(b,u)}
    $('r-bmr').textContent=fmt(bmr,'kcal');$('r-work').textContent=fmt(work,'kcal');$('r-sport').textContent=fmt(sport,'kcal');
    $('r-goal').textContent=fmt(target,'kcal');$('r-p').textContent=fmt(pg,'g');$('r-f').textContent=rng(fLo,fHi,'g');$('r-c').textContent=rng(cLo,cHi,'g');
    var note=[];
    if(bf===null)note.push('Ohne Angabe wurde Dein Körperfettanteil geschätzt. Mit einem gemessenen Wert wird das Ergebnis genauer.');
    if(target-pg*4-fHi*9<0)note.push('Bei dieser Zielzufuhr bleibt nach Eiweiß und Fett wenig Spielraum für Kohlenhydrate.');
    if(floored)note.push('Die Zielzufuhr wurde auf Deinen Grundumsatz begrenzt. Wir empfehlen, nicht darunter zu essen.');
    $('r-note').textContent=note.join(' ');
    var res=$('c-res');res.classList.add('show');
    if(window.matchMedia('(max-width:899px)').matches)res.scrollIntoView({behavior:'smooth',block:'start'});
  });

})();

(function(){
  var $=function(id){return document.getElementById(id)};
  /* Hilfe zum Körperfettanteil */
  var dlg=$('bf-dlg'),grid=$('bf-grid');
  var DATA={m:[[10,'Sehr definiert'],[15,'Definiert'],[20,'Fit'],[25,'Weicher'],[30,'Mehr Bauchumfang'],[35,'Hoch']],
            w:[[15,'Sehr definiert'],[20,'Sportlich'],[25,'Fit'],[30,'Weicher'],[35,'Mehr Bauch- und Hüftumfang'],[40,'Hoch']]};
  function fig(sex,bf){
    var m=sex==='m',c=50,s,w,h;
    if(m){s=23;w=Math.min(27,14+(bf-10)*.5);h=16+(bf-10)*.4}else{s=18;w=11+(bf-15)*.5;h=18+(bf-15)*.5}
    var aw=(m?9:7)+(bf-(m?10:15))*.1;
    var torso='M'+(c-s)+' 38L'+(c+s)+' 38C'+(c+s)+' 62 '+(c+w)+' 72 '+(c+w)+' 90L'+(c+h)+' 114L'+(c-h)+' 114L'+(c-w)+' 90C'+(c-w)+' 72 '+(c-s)+' 62 '+(c-s)+' 38Z';
    return '<svg viewBox="0 0 100 160" aria-hidden="true" fill="currentColor"><circle cx="50" cy="18" r="11"/><rect x="44" y="27" width="12" height="13" rx="3"/><path d="'+torso+'"/>'+
      '<path d="M'+(c-s-2)+' 44L'+(c-s-9)+' 100M'+(c+s+2)+' 44L'+(c+s+9)+' 100" stroke="currentColor" stroke-width="'+aw.toFixed(1)+'" stroke-linecap="round" fill="none"/>'+
      '<rect x="'+(c-h+1)+'" y="110" width="'+(h-3)+'" height="46" rx="5"/><rect x="'+(c+2)+'" y="110" width="'+(h-3)+'" height="46" rx="5"/></svg>';
  }
  function close(){if(dlg.close)dlg.close();else dlg.removeAttribute('open')}
  var ZONES={m:[[3,5],[6,10],[11,15],[16,20],[21,25],[26,30],[31,35],[36,40],[41,45]],
             w:[[10,13],[14,17],[18,20],[21,24],[25,30],[31,35],[36,40],[41,45],[50,50]]};
  var IMG={m:'man.jpg',w:'woman.jpg'};
  function mid(z){return Math.round((z[0]+z[1])/2*2)/2}
  function lbl(z){return z[0]===z[1]?z[0]+' %':z[0]+'–'+z[1]+' %'}
  function chart(sex){
    var zs=ZONES[sex].map(function(z){return '<button type="button" class="bf-zone" data-v="'+mid(z)+'" aria-label="Körperfett '+lbl(z)+' übernehmen" title="'+lbl(z)+'"></button>'}).join('');
    return '<div class="bf-chart"><img src="'+IMG[sex]+'" width="870" height="1110" alt="Beispielbilder für Körperfettanteile bei '+(sex==='m'?'Männern von 3 bis 45':'Frauen von 10 bis 50')+' Prozent"><div class="bf-zones">'+zs+'</div></div>';
  }
  function cards(sex){
    return '<div class="bf-grid">'+DATA[sex].map(function(d){return '<button type="button" class="bf-card" data-v="'+d[0]+'">'+fig(sex,d[0])+'<b>'+d[0]+' %</b><span>'+d[1]+'</span></button>'}).join('')+'</div>';
  }
  $('bf-help').addEventListener('click',function(){
    var sex=$('c-sex').value;
    if(!sex){$('c-err').textContent='Bitte wähle zuerst Dein Geschlecht aus, dann zeigen wir Dir die passenden Beispielbilder.';$('c-sex').focus();return}
    $('c-err').textContent='';
    $('bf-title').textContent='Körperfettanteil abschätzen ('+(sex==='m'?'Männer':'Frauen')+')';
    grid.innerHTML=chart(sex);
    grid.querySelector('img').addEventListener('error',function(){grid.innerHTML=cards(sex)});
    if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
  });
  grid.addEventListener('click',function(e){var b=e.target.closest('.bf-zone,.bf-card');if(!b)return;$('c-bf').value=b.dataset.v;close();$('c-bf').focus()});
  $('bf-close').addEventListener('click',close);
  dlg.addEventListener('click',function(e){if(e.target===dlg)close()});
})();
