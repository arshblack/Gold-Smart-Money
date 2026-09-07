/* Adapted from the supplied Refined Liquidity Visual Labs prototype. */
(() => {

"use strict";
var firstLab=document.querySelector('.learning-lab');if(!firstLab)return;var CS=getComputedStyle(firstLab);
function v(n){return CS.getPropertyValue(n).trim();}
var COL={ink:v('--cndl'),gold:v('--gold'),goldb:v('--goldb'),aqua:v('--aqua'),amber:v('--amber'),say:v('--say'),faint:v('--faint'),line:v('--line2')};
function el(t,a){var e=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)e.setAttribute(k,a[k]);return e;}

/* ---------- shared candle renderer ---------- */
function drawCandles(svg,data,opt){
  while(svg.firstChild)svg.removeChild(svg.firstChild);
  var vb=svg.getAttribute('viewBox').split(' ').map(Number),W=vb[2],H=vb[3];
  var pL=opt.padL||40,pR=opt.padR||16,pT=opt.padT||24,pB=opt.padB||30;
  var dom=opt.domain,n=data.length;
  function y(p){return H-pB-(p-dom[0])*((H-pT-pB)/(dom[1]-dom[0]));}
  var step=(W-pL-pR)/n, bw=Math.min(step*0.44,26);
  function cx(i){return pL+step*(i+0.5);}
  var upto=opt.upto==null?n:opt.upto;
  // pullback box (Lab C)
  if(opt.box){var b=opt.box;svg.appendChild(el('rect',{x:cx(b[0])-step*0.5,y:pT,width:step*(b[1]-b[0]+1),height:H-pT-pB,fill:v('--aquasoft'),stroke:COL.aqua,'stroke-dasharray':'3 4','stroke-width':1,rx:6}));}
  // level line
  if(opt.level!=null){
    var ly=y(opt.level);
    svg.appendChild(el('line',{x1:pL,y1:ly,x2:W-pR,y2:ly,stroke:COL.gold,'stroke-width':1.4,'stroke-dasharray':'6 5',opacity:.9}));
    var t=el('text',{x:W-pR,y:ly-6,'text-anchor':'end',fill:COL.goldb,'font-family':v('--mono'),'font-size':12});t.textContent=opt.levelLabel||'EQH1';svg.appendChild(t);
  }
  for(var i=0;i<upto;i++){
    var d=data[i],up=d.c>=d.o,X=cx(i);
    var isFollow=opt.followFrom!=null&&i>=opt.followFrom;
    var body=isFollow?COL.faint:COL.ink;
    svg.appendChild(el('line',{x1:X,y1:y(d.h),x2:X,y2:y(d.l),stroke:body,'stroke-width':1.4}));
    var top=y(Math.max(d.o,d.c)),bot=y(Math.min(d.o,d.c)),hgt=Math.max(bot-top,1.5);
    svg.appendChild(el('rect',{x:X-bw/2,y:top,width:bw,height:hgt,rx:1.5,fill:up?v('--panel'):body,stroke:body,'stroke-width':1.4}));
    // highlight reach wick above level
    if(opt.hi!=null&&i===opt.hi&&opt.level!=null&&d.h>opt.level&&opt.hiStep>=1){
      svg.appendChild(el('line',{x1:X,y1:y(opt.level),x2:X,y2:y(d.h),stroke:COL.gold,'stroke-width':3.4,'stroke-linecap':'round'}));
      var m=el('circle',{cx:X,cy:y(d.h),r:3.4,fill:COL.goldb});svg.appendChild(m);
    }
    // close marker
    if(opt.hi!=null&&i===opt.hi&&opt.hiStep>=2){
      var cy=y(d.c),clr=(opt.level!=null&&d.c>opt.level)?COL.amber:COL.aqua;
      svg.appendChild(el('line',{x1:X-bw/2-4,y1:cy,x2:X+bw/2+4,y2:cy,stroke:clr,'stroke-width':2.2}));
    }
  }
  // follow-through arrow (Lab A step3)
  if(opt.arrow&&upto>opt.followFrom+1){
    var a0=data[opt.followFrom],a1=data[upto-1],x0=cx(opt.followFrom),x1=cx(upto-1);
    var dir=a1.c<a0.o?1:-1, clr=opt.arrowColor||COL.aqua;
    var ay0=y(a0.o),ay1=y(a1.c);
    var g=el('line',{x1:x0,y1:ay0,x2:x1,y2:ay1,stroke:clr,'stroke-width':2,'stroke-dasharray':'2 4',opacity:.85});svg.appendChild(g);
  }
}

/* ---------- LAB A ---------- */
var Abase=[{o:60,h:66,l:56,c:58},{o:58,h:63,l:55,c:62},{o:62,h:68,l:60,c:61},{o:61,h:71,l:59,c:66},{o:66,h:73,l:64,c:69}];
var Areach={A:{o:69,h:88,l:67,c:72},B:{o:69,h:78,l:67,c:72},C:{o:69,h:90,l:68,c:85},D:{o:69,h:88,l:67,c:72}};
var Afollow={
  A:[{o:72,h:73,l:64,c:65},{o:65,h:66,l:56,c:57},{o:57,h:58,l:49,c:51}],
  B:[{o:72,h:73,l:64,c:65},{o:65,h:66,l:56,c:57},{o:57,h:58,l:49,c:51}],
  C:[{o:85,h:92,l:84,c:90},{o:90,h:95,l:88,c:93},{o:93,h:96,l:90,c:94}],
  D:[{o:72,h:75,l:69,c:71},{o:71,h:74,l:68,c:70},{o:70,h:73,l:68,c:72}]
};
var Ameta={
  A:{wick:'pass',close:'pass',follow:'pass',tag:'pass',tl:'Passes all three',
     wv:'reached beyond',cv:'closed back below',fv:'moved away',
     txt:'Wick beyond <span class="mono">EQH1</span>, close back below, and price moved down and away. A complete three-part observation — which is not the same as a guarantee.'},
  B:{wick:'fail',close:'none',follow:'none',tag:'fail',tl:'Fails part 1 — the wick',
     wv:'never reached',cv:'says nothing',fv:'says nothing',
     txt:'The rejection looks <em>better</em> than A’s — and price never touched the orders above <span class="mono">EQH1</span>. The most seductive failure of the four: the prettiest candle is the one that isn’t a sweep at all.'},
  C:{wick:'pass',close:'fail',follow:'none',tag:'fail',tl:'Fails part 2 — the close',
     wv:'reached beyond',cv:'closed above',fv:'says nothing',
     txt:'Price closed <em>above</em> the level. Read forwards, at the time, this is a breakout — a different event. Calling it a failed sweep later, once it came back, is the backwards reasoning the test exists to prevent.'},
  D:{wick:'pass',close:'pass',follow:'none',tag:'expire',tl:'Fails part 3 — follow-through',
     wv:'reached beyond',cv:'closed back below',fv:'nothing followed',
     txt:'Textbook shape — then hours of chop inside the range. The setup <b>expired</b>. Not a loss, not a missed trade, not evidence the test failed. A test that returns “nothing here” is doing its job.'}
};
var Astate={c:'A',s:1};
function renderA(){
  var m=Ameta[Astate.c],cand=Astate.c,step=Astate.s;
  var data=Abase.concat([Areach[cand]]);
  var followFrom=data.length;
  if(step>=3)data=data.concat(Afollow[cand]);
  var allP=data.reduce(function(a,d){return{mn:Math.min(a.mn,d.l),mx:Math.max(a.mx,d.h)};},{mn:99,mx:0});
  drawCandles(document.getElementById('Asvg'),data,{
    domain:[44,100],level:80,levelLabel:'EQH1',hi:5,hiStep:step,
    followFrom:step>=3?followFrom:null,arrow:step>=3&&cand!=='B',arrowColor:cand==='C'?COL.amber:(cand==='D'?COL.say:COL.aqua)
  });
  // parts
  function setP(id,el2,val,txtEl,txt){var st=(step<({wick:1,close:2,follow:3})[id])?'idle':val;
    document.querySelector('[data-p="'+id+'"]').setAttribute('data-s',st==='idle'?'idle':st);
    txtEl.textContent=(st==='idle')?'—':txt;}
  setP('wick','',m.wick,document.getElementById('Awv'),m.wv);
  setP('close','',m.close,document.getElementById('Acv'),m.cv);
  setP('follow','',m.follow,document.getElementById('Afv'),m.fv);
  var vt=document.getElementById('Averdict');
  if(step>=3){vt.innerHTML='<span class="tag '+(m.tag)+'">'+m.tl+'</span>'+m.txt;}
  else{vt.innerHTML='<span style="color:var(--faint);font-family:var(--mono);font-size:12px">Reveal part '+(step+1<=3?step+1:3)+' to continue…</span>';}
}
seg('Acand','c',function(x){Astate.c=x;Astate.s=1;setSeg('Astep','1');renderA();});
seg('Astep','s2',function(x){Astate.s=+x;renderA();},'data-s');

/* ---------- LAB B ---------- */
function renderB(){
  var svg=document.getElementById('Bsvg');
  var data=[{o:55,h:60,l:53,c:57},{o:57,h:62,l:55,c:60},{o:60,h:88,l:58,c:64},{o:64,h:66,l:55,c:57},{o:57,h:59,l:49,c:51}];
  drawCandles(svg,data,{domain:[45,94],level:80,levelLabel:'EQH1',hi:2,hiStep:3,padL:36});
}
var Btexts={
  A:'Institutions swept the highs <span class="unver">to fill short orders</span> and are now <span class="unver">driving price down</span>. The move up was <span class="unver">fake</span> — <span class="unver">the real move</span> is the one that followed.',
  B:'Price reached beyond an obvious pool and did not sustain above it. Structure is intact, and this is consistent with continuation lower. It is invalidated by a close back above <span class="mono">EQH1</span>.'
};
function setB(r){
  var t=document.getElementById('Btext');
  t.className='reading'+(r==='B'?' obs':'');
  t.innerHTML=Btexts[r];
  var c=document.getElementById('Bcount');
  if(r==='A')c.innerHTML='<b>4 highlighted phrases</b> describe things not in the candle. None can be checked by someone who disagrees with you.';
  else c.innerHTML='<b>Every clause here is checkable</b> against the chart — direction, condition, invalidation. It lost the story and kept the information.';
}
seg('Bread','r',function(x){setB(x);});

/* ---------- LAB C ---------- */
var CM=[{o:70,h:74,l:68,c:69},{o:69,h:72,l:64,c:65},{o:65,h:68,l:60,c:61},{o:61,h:64,l:57,c:58},{o:58,h:61,l:54,c:56}];
var CH=[{o:40,h:46,l:38,c:45},{o:45,h:53,l:43,c:51},{o:51,h:54,l:46,c:47},{o:47,h:49,l:42,c:44},{o:44,h:48,l:41,c:47}];
function renderC(){
  drawCandles(document.getElementById('CsvgM'),CM,{domain:[50,78],padL:24,padR:12,padT:16,padB:22});
  drawCandles(document.getElementById('CsvgH'),CH,{domain:[36,58],padL:24,padR:12,padT:16,padB:22,level:42,levelLabel:'HL1',box:[2,4]});
}
function setC(on){
  document.getElementById('CpaneH').setAttribute('aria-hidden',String(!on));
  document.getElementById('CpaneH').className='pane '+(on?'live':'dim');
  document.getElementById('Ccap').innerHTML=on
    ?'Zoom out: those M15 candles are the <b style="color:var(--aquab)">pullback</b> inside an H1 uptrend, resting on <span class="mono">HL1</span>. The bias was up the whole time.'
    :'On M15 alone: lower highs, lower lows — it <em>looks</em> like a downtrend. But an M15 chart can’t show what the move is part of.';
}
seg('Cctx','x',function(x){setC(x==='on');});
seg('Cwc','w',function(w){
  var e=document.getElementById('Cwcv');CH[4]=w==='wick'?{o:44,h:48,l:41,c:47}:{o:44,h:46,l:38,c:39};renderC();
  if(w==='wick')e.innerHTML='<span style="color:var(--aquab)">bias holds</span> — a wick shows price traded there, not that it closed there.';
  else e.innerHTML='<span style="color:var(--amber)">invalidated</span> — an H1 <em>close</em> below <span class="mono">HL1</span> ends the read.';
});

/* ---------- LAB D ---------- */
function setD(d){
  var normal=d==='normal',ny=document.getElementById('Dny'),ovl=document.getElementById('Dovl');
  ny.style.left=normal?'54.1667%':'50%';ny.style.width='33.3333%';ny.textContent=normal?'New York · 13–21':'New York · 12–20';
  ovl.style.left=ny.style.left;ovl.style.width=normal?'12.5%':'16.6667%';
  document.getElementById('Dutc').textContent=normal?'07:00':'08:00';
  document.getElementById('Dbrk').textContent=normal?'09:00':'10:00';
  document.getElementById('Dcpi').textContent=(normal?'13:25':'12:25')+' London · 5 min before CPI';
  document.getElementById('Ddstf').textContent=normal?'Aligned summer example: London is UTC+1, New York UTC−4. Gap: 5 hours.':'Misaligned example: London is UTC+0, New York UTC−4. Gap: 4 hours. Both clock-change gaps use this relationship.';
  document.getElementById('Dsummary').textContent=normal?'Illustrative London-local session bands: Asia 00–09, London 08–16, New York 13–21.':'Illustrative London-local session bands: Asia 00–09, London 08–16, New York 12–20. Asia is held fixed to isolate the London–New York comparison.';
}
seg('Ddst','d',function(x){setD(x);});

function reviewCalendar(){
  var year=new Date().getFullYear();
  function sunday(month,n){var first=new Date(Date.UTC(year,month,1));return 1+(7-first.getUTCDay())%7+7*(n-1);}
  function lastSunday(month){var last=new Date(Date.UTC(year,month+1,0));return last.getUTCDate()-last.getUTCDay();}
  document.getElementById('Dyear').textContent=year;
  document.getElementById('Dspring').textContent=sunday(2,2)+'–'+lastSunday(2)+' Mar';
  document.getElementById('Dautumn').textContent=lastSunday(9)+' Oct–'+sunday(10,1)+' Nov';
  if(year!==2026)document.getElementById('Dreview').textContent='Annual review due: dates recalculated under current UK/US rules; verify those rules and your MT5 offset for '+year+'. Last editorial review: 2026.';
}
/* ---------- LAB E ---------- */
var Efields=[
  {f:'1 · Setup',t:'H1 bias down; M15 reached into EQH1 pool',inv:false},
  {f:'2 · Invalidation',t:'M15 close back above EQH1',inv:true},
  {f:'3 · Why now',t:'Level marked at 06:00, before approach',inv:false},
  {f:'4 · Session / calendar',t:'London, 40 min in. No high-impact data.',inv:false},
  {f:'5 · Risk',t:'My chosen risk budget; size calculated using my broker’s symbol specification',inv:false},
  {f:'6 · What would stop me',t:'Follow-through absent — third time this week',inv:false}
];
var Eon=[0,0,0,0,0,0];
function renderE(){
  var host=document.getElementById('Ejrows');host.innerHTML='';
  Efields.forEach(function(fd,i){
    var row=document.createElement('label');row.className='jrow'+(fd.inv?' invf':'');row.setAttribute('data-on',Eon[i]);
    var check=document.createElement('input');check.type='checkbox';check.checked=!!Eon[i];check.setAttribute('aria-label',fd.f);
    var text=document.createElement('span');text.className='jl';text.innerHTML='<span class="f">'+fd.f+(fd.inv?' · gate':'')+'</span>'+fd.t;
    row.appendChild(check);row.appendChild(text);host.appendChild(row);
    check.addEventListener('change',function(){Eon[i]=check.checked?1:0;row.setAttribute('data-on',Eon[i]);updateEbtn();});
  });
}
function updateEbtn(){
  var b=document.getElementById('Ebtn'),total=Eon.reduce(function(a,c){return a+c;},0);
  if(!Eon[1]){b.setAttribute('data-state','blocked');b.textContent='This setup isn’t ready — no invalidation';}
  else if(total===6){b.setAttribute('data-state','ready');b.textContent='Setup is documented';}
  else{b.setAttribute('data-state','blocked');b.textContent=(6-total)+' field'+(6-total>1?'s':'')+' left';}
}

/* ---------- LAB F ---------- */
var Fstages=[
  {k:'Research setup',x:'A setup identified on TradingView or in analysis. An observation to examine, outside the EA execution record.'},
  {k:'EA confirmed',x:'The MT5 Expert Advisor confirms execution. This is the line where research becomes part of the public record.'},
  {k:'T1 protected',x:'A reporting label for a confirmed first objective or protection event. It does not promise that a target will be reached or specify a stop change.'},
  {k:'T2 managed',x:'A label for a confirmed management event. Read the actual update for what changed; no management rule is implied here.'},
  {k:'T3 / closed',x:'The final stage, or the position closes. The outcome is recorded either way — including when it’s a loss.'},
  {k:'Evidence archived',x:'The completed record is archived, timestamped. A record of what the system did — never a claim about what it will do.'}
];
function renderF(){
  var host=document.getElementById('Fflow');host.innerHTML='';
  Fstages.forEach(function(s,i){
    var b=document.createElement('button');b.className='stg';b.setAttribute('aria-pressed',i===0?'true':'false');
    b.innerHTML='<span class="n">0'+(i+1)+'</span>'+s.k;
    b.addEventListener('click',function(){
      Array.prototype.forEach.call(host.children,function(c){c.setAttribute('aria-pressed','false');});
      b.setAttribute('aria-pressed','true');
      document.getElementById('Fx').textContent=s.x;
    });
    host.appendChild(b);
  });
  document.getElementById('Fx').textContent=Fstages[0].x;
}

/* ---------- seg helper ---------- */
function seg(id,attr,cb,dataAttr){
  var g=document.getElementById(id);if(!g)return;
  Array.prototype.forEach.call(g.querySelectorAll('button'),function(b){
    b.addEventListener('click',function(){
      Array.prototype.forEach.call(g.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed','false');});
      b.setAttribute('aria-pressed','true');
      var key=dataAttr||('data-'+attr.replace(/[0-9]/g,''));
      cb(b.getAttribute(key));
    });
  });
}
function setSeg(id,val){
  var g=document.getElementById(id),bs=g.querySelectorAll('button');
  Array.prototype.forEach.call(bs,function(b){
    var on=b.getAttribute('data-s')===val;b.setAttribute('aria-pressed',on?'true':'false');
  });
}

/* ---------- animated sweep ---------- */
var SWraf=null;
function swRender(s){
  var svg=document.getElementById('SWsvg');while(svg.firstChild)svg.removeChild(svg.firstChild);
  var W=520,H=240,pB=30,pT=22,dom=[44,94],level=78;
  function y(p){return H-pB-(p-dom[0])*((H-pT-pB)/(dom[1]-dom[0]));}
  svg.appendChild(el('line',{x1:30,y1:y(level),x2:W-16,y2:y(level),stroke:COL.gold,'stroke-width':1.4,'stroke-dasharray':'6 5',opacity:.9}));
  var lt=el('text',{x:W-16,y:y(level)-6,'text-anchor':'end',fill:COL.goldb,'font-family':v('--mono'),'font-size':12});lt.textContent='EQH1';svg.appendChild(lt);
  var X=180,bw=26,o=60,c=s.close,h=s.high,l=57;
  svg.appendChild(el('line',{x1:X,y1:y(h),x2:X,y2:y(l),stroke:COL.ink,'stroke-width':1.6}));
  var top=y(Math.max(o,c)),bot=y(Math.min(o,c));
  svg.appendChild(el('rect',{x:X-bw/2,y:top,width:bw,height:Math.max(bot-top,1.5),rx:1.5,fill:(c>=o)?v('--panel'):COL.ink,stroke:COL.ink,'stroke-width':1.6}));
  if(h>level){svg.appendChild(el('line',{x1:X,y1:y(level),x2:X,y2:y(h),stroke:COL.gold,'stroke-width':3.4,'stroke-linecap':'round'}));svg.appendChild(el('circle',{cx:X,cy:y(h),r:3.4,fill:COL.goldb}));}
  if(s.phase>=2){var clr=(c>level)?COL.amber:COL.aqua;svg.appendChild(el('line',{x1:X-bw/2-5,y1:y(c),x2:X+bw/2+5,y2:y(c),stroke:clr,'stroke-width':2.4}));}
  if(s.follow>0){
    var fx=[252,314],fd=[{o:58,h:60,l:50,c:52},{o:52,h:53,l:44,c:46}];
    for(var i=0;i<2;i++){var op=Math.max(0,Math.min(1,(s.follow*2)-i));if(op<=0)continue;
      var d=fd[i],FX=fx[i],g=el('g',{opacity:op});
      g.appendChild(el('line',{x1:FX,y1:y(d.h),x2:FX,y2:y(d.l),stroke:COL.faint,'stroke-width':1.4}));
      var ft=y(Math.max(d.o,d.c)),fb=y(Math.min(d.o,d.c));
      g.appendChild(el('rect',{x:FX-11,y:ft,width:22,height:Math.max(fb-ft,1.5),rx:1.5,fill:COL.faint,stroke:COL.faint}));
      svg.appendChild(g);}
    svg.appendChild(el('line',{x1:198,y1:y(60),x2:322,y2:y(46),stroke:COL.aqua,'stroke-width':2,'stroke-dasharray':'2 4',opacity:s.follow*0.85}));
  }
}
function swCap(ph){document.getElementById('SWcap').textContent=['reaching beyond the level…','closing back below the level…','followed through — a completed shape'][ph];}
function swPlay(){
  if(SWraf)cancelAnimationFrame(SWraf);
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){swRender({high:88,close:60,phase:2,follow:1});swCap(2);return;}
  var t0=performance.now();
  function step(now){
    var t=(now-t0)/1000,st;
    if(t<1.0){var p=t;st={high:62+26*p,close:64,phase:1,follow:0};swCap(0);}
    else if(t<1.8){var p=(t-1)/0.8;st={high:88,close:64-4*p,phase:2,follow:0};swCap(1);}
    else if(t<2.9){var p=(t-1.8)/1.1;st={high:88,close:60,phase:2,follow:p};swCap(2);}
    else{swRender({high:88,close:60,phase:2,follow:1});swCap(2);return;}
    swRender(st);SWraf=requestAnimationFrame(step);
  }
  SWraf=requestAnimationFrame(step);
}

/* Each lesson enhances only its own lab. Static content remains if a script is unavailable. */
if(document.getElementById('SWsvg')){swRender({high:88,close:60,phase:2,follow:1});document.getElementById('SWplay').addEventListener('click',swPlay);}
if(document.getElementById('Asvg')){setSeg('Astep','1');renderA();}
if(document.getElementById('Bsvg')){renderB();setB('A');}
if(document.getElementById('CsvgM')){renderC();setC(false);document.querySelectorAll('#Cctx button').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-x')==='off'));});document.getElementById('Cwcv').textContent='Bias holds — a wick traded beyond HL1 but closed back above.';}
if(document.getElementById('Dny')){setD('normal');reviewCalendar();}
if(document.getElementById('Ejrows')){renderE();updateEbtn();}
if(document.getElementById('Fflow'))renderF();
document.querySelectorAll('.learning-lab').forEach(function(lab){lab.classList.add('enhanced');});

})();
