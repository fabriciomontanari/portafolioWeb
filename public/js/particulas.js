document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; 
    canvas.style.zIndex = '1';
    
    homeSection.insertBefore(canvas, homeSection.firstChild);
    
    const setCanvasDimensions = () => {
        canvas.width = homeSection.offsetWidth;
        canvas.height = homeSection.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    const ctx = canvas.getContext('2d');
    
    const colors = [
        '#cad2c5', 
        '#84a98c', 
        '#52796f', 
        '#354f52', 
        '#2f3e46'  
    ];
    
    // Particle class
    class FMParticle {
        constructor() {
            this.size = Math.random() * 20 + 30;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = (Math.random() - 0.5) * 2; 
            this.speedY = (Math.random() - 0.5) * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.4 + 0.2; 
            this.shadowBlur = Math.random() * 5 + 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            this.rotation += this.rotationSpeed;
            
            if (this.x <= this.size/2 || this.x >= canvas.width - this.size/2) {
                this.speedX = -this.speedX;
            }
            
            if (this.y <= this.size/2 || this.y >= canvas.height - this.size/2) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            
            ctx.globalAlpha = this.opacity;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = this.shadowBlur;
            
            ctx.beginPath();
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            ctx.font = `${this.size * 0.4}px 'Press Start 2P', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#f8f9fa'; 
            ctx.fillText('FM', 0, 0);
            
            ctx.restore();
        }
    }
    
    const particles = [];
    const particleCount = Math.min(Math.max(5, Math.floor(canvas.width / 200)), 12); 
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new FMParticle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    

    
    const svgFilter = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgFilter.style.width = '0';
    svgFilter.style.height = '0';
    svgFilter.style.position = 'absolute';
    
    svgFilter.innerHTML = `
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;
    
    document.body.appendChild(svgFilter);
});