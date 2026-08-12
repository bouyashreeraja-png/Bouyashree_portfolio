/* ==========================================================================
   3D ANTIGRAVITY PARTICLE CANVAS BACKGROUND
   Interactive Node Network & Deep Space Physics
   ========================================================================== */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Particle Settings
  const particleCount = 85;
  const connectionDistance = 140;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.density = Math.random() * 20 + 5;
      
      // Futuristic Node Color scheme: Cyan & Purple
      const colors = ['#00f0ff', '#9d4edd', '#3b82f6', '#c084fc'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.7 + 0.3;
    }

    update() {
      // Float movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on screen edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Antigravity Mouse Reaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;

          // Repel gently (antigravity effect)
          this.x -= directionX * 0.08;
          this.y -= directionY * 0.08;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectNodes() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          let opacity = 1 - distance / connectionDistance;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);

          let gradient = ctx.createLinearGradient(
            particles[a].x, particles[a].y,
            particles[b].x, particles[b].y
          );
          gradient.addColorStop(0, particles[a].color);
          gradient.addColorStop(1, particles[b].color);

          ctx.strokeStyle = gradient;
          ctx.globalAlpha = opacity * 0.25;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render faint grid pattern
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Render particle network
    connectNodes();
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
})();
