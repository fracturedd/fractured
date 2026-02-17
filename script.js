window.onload = function() {
  const galaxyCanvas = document.getElementById("galaxy");
  const starsCanvas = document.getElementById("stars");
  const shootingCanvas = document.getElementById("shooting");
  const terminal = document.getElementById("terminal");

  const galaxyCtx = galaxyCanvas.getContext("2d");
  const starsCtx = starsCanvas.getContext("2d");
  const shootingCtx = shootingCanvas.getContext("2d");

  [galaxyCanvas, starsCanvas, shootingCanvas].forEach(c=>{
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });

  // Galaxy
  function drawGalaxy() {
    galaxyCtx.clearRect(0,0,galaxyCanvas.width,galaxyCanvas.height);
    let grad = galaxyCtx.createRadialGradient(
      galaxyCanvas.width/2, galaxyCanvas.height/2, 0,
      galaxyCanvas.width/2, galaxyCanvas.height/2, galaxyCanvas.width/2
    );
    grad.addColorStop(0,"rgba(120,0,255,0.15)");
    grad.addColorStop(1,"rgba(0,0,0,0)");
    galaxyCtx.fillStyle = grad;
    galaxyCtx.fillRect(0,0,galaxyCanvas.width, galaxyCanvas.height);
    requestAnimationFrame(drawGalaxy);
  }
  drawGalaxy();

  // Stars
  let stars = [];
  for(let i=0;i<300;i++){
    stars.push({x:Math.random()*starsCanvas.width, y:Math.random()*starsCanvas.height, size:Math.random()*2, speed:Math.random()*0.5});
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

  // Shooting stars
  function shootingStar(){
    let x=Math.random()*shootingCanvas.width;
    let y=0;
    let len=Math.random()*80+20;
    let interval=setInterval(()=>{
      shootingCtx.clearRect(0,0,shootingCanvas.width,shootingCanvas.height);
      shootingCtx.beginPath();
      shootingCtx.moveTo(x,y);
      shootingCtx.lineTo(x+len,y+len);
      shootingCtx.strokeStyle="white";
      shootingCtx.lineWidth=2;
      shootingCtx.stroke();
      x+=15; y+=15;
      if(y>shootingCanvas.height) clearInterval(interval);
    },30);
  }
  setInterval(shootingStar,4000);

  // Typewriter
  const text=`
/\\_/\\
( o.o )   fractured@v4
 > ^ <

[ USER ]
├─ user        : fractured
├─ bio         : script developer & cheat developer
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
  const content = document.getElementById("content");
  function typeWriter(){
    if(i<text.length){
      content.innerHTML+=text.charAt(i);
      i++;
      setTimeout(typeWriter,8);
    }
  }
  typeWriter();

  // Parallax 3D
  document.addEventListener("mousemove", e=>{
    let x = (window.innerWidth/2 - e.pageX)/40;
    let y = (window.innerHeight/2 - e.pageY)/40;
    terminal.style.transform=`translate(-50%,-50%) rotateY(${x}deg) rotateX(${y}deg)`;
  });

  // Cursor glow (tiny dot)
  document.querySelectorAll('.cursor-glow').forEach(c=>c.remove());
  const cursorGlow = document.createElement('div');
  cursorGlow.className='cursor-glow';
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', e=>{
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // Ambient audio
  const audio = document.getElementById("ambient");
  const toggle = document.getElementById("audioToggle");
  toggle.addEventListener("click", ()=>{
    if(audio.paused){ audio.play(); toggle.innerText="🌌 Playing"; }
    else{ audio.pause(); toggle.innerText="🌌 Ambient"; }
  });

  // Resize canvas
  window.addEventListener('resize', ()=>{
    [galaxyCanvas, starsCanvas, shootingCanvas].forEach(c=>{
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    });
  });
};
