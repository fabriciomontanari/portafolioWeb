document.addEventListener('DOMContentLoaded', function() {
    const codelines = document.querySelectorAll('.code-line');
    const symbols = document.querySelectorAll('.floating-symbol');
    const particles = document.getElementById('particles');
    const gears = document.querySelectorAll('.gear');
    const animationSvg = document.getElementById('programming-animation');
    
    codelines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = 1;
            line.classList.add('animated');
        }, 300 * index);
    });
    
    symbols.forEach(symbol => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        
        setInterval(() => {
            const currentTransform = symbol.getAttribute('transform');
            const match = currentTransform.match(/translate\(([^,]+), ([^)]+)\)/);
            
            if (match) {
                const x = parseFloat(match[1]);
                const y = parseFloat(match[2]);
                
                const newX = x + (Math.random() * 0.6 - 0.3);
                const newY = y + (Math.random() * 0.6 - 0.3);
                
                symbol.setAttribute('transform', `translate(${newX}, ${newY})`);
            }
        }, 100);
    });
    
    let angle = 0;
    setInterval(() => {
        angle += 1;
        gears[0].setAttribute('transform', `translate(450, 200) rotate(${angle})`);
        gears[1].setAttribute('transform', `translate(420, 180) rotate(${-angle * 1.5})`);
    }, 50);
    
    function createParticle() {
        const aboutSection = document.getElementById('about');
        const rect = aboutSection.getBoundingClientRect();
        if (!(rect.top <= window.innerHeight && rect.bottom >= 0)) return;
        
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        
        const startPoints = [
            { x: 150, y: 150 }, 
            { x: 50, y: 300 },  
            { x: 50, y: 200 },  
        ];
        
        const endPoints = [
            { x: 400, y: 70 },  
            { x: 400, y: 300 }, 
            { x: 450, y: 200 }, 
        ];
        
        const start = startPoints[Math.floor(Math.random() * startPoints.length)];
        const end = endPoints[Math.floor(Math.random() * endPoints.length)];
        
        particle.setAttribute("cx", start.x);
        particle.setAttribute("cy", start.y);
        particle.setAttribute("r", 2 + Math.random() * 2);
        particle.setAttribute("fill", getComputedStyle(document.documentElement).getPropertyValue('--accent'));
        particle.style.opacity = "0.7";
        particles.appendChild(particle);
        
        const duration = 2000 + Math.random() * 1000;
        const startTime = Date.now();
        
        function moveParticle() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = -Math.cos(progress * Math.PI) / 2 + 0.5;
            
            const x = start.x + (end.x - start.x) * easeProgress;
            const y = start.y + (end.y - start.y) * easeProgress;
            
            particle.setAttribute("cx", x);
            particle.setAttribute("cy", y);
            
            if (progress < 1) {
                requestAnimationFrame(moveParticle);
            } else {
                particle.style.opacity = "0";
                setTimeout(() => {
                    particles.removeChild(particle);
                }, 300);
            }
        }
        
        requestAnimationFrame(moveParticle);
    }
    
    setInterval(createParticle, 400);
    
    const shield = document.getElementById('shield');
    setInterval(() => {
        shield.style.transform = 'scale(1.05)';
        setTimeout(() => {
            shield.style.transform = 'scale(1)';
        }, 500);
    }, 2000);
    
    let isVisible = false;
    const observerOptions = {
        root: null,
        threshold: 0.3,
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isVisible = true;
                animationSvg.style.opacity = 1;
            } else {
                isVisible = false;
            }
        });
    }, observerOptions);
    
    observer.observe(document.querySelector('.about-animations'));
});