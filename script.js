// ===== STAR BACKGROUND =====
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// ===== TYPEWRITER CONTENT =====

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
const speed = 15;
const content = document.getElementById("content");

function typeWriter() {
    if (i < text.length) {
        content.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

setTimeout(typeWriter, 2500);
