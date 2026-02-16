// CANVAS SETUP
const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

const warpCanvas = document.getElementById("warpCanvas");
const warpCtx = warpCanvas.getContext("2d");

const trailCanvas = document.getElementById("trail");
const trailCtx = trailCanvas.getContext("2d");

[starsCanvas, warpCanvas, trailCanvas].forEach(c => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});

// STARFIELD
let stars = [];
for (let i = 0; i < 400; i++) {
    stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateStars() {
    starsCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
    starsCtx.fillStyle = "white";
    stars.forEach(star => {
        starsCtx.fillRect(star.x, star.y, star.size, star.size);
        star.y += star.speed;
        if (star.y > starsCanvas.height) star.y = 0;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// CURSOR TRAIL
document.addEventListener("mousemove", e => {
    trailCtx.fillStyle = "rgba(0,150,255,0.2)";
    trailCtx.beginPath();
    trailCtx.arc(e.clientX, e.clientY, 10, 0, Math.PI*2);
    trailCtx.fill();
    setTimeout(() => {
        trailCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height);
    }, 100);
});

// HYPERSPACE WARP
const clickEnter = document.getElementById("clickEnter");
const terminal = document.getElementById("terminal");

clickEnter.addEventListener("click", () => {
    clickEnter.style.opacity = 0;
    startWarp();
    setTimeout(() => {
        clickEnter.style.display = "none";
        terminal.style.opacity = 1;
        typeWriter();
    }, 1500);
});

function startWarp() {
    let lines = [];
    for (let i = 0; i < 300; i++) {
        lines.push({
            x: warpCanvas.width / 2,
            y: warpCanvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            length: Math.random() * 20
        });
    }

    let frame = 0;
    let warp = setInterval(() => {
        warpCtx.fillStyle = "rgba(0,0,0,0.2)";
        warpCtx.fillRect(0,0,warpCanvas.width,warpCanvas.height);

        lines.forEach(l => {
            let dx = Math.cos(l.angle) * l.length;
            let dy = Math.sin(l.angle) * l.length;
            warpCtx.beginPath();
            warpCtx.moveTo(l.x, l.y);
            warpCtx.lineTo(l.x + dx, l.y + dy);
            warpCtx.strokeStyle = "white";
            warpCtx.stroke();
            l.length += 10;
        });

        frame++;
        if (frame > 20) {
            clearInterval(warp);
            warpCtx.clearRect(0,0,warpCanvas.width,warpCanvas.height);
        }
    }, 30);
}

// TYPEWRITER
const text = `
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

let i = 0;
const content = document.getElementById("content");

function typeWriter() {
    if (i < text.length) {
        content.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 8);
    }
}

// PARALLAX
document.addEventListener("mousemove", e => {
    let x = (window.innerWidth / 2 - e.pageX) / 40;
    let y = (window.innerHeight / 2 - e.pageY) / 40;
    terminal.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// AUDIO
const audio = document.getElementById("ambient");
const toggle = document.getElementById("audioToggle");

toggle.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        toggle.innerText = "🌌 Playing";
    } else {
        audio.pause();
        toggle.innerText = "🌌 Ambient";
    }
});
