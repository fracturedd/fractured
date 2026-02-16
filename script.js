// STARFIELD
const starCanvas = document.getElementById("stars");
const starCtx = starCanvas.getContext("2d");
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = "white";
    stars.forEach(star => {
        starCtx.fillRect(star.x, star.y, star.size, star.size);
        star.y += star.speed;
        if (star.y > starCanvas.height) star.y = 0;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// SHOOTING STARS
const shootingCanvas = document.getElementById("shooting");
const shootingCtx = shootingCanvas.getContext("2d");
shootingCanvas.width = window.innerWidth;
shootingCanvas.height = window.innerHeight;

function shootingStar() {
    let x = Math.random() * shootingCanvas.width;
    let y = 0;
    let length = Math.random() * 80 + 20;

    let interval = setInterval(() => {
        shootingCtx.clearRect(0,0,shootingCanvas.width,shootingCanvas.height);
        shootingCtx.beginPath();
        shootingCtx.moveTo(x,y);
        shootingCtx.lineTo(x+length,y+length);
        shootingCtx.strokeStyle = "white";
        shootingCtx.lineWidth = 2;
        shootingCtx.stroke();
        x += 15;
        y += 15;
        if (y > shootingCanvas.height) clearInterval(interval);
    }, 30);
}

setInterval(shootingStar, 4000);

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
        setTimeout(typeWriter, 10);
    }
}

setTimeout(typeWriter, 2500);

// PARALLAX
const terminal = document.getElementById("terminal");

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
