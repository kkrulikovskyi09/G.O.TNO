const navbar = document.querySelector(".navbar")
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("visible");

});


/* Animation background and event */
const canvas = document.getElementById("bg");

const ctx = canvas.getContext("2d");
/* FUNCTION AND LAMBDA */
const mod = (n, m) => ((n % m) + m) % m;

function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
}

resize(); window.addEventListener("resize", resize);

/* PARTICLES */

const particles = [];
let scroll_speed_y = 0;

for(let i = 0; i < 40; i++){

    particles.push({

        x:Math.random() * canvas.width,
        y:Math.random() * canvas.height,

        r:Math.random() * 4 + 1,

        dx:(Math.random() - 0.5) * 0.5,
        dy:(Math.random() - 0.5) * 0.5,

        color:[
            "#ff6b6b",
            "#ffb86b",
            "#ffe66d",
            "#6bff95",
            "#6bcfff",
            "#b06bff"
        ][Math.floor(Math.random() * 6)]

    });

}
/* SCROLL EVENT HANDLING */

/* Desktop / Laptop (mouse wheel, trackpad) */
window.addEventListener('wheel', (event) => {
    const dy = event.deltaY;
    scroll_speed_y -= dy * 0.016;
}, { passive: true });

/* Mobile (touch drag) */
let lastY = null;
window.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (lastY !== null) {
        const dy = touch.clientY - lastY;
        scroll_speed_y += dy * 0.032;
    }
    lastY = touch.clientY;
}, { passive: true });

window.addEventListener('touchend', () => {
    lastY = null;
});

/* EVENT */
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY; // positive = scrolling down, negative = up

  // Example: show footer only when scrolling up near bottom
  const footer = document.querySelector("footer");
  const windowHeight = window.innerHeight;
  const contentHeight = document.body.scrollHeight;

  if (currentScrollY + windowHeight >= contentHeight - 50) {
    if (delta < 0) {
      footer.classList.add("visible"); // scrolling up at bottom
    } else {
      footer.classList.remove("visible"); // scrolling down at bottom
    }
  } else {
    footer.classList.remove("visible"); // not near bottom
  }

  lastScrollY = currentScrollY;
});

/* ANIMATION */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    scroll_speed_y *= 0.9;

    for(const p of particles){

        p.x += p.dx * p.r / 5;
        p.y += p.dy * p.r / 5;

        p.dx += (Math.random()-0.5)*0.1;
        p.dy += (Math.random()-0.5)*0.1;

        speedsq = p.dx*p.dx + p.dy * p.dy;
        if (speedsq > 0.25) {
            p.dx *= 0.8;
            p.dy *= 0.8;
        } if (speedsq < 0.0625) {
            p.dx *= 1.2;
            p.dy *= 1.2;
        } 

        p.y += scroll_speed_y*p.r;

        p.x = mod(p.x+4, canvas.width+8)-4;
        p.y = mod(p.y+4, canvas.height+8)-4;

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fillStyle = p.color;

        ctx.fill();

    }

    requestAnimationFrame(animate);

}

animate();