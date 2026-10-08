const $=s=>document.querySelector(s),FREE=2999,fmt=n=>'₹'+n.toLocaleString('en-IN');
const IMG={
 "store": "images/image-01.jpg",
 "clear": "images/image-02.jpg",
 "shade": "images/image-03.jpg",
 "aviator": "images/image-04.jpg",
 "palm": "images/image-05.jpg",
 "lemon": "images/image-06.jpg",
 "woman": "images/image-07.jpg",
 "pink": "images/image-08.jpg",
 "hold": "images/image-09.jpg",
 "flat": "images/image-10.jpg",
 "titan": "images/image-11.jpg"
};
const AR={"store": 0.6666, "aviator": 0.8023, "palm": 0.667, "lemon": 1.4998, "woman": 0.6669, "pink": 1.4985, "hold": 0.8, "flat": 0.6667, "titan": 0.802};
const P=[
 {id:1,n:'Crystal Tortoise',k:'eye',s:'round',p:2499,t:'Bestseller',i:'flat',c:[.5,.23],z:1.1},
 {id:2,n:'Rose Halo',k:'eye',s:'geo',p:2799,i:'flat',c:[.5,.51],z:1.1},
 {id:3,n:'Silver Pilot',k:'eye',s:'aviator',p:2999,i:'flat',c:[.5,.79],z:1.1},
 {id:4,n:'Titan Navigator',k:'eye',s:'square',p:3499,t:'New',i:'titan',c:[.4,.48],z:1},
 {id:5,n:'Palm Shade',k:'sun',s:'square',p:2599,i:'palm',c:[.34,.38],z:1.7},
 {id:6,n:'Rosé Gradient',k:'sun',s:'geo',p:3299,t:'New',i:'pink',c:[.33,.45],z:1.6},
 {id:7,n:'Noir Wayfarer',k:'sun',s:'square',p:2899,i:'pink',c:[.66,.62],z:1.5},
 {id:8,n:'Tortoise Sun',k:'sun',s:'round',p:2699,i:'hold',c:[.42,.47],z:1.4},
 {id:9,n:'Slim Noir',k:'sun',s:'square',p:2399,i:'woman',c:[.48,.38],z:1.6},
 {id:10,n:'Sky Aviator',k:'sun',s:'aviator',p:3199,t:'Bestseller',i:'aviator',c:[.5,.45],z:1},
 {id:11,n:'Cove Black',k:'sun',s:'square',p:2799,i:'lemon',c:[.38,.25],z:1.5},
 {id:12,n:'Club Silver',k:'sun',s:'round',p:3099,i:'lemon',c:[.6,.72],z:1.5}
];
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
function pic(p){const a=AR[p.i],[cx,cy]=p.c,z=p.z,B=1.25;
 // size of image relative to the 5:4 frame (cover, then zoom)
 let w=a>=B?a/B:1,h=a>=B?1:B/a;w*=z;h*=z;
 // place focal point near frame centre, never leaving empty edges
 const l=cl(.5-cx*w,1-w,0),t=cl(.5-cy*h,1-h,0);
 return `<img src="${IMG[p.i]}" alt="${p.n}" style="width:${w*100}%;height:${h*100}%;left:${l*100}%;top:${t*100}%;object-fit:fill;max-width:none" loading="lazy">`}
$('#cmpA').src=IMG.clear;$('#cmpB').src=IMG.shade;$('#catE').src=IMG.titan;$('#catS').src=IMG.pink;$('#storeImg').src=IMG.store;
$('#rng').oninput=e=>$('#cmp').style.setProperty('--x',e.target.value+'%');
$('#nE').textContent=P.filter(p=>p.k==='eye').length+' styles';$('#nS').textContent=P.filter(p=>p.k==='sun').length+' styles';
let cat='all',filter='all',cart=[],wish=new Set();
const shapes=['all','round','square','aviator','geo'],names={all:'All shapes',round:'Round',square:'Square',aviator:'Aviator',geo:'Geometric'},kinds={eye:'Eyeglasses',sun:'Sunglasses'};
const cats=['all','eye','sun'],cn={all:'All',eye:'Eyeglasses',sun:'Sunglasses'};
$('#cchips').innerHTML=cats.map(s=>`<button class="chip" data-c="${s}" aria-pressed="${s==='all'}">${cn[s]}</button>`).join('');
$('#chips').innerHTML=shapes.map(s=>`<button class="chip" data-s="${s}" aria-pressed="${s==='all'}">${names[s]}</button>`).join('');
function sync(){document.querySelectorAll('#cchips .chip').forEach(x=>x.setAttribute('aria-pressed',x.dataset.c===cat));document.querySelectorAll('#chips .chip').forEach(x=>x.setAttribute('aria-pressed',x.dataset.s===filter));render()}
$('#cchips').onclick=e=>{const b=e.target.closest('.chip');if(b){cat=b.dataset.c;sync()}};
$('#chips').onclick=e=>{const b=e.target.closest('.chip');if(b){filter=b.dataset.s;sync()}};
document.querySelectorAll('.cat').forEach(b=>b.onclick=()=>{cat=b.dataset.k;filter='all';sync();$('#shop').scrollIntoView({behavior:'smooth'})});
function render(){
 $('#grid').innerHTML=P.filter(p=>(cat==='all'||p.k===cat)&&(filter==='all'||p.s===filter)).map(p=>
 `<article class="card"><div class="thumb">${p.t?`<span class="tag">${p.t}</span>`:''}<button class="heart" data-h="${p.id}" aria-pressed="${wish.has(p.id)}" aria-label="Save ${p.n}"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.700-8 11-8 11z"/></svg></button>${pic(p)}</div>
 <div class="info"><h3>${p.n}</h3><div class="meta">${kinds[p.k]} · ${names[p.s]}</div>
 <div class="buy"><span class="price">${fmt(p.p)}</span><button class="add" data-a="${p.id}">Add to bag</button></div></div></article>`).join('')||'<p class="meta">No frames match this mix yet.</p>'}
$('#grid').onclick=e=>{const t=e.target.closest('button');if(!t)return;
 if(t.dataset.h){const i=+t.dataset.h;wish.has(i)?wish.delete(i):wish.add(i);render()}
 else if(t.dataset.a){const p=P.find(x=>x.id==t.dataset.a),f=cart.find(x=>x.id===p.id);f?f.q++:cart.push({id:p.id,q:1});draw();toast(p.n+' added to your bag')}};
function draw(){
 const n=cart.reduce((a,x)=>a+x.q,0),tot=cart.reduce((a,x)=>a+x.q*P.find(p=>p.id===x.id).p,0);
 $('#count').textContent=n;$('#total').textContent=fmt(tot);
 const left=Math.max(0,FREE-tot);$('#ship').innerHTML=(left?`Add ${fmt(left)} more for free shipping`:'You have free shipping 🎉')+`<div class="bar"><i style="width:${Math.min(100,tot/FREE*100)}%"></i></div>`;
 $('#items').innerHTML=cart.length?cart.map(x=>{const p=P.find(q=>q.id===x.id);return `<div class="row"><div class="t">${pic(p)}</div><div><b>${p.n}</b><div class="meta">${kinds[p.k]} · ${fmt(p.p)}</div><div class="qty"><button data-q="${x.id}" data-d="-1" aria-label="Decrease">–</button>${x.q}<button data-q="${x.id}" data-d="1" aria-label="Increase">+</button></div></div><b>${fmt(p.p*x.q)}</b></div>`}).join(''):'<div class="empty">Your bag is empty.<br>Find a pair you love.</div>'}
$('#items').onclick=e=>{const b=e.target.closest('[data-q]');if(!b)return;const x=cart.find(i=>i.id==b.dataset.q);x.q+=+b.dataset.d;if(x.q<1)cart=cart.filter(i=>i!==x);draw()};
const cartEl=$('#cart'),veil=$('#veil');
function openC(o){cartEl.classList.toggle('on',o);veil.classList.toggle('on',o);cartEl.setAttribute('aria-hidden',!o);if(o)$('#close').focus()}
$('#open').onclick=()=>openC(true);$('#close').onclick=veil.onclick=()=>openC(false);
document.onkeydown=e=>{if(e.key==='Escape')openC(false)};
$('#checkout').onclick=()=>toast(cart.length?'Demo store — checkout is not connected':'Add a pair first');
$('#book').onclick=()=>toast('Demo store — booking is not connected');
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2400)}
const FACES={Round:['square','Square and angular frames add definition.'],Square:['round','Round frames soften strong jawlines.'],Heart:['aviator','Aviators balance a wider forehead.'],Oval:['geo','Geometric frames add lift; most shapes also suit you.'],Diamond:['geo','Geometric frames highlight your cheekbones.'],Long:['aviator','Deeper frames shorten the face.']};
$('#faces').innerHTML=Object.keys(FACES).map(f=>`<button class="face" data-f="${f}" aria-pressed="false"><b>${f}</b><small>face</small></button>`).join('');
$('#faces').onclick=e=>{const b=e.target.closest('.face');if(!b)return;document.querySelectorAll('.face').forEach(x=>x.setAttribute('aria-pressed',x===b));const [s,m]=FACES[b.dataset.f];
 $('#fitres').innerHTML=m+' <a href="#shop" style="text-decoration:underline" id="see">See '+names[s]+' frames</a>';$('#see').onclick=()=>{filter=s;cat='all';sync()}};
$('#news').onsubmit=e=>{e.preventDefault();toast('Thanks for joining!');e.target.reset()};
$('#theme').onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=d?'light':'dark'};
render();draw();