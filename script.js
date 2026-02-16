// ==== CANVAS SETUP ====
const galaxyCanvas = document.getElementById("galaxy");
const starsCanvas = document.getElementById("stars");
const shootingCanvas = document.getElementById("shooting");
const warpCanvas = document.getElementById("warpCanvas");
const trailCanvas = document.getElementById("trail");

const galaxyCtx = galaxyCanvas.getContext("2d");
const starsCtx = starsCanvas.getContext("2d");
const shootingCtx = shootingCanvas.getContext("2d");
const warpCtx = warpCanvas.getContext("2d");
const trailCtx = trailCanvas.getContext("2d");

[galaxyCanvas, starsCanvas, shootingCanvas, warpCanvas, trailCanvas].forEach(c=>{
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});

// ==== ROTATING GALAXY BACKGROUND ====
function drawGalaxy() {
    galaxyCtx.clearRect(0,0,galaxyCanvas.width,galaxyCanvas.height);
    let gradient = galaxyCtx.createRadialGradient(
        galaxyCanvas.width/2, galaxyCanvas.height/2, 0,
        galaxyCanvas.width/2, galaxyCanvas.height/2, galaxyCanvas.width/2
    );
    gradient.addColorStop(0,"rgba(120,0,255,0.15)");
    gradient.addColorStop(1,"rgba(0,0,0,0)");
    galaxyCtx.fillStyle = gradient;
    galaxyCtx.fillRect(0,0,galaxyCanvas.width, galaxyCanvas.height);
    requestAnimationFrame(drawGalaxy);
}
drawGalaxy();

// ==== STARFIELD ====
let stars = [];
for(let i=0;i<300;i++){
    stars.push({
        x: Math.random()*starsCanvas.width,
        y: Math.random()*starsCanvas.height,
        size: Math.random()*2,
        speed: Math.random()*0.5
    });
}
function animateStars(){
    starsCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
    starsCtx.fillStyle="white";
    stars.forEach(s=>{
        starsCtx.fillRect(s.x,s.y,s.size,s.size);
        s.y += s.speed;
        if(s.y>starsCanvas.height) s.y=0;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// ==== SHOOTING STARS ====
function shootingStar(){
    let x=Math.random()*shootingCanvas.width;
    let y=0;
    let length=Math.random()*80+20;
    let interval = setInterval(()=>{
        shootingCtx.clearRect(0,0,shootingCanvas.width,shootingCanvas.height);
        shootingCtx.beginPath();
        shootingCtx.moveTo(x,y);
        shootingCtx.lineTo(x+length,y+length);
        shootingCtx.strokeStyle="white";
        shootingCtx.lineWidth=2;
        shootingCtx.stroke();
        x+=15; y+=15;
        if(y>shootingCanvas.height) clearInterval(interval);
    },30);
}
setInterval(shootingStar,4000);

// ==== HYPERSPACE WARP ON CLICK ====
const clickEnter = document.getElementById("clickEnter");
const terminal = document.getElementById("terminal");
clickEnter.addEventListener("click",()=>{
    clickEnter.style.opacity=0;
    startWarp();
    setTimeout(()=>{
        clickEnter.style.display="none";
        terminal.style.opacity=1;
        typeWriter();
    },1500);
});

function startWarp(){
    let lines=[];
    for(let i=0;i<300;i++){
        lines.push({
            x:warpCanvas.width/2,
            y:warpCanvas.height/2,
            angle:Math.random()*Math.PI*2,
            length:Math.random()*20
        });
    }
    let frame=0;
    let warp=setInterval(()=>{
        warpCtx.fillStyle="rgba(0,0,0,0.2)";
        warpCtx.fillRect(0,0,warpCanvas.width,warpCanvas.height);
        lines.forEach(l=>{
            let dx=Math.cos(l.angle)*l.length;
            let dy=Math.sin(l.angle)*l.length;
            warpCtx.beginPath();
            warpCtx.moveTo(l.x,l.y);
            warpCtx.lineTo(l.x+dx,l.y+dy);
            warpCtx.strokeStyle="white";
            warpCtx.stroke();
            l.length+=15;
        });
        frame++;
        if(frame>20){
            clearInterval(warp);
            warpCtx.clearRect(0,0,warpCanvas.width,warpCanvas.height);
        }
    },30);
}

// ==== TYPEWRITER ====
const text=`
/\\_/\\
( o.o )   fractured@v4
 > ^ <

[ USER ]
├─ user        : fractured
├─ bio         : script developer & systems developer
└─ description : exploit & game development

[ LANGUAGES ]
├─ python
├─ lua
├─ javascript
├─ c++
└─ bash

[ PROJECTS ]
├─ Matcha      : Legit
├─ Matrix      : Legit
├─ Kicia       : HvH
└─ Stoicism    : In Development
`;

let i=0;
const content=document.getElementById("content");
function typeWriter(){
    if(i<text.length){
        content.innerHTML+=text.charAt(i);
        i++;
        setTimeout(typeWriter,8);
    }
}

// ==== NEON CURSOR TRAIL ====
let trail = [];
document.addEventListener("mousemove",e=>{
    trail.push({x:e.clientX, y:e.clientY, alpha:1});
});
function animateTrail(){
    trailCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height);
    for(let j=0;j<trail.length;j++){
        let t=trail[j];
        trailCtx.fillStyle=`rgba(0,255,255,${t.alpha})`;
        trailCtx.beginPath();
        trailCtx.arc(t.x,t.y,6,0,Math.PI*2);
        trailCtx.fill();
        t.alpha-=0.05;
    }
    trail=trail.filter(t=>t.alpha>0);
    requestAnimationFrame(animateTrail);
}
animateTrail();

// ==== PARALLAX 3D ====
document.addEventListener("mousemove",e=>{
    let x=(window.innerWidth/2 - e.pageX)/40;
    let y=(window.innerHeight/2 - e.pageY)/40;
    terminal.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
});

// ==== AUDIO ====
const audio=document.getElementById("ambient");
const toggle=document.getElementById("audioToggle");
toggle.addEventListener("click",()=>{
    if(audio.paused){ audio.play(); toggle.innerText="🌌 Playing"; }
    else{ audio.pause(); toggle.innerText="🌌 Ambient"; }
});
