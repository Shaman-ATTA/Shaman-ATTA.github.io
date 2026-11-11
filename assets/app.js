(function(){
"use strict";
/* ---------- i18n ---------- */
var RU={
 "skip":"Перейти к содержимому","menu":"Меню",
 "nav.home":"Главная","nav.games":"Игры","nav.about":"О студии","nav.beta":"Бета-тест","nav.contact":"Контакты",
 "home.eyebrow":"Инди-студия мобильных игр",
 "home.tagline":"Инди-игры, в которые легко начать играть и трудно оторваться",
 "home.cta":"Наши игры →","home.cta2":"Вступить в бета-тест",
 "home.bfmini":"В Google Play","home.csmini":"На тестировании — вступай в бету",
 "games.eyebrow":"Наши игры","games.title":"Маленькие игры, большое «ещё один уровень»",
 "games.lead":"Спокойные и умные головоломки, в которые можно играть где угодно — даже без интернета.",
 "games.live":"Уже в Google Play","games.testing":"На тестировании — вступай в бету",
 "games.bf.desc":"Проведи одну линию через все блоки. Правила понятны сразу, а глубина удивляет — от расслабляющих разминок до головоломок, ломающих мозг.",
 "games.cs.desc":"Расслабляющая цветовая головоломка. Нажимай на плитки, меняй их цвета и собирай нужный узор. Мягкие палитры, никаких таймеров — только поток.",
 "games.play":"Скачать в Google Play","games.beta":"Вступить в бета-тест",
 "chip.levels":"2000 уровней","chip.offline":"Без интернета","chip.daily":"Ежедневная головоломка","chip.hints":"Подсказки",
 "chip.color":"Цветовая головоломка","chip.relax":"Расслабляет","chip.enru":"EN / RU",
 "about.eyebrow":"О студии","about.title":"Мы делаем головоломки, которые ценят ваше время",
 "about.lead":"ATTA CORP — независимая мобильная студия. Мы создаём казуальные головоломки, которые запускаются за секунды, работают без интернета и не надоедают месяцами. Каждую игру придумывает, делает и шлифует небольшая команда, которая сама играет в них каждый день.",
 "about.f1":"Легко начать","about.f1d":"Без длинных обучений и регистраций. Открыл игру — и уже играешь.",
 "about.f2":"Работает офлайн","about.f2d":"В самолёте, в метро или в горах — наши игры просто работают.",
 "about.f3":"Вместе с игроками","about.f3d":"Мы рано тестируем игры с сообществом и выпускаем обновления по вашим отзывам.",
 "beta.eyebrow":"Ищем тестировщиков","beta.title":"Играй в Chroma Shift раньше всех",
 "beta.lead":"Chroma Shift проходит закрытое тестирование в Google Play. Вступай в бету, играй бесплатно и помоги нам сделать финальную версию. Пожалуйста, не удаляй игру хотя бы 14 дней — это помогает нам выйти в релиз.",
 "beta.s1":"Вступи в группу тестировщиков","beta.s1d":"Открой Google-группу под тем Google-аккаунтом, который стоит на телефоне, и нажми «Вступить в группу».","beta.s1b":"Открыть группу",
 "beta.s2":"Стань тестировщиком и установи","beta.s2d":"Открой ссылку на тест, нажми «Стать тестировщиком» и установи Chroma Shift из Google Play.","beta.s2b":"Стать тестировщиком",
 "beta.note":"Зачем тестировать? Ты получаешь игру первым, твои идеи могут попасть в релиз, и ты помогаешь инди-студии выйти в Google Play. Отзывы: <a href=\"mailto:gamerazrabplay@gmail.com\">gamerazrabplay@gmail.com</a>",
 "contact.eyebrow":"Контакты","contact.title":"Напиши нам",
 "contact.lead":"Вопросы, отзывы, сообщения об ошибках или сотрудничество — пиши:",
 "contact.write":"Написать письмо","contact.privacy":"Политика конфиденциальности",
 "footer":"© 2026 ATTA CORP. В Google Play — разработчик ATTA."
};
var TITLES={en:"ATTA CORP — Indie Mobile Puzzle Games",ru:"ATTA CORP — инди-головоломки для телефона"};
var EN={};
var nodes=document.querySelectorAll("[data-i18n],[data-i18n-html]");
nodes.forEach(function(n){var k=n.getAttribute("data-i18n");if(k)EN[k]=n.textContent;else{k=n.getAttribute("data-i18n-html");EN[k]=n.innerHTML;}});
function setLang(l){
  if(l!=="ru")l="en";
  var d=l==="ru"?RU:EN;
  nodes.forEach(function(n){var k=n.getAttribute("data-i18n");if(k){if(d[k]!=null)n.textContent=d[k];}else{k=n.getAttribute("data-i18n-html");if(d[k]!=null)n.innerHTML=d[k];}});
  document.documentElement.lang=l;document.title=TITLES[l];
  document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.lang===l));});
  try{localStorage.setItem("atta-lang",l);}catch(e){}
}
document.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){setLang(b.dataset.lang);});});
var saved=null;try{saved=localStorage.getItem("atta-lang");}catch(e){}
setLang(saved||"en");

/* ---------- hash routing ---------- */
var VIEWS=["home","games","about","beta","contact"];
var tabs=document.getElementById("tabs"),menuBtn=document.querySelector(".menu-btn");
function route(first){
  var h=(location.hash||"#home").slice(1);
  if(h==="testers")h="beta";
  if(VIEWS.indexOf(h)<0)h="home";
  VIEWS.forEach(function(v){var el=document.getElementById("view-"+v);el.classList.toggle("active",v===h);});
  document.querySelectorAll(".tabs a").forEach(function(a){if(a.getAttribute("href")==="#"+h)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  closeMenu();
  if(!first){window.scrollTo(0,0);var hd=document.querySelector("#view-"+h+" h1, #view-"+h+" h2");if(hd){hd.setAttribute("tabindex","-1");hd.focus({preventScroll:true});}}
}
function closeMenu(){tabs.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");}
menuBtn.addEventListener("click",function(){var o=!tabs.classList.contains("open");tabs.classList.toggle("open",o);menuBtn.setAttribute("aria-expanded",String(o));});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu();});
document.addEventListener("click",function(e){if(!e.target.closest(".nav"))closeMenu();});
window.addEventListener("hashchange",function(){route(false);});
route(true);

/* ---------- animated background ---------- */
var cv=document.getElementById("bg"),ctx=cv.getContext("2d");
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
var COLORS=["#7c6cff","#00d2c8","#ffcf6a","#ff6f73","#7ad0a8","#6a8bf0","#ff7ac8"];
var W=0,H=0,DPR=1,CELL=64,cols=0,rows=0,blocks=[],sprites={},path=null,raf=0,last=0,t0=performance.now();

function sprite(color,size){
  var key=color+size;if(sprites[key])return sprites[key];
  var pad=size*0.9,s=Math.ceil((size+pad*2)*DPR),c=document.createElement("canvas");c.width=c.height=s;
  var g=c.getContext("2d");g.scale(DPR,DPR);
  g.shadowColor=color;g.shadowBlur=size*0.8;g.fillStyle=color;
  var r=size*0.26,x=pad,y=pad;
  g.beginPath();g.moveTo(x+r,y);g.arcTo(x+size,y,x+size,y+size,r);g.arcTo(x+size,y+size,x,y+size,r);g.arcTo(x,y+size,x,y,r);g.arcTo(x,y,x+size,y,r);g.closePath();
  g.globalAlpha=0.9;g.fill();g.shadowBlur=0;g.globalAlpha=0.25;g.fillStyle="#fff";g.fillRect(x+size*0.18,y+size*0.14,size*0.4,size*0.1);
  sprites[key]={c:c,off:pad};return sprites[key];
}
function resize(){
  DPR=Math.min(window.devicePixelRatio||1,1.75);
  W=window.innerWidth;H=window.innerHeight;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  ctx.setTransform(DPR,0,0,DPR,0,0);
  CELL=W<600?52:68;cols=Math.ceil(W/CELL)+1;rows=Math.ceil(H/CELL)+1;
  sprites={};
  var n=Math.round(Math.min(28,Math.max(12,W*H/42000)));
  blocks=[];for(var i=0;i<n;i++)blocks.push(newBlock(true));
  path=newPath();
}
function rnd(a,b){return a+Math.random()*(b-a);}
function newBlock(anywhere){
  var size=Math.round(rnd(W<600?16:20,W<600?34:46));
  return{x:rnd(0,W),y:anywhere?rnd(0,H):H+60,size:size,color:COLORS[(Math.random()*COLORS.length)|0],
    vx:rnd(-6,6),vy:rnd(-14,-5),rot:rnd(0,6.28),vr:rnd(-.15,.15),ph:rnd(0,6.28),a:rnd(.25,.6)};
}
/* Block Fill style: a snake path through grid cells, drawn progressively */
function newPath(){
  var cx=(Math.random()*(cols-2)+1)|0,cy=(Math.random()*(rows-2)+1)|0,pts=[[cx,cy]],seen={},len=(rnd(10,20))|0;
  seen[cx+","+cy]=1;
  for(var i=0;i<len;i++){
    var dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(function(d){var nx=cx+d[0],ny=cy+d[1];return nx>=0&&ny>=0&&nx<cols&&ny<rows&&!seen[nx+","+ny];});
    if(!dirs.length)break;var d=dirs[(Math.random()*dirs.length)|0];cx+=d[0];cy+=d[1];seen[cx+","+cy]=1;pts.push([cx,cy]);
  }
  return{pts:pts,p:0,speed:rnd(2.2,3.4),hold:0,fade:1,color:COLORS[(Math.random()*COLORS.length)|0]};
}
function cellC(p){return[p[0]*CELL+CELL/2-CELL/2,p[1]*CELL+CELL/2-CELL/2];}

function frame(now){
  var dt=Math.min(.05,(now-(last||now))/1000);last=now;
  var t=(now-t0)/1000;
  ctx.clearRect(0,0,W,H);
  /* Chroma Shift: color-shifting gradient glow */
  var hue=(t*8)%360;
  var blobs=[[.2+.08*Math.sin(t*.13),.25+.06*Math.cos(t*.11),0],[.85+.06*Math.cos(t*.09),.7+.08*Math.sin(t*.12),120],[.6+.1*Math.sin(t*.07),.05+.05*Math.cos(t*.1),240]];
  var R=Math.max(W,H)*.65;
  for(var b=0;b<3;b++){
    var bx=blobs[b][0]*W,by=blobs[b][1]*H,g=ctx.createRadialGradient(bx,by,0,bx,by,R);
    g.addColorStop(0,"hsla("+((hue+blobs[b][2])%360)+",80%,55%,.22)");g.addColorStop(1,"hsla("+((hue+blobs[b][2])%360)+",80%,40%,0)");
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }
  /* grid cells */
  ctx.strokeStyle="rgba(255,255,255,.045)";ctx.lineWidth=1;ctx.beginPath();
  for(var x=0;x<=cols;x++){ctx.moveTo(x*CELL+.5,0);ctx.lineTo(x*CELL+.5,H);}
  for(var y=0;y<=rows;y++){ctx.moveTo(0,y*CELL+.5);ctx.lineTo(W,y*CELL+.5);}
  ctx.stroke();
  /* connecting line */
  drawPath(dt);
  /* drifting glowing blocks */
  for(var i=0;i<blocks.length;i++){
    var k=blocks[i];k.x+=k.vx*dt;k.y+=k.vy*dt;k.rot+=k.vr*dt;
    if(k.y<-80||k.x<-80||k.x>W+80){blocks[i]=newBlock(false);continue;}
    var s=sprite(k.color,k.size);
    ctx.save();ctx.globalAlpha=k.a*(.75+.25*Math.sin(t*.8+k.ph));ctx.translate(k.x,k.y);ctx.rotate(k.rot);
    ctx.drawImage(s.c,-(k.size/2+s.off),-(k.size/2+s.off),k.size+s.off*2,k.size+s.off*2);ctx.restore();
  }
  ctx.globalAlpha=1;
}
function drawPath(dt){
  var P=path,n=P.pts.length;if(n<2)return;
  if(P.p<n-1)P.p=Math.min(n-1,P.p+P.speed*dt);else if(P.hold<1.6)P.hold+=dt;else{P.fade-=dt*.8;if(P.fade<=0){path=newPath();return;}}
  var whole=Math.floor(P.p),frac=P.p-whole,half=CELL/2,pad=CELL*.14;
  ctx.globalAlpha=.16*P.fade;ctx.fillStyle=P.color;
  for(var i=0;i<=whole;i++){var c=P.pts[i];roundRect(c[0]*CELL+pad,c[1]*CELL+pad,CELL-pad*2,CELL-pad*2,CELL*.2);ctx.fill();}
  ctx.globalAlpha=.55*P.fade;ctx.strokeStyle=P.color;ctx.lineWidth=Math.max(4,CELL*.12);ctx.lineCap="round";ctx.lineJoin="round";
  ctx.shadowColor=P.color;ctx.shadowBlur=14;
  ctx.beginPath();ctx.moveTo(P.pts[0][0]*CELL+half,P.pts[0][1]*CELL+half);
  for(i=1;i<=whole;i++)ctx.lineTo(P.pts[i][0]*CELL+half,P.pts[i][1]*CELL+half);
  var hx,hy;
  if(whole<n-1){var a=P.pts[whole],b=P.pts[whole+1];hx=(a[0]+(b[0]-a[0])*frac)*CELL+half;hy=(a[1]+(b[1]-a[1])*frac)*CELL+half;ctx.lineTo(hx,hy);}
  else{hx=P.pts[n-1][0]*CELL+half;hy=P.pts[n-1][1]*CELL+half;}
  ctx.stroke();ctx.shadowBlur=0;
  ctx.globalAlpha=.8*P.fade;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(hx,hy,Math.max(4,CELL*.1),0,6.283);ctx.fill();
  ctx.globalAlpha=1;
}
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}

function loop(now){frame(now);raf=requestAnimationFrame(loop);}
function start(){stop();last=0;if(reduce.matches||document.hidden){if(reduce.matches){path.p=path.pts.length-1;frame(performance.now());}return;}raf=requestAnimationFrame(loop);}
function stop(){if(raf)cancelAnimationFrame(raf);raf=0;}
var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){resize();start();},150);});
document.addEventListener("visibilitychange",function(){if(document.hidden)stop();else start();});
if(reduce.addEventListener)reduce.addEventListener("change",start);
resize();start();
})();
