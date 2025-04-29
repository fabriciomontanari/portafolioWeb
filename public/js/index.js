AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const shapesContainer = document.getElementById('shapes');
if (shapesContainer) {
    const numberOfShapes = 20;

    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');

        const size = Math.random() * 20 + 10;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;

        shape.style.opacity = Math.random() * 0.5 + 0.1;

        const duration = Math.random() * 20 + 10;
        shape.style.animation = `float ${duration}s ease-in-out infinite`;

        let styleSheet;
        for (let j = 0; j < document.styleSheets.length; j++) {
            if (document.styleSheets[j].href === null) {
                styleSheet = document.styleSheets[j];
                break;
            }
        }
        
        if (!styleSheet) {
            const style = document.createElement('style');
            document.head.appendChild(style);
            styleSheet = style.sheet;
        }

        const keyframes = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                }
                100% {
                    transform: translate(0, 0) rotate(0deg);
                }
            }
        `;
        
        try {
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        } catch (error) {
            console.warn('No se pudo insertar la regla de animación:', error);
        }
        
        shapesContainer.appendChild(shape);
    }
}

const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.querySelector('.modal-content').style.animation = 'modalFadeIn 0.5s forwards';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    modal.querySelector('.modal-content').style.animation = 'modalFadeOut 0.4s forwards';
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 400);
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const modalId = projectId.startsWith('modal') ? projectId : `modal${projectId}`;
        const modal = document.getElementById(modalId);
        if (modal) {
            openModal(modal);
        } else {
            console.warn(`Modal con ID "${modalId}" no encontrado`);
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        closeModal(modal);
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        contactForm.reset();
    });
}

const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});