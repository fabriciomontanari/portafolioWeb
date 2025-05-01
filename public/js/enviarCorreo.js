document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const sendButton = document.querySelector("button.enviar");
  const airplane = document.getElementById("paper-plane");
  
  airplane.style.width = "30px";
  airplane.style.height = "30px";
  
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
    
    const buttonRect = sendButton.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + window.scrollY;
    
    airplane.style.position = "absolute"; 
    airplane.style.left = `${startX - 15}px`;
    airplane.style.top = `${startY - 15}px`;
    airplane.style.display = "block";
    airplane.style.transform = "scale(1) rotate(0deg)";
    airplane.style.opacity = "1";
    airplane.style.transition = "none";
    
    setTimeout(() => {
      airplane.style.transition = "all 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
      
      const animation = airplane.animate([
        { 
          transform: "scale(1) rotate(0deg)",
          offset: 0 
        },
        { 
          transform: "scale(0.9) rotate(15deg) translate(80px, -40px)",
          offset: 0.2 
        },
        { 
          transform: "scale(0.8) rotate(-10deg) translate(160px, -80px)",
          offset: 0.4 
        },
        { 
          transform: "scale(0.7) rotate(5deg) translate(240px, -120px)",
          offset: 0.6 
        },
        { 
          transform: "scale(0.6) rotate(-5deg) translate(320px, -160px)",
          offset: 0.8 
        },
        { 
          transform: "scale(0.5) rotate(0deg) translate(400px, -200px)",
          opacity: 0,
          offset: 1 
        }
      ], {
        duration: 1500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards"
      });
      
      const trailDuration = 1500; 
      const trailInterval = 80; 
      let trailCount = Math.floor(trailDuration / trailInterval);
      
      const createTrail = setInterval(() => {
        if (trailCount <= 0) {
          clearInterval(createTrail);
          return;
        }
        
        const trail = document.createElement("div");
        const airplaneRect = airplane.getBoundingClientRect();
        
        trail.classList.add("trail-dot");
        trail.style.left = `${airplaneRect.left + airplaneRect.width/2}px`;
        trail.style.top = `${airplaneRect.top + airplaneRect.height/2}px`;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
          trail.style.opacity = "0";
          setTimeout(() => trail.remove(), 500);
        }, 200);
        
        trailCount--;
      }, trailInterval);
      
      setTimeout(() => {
        airplane.style.display = "none";
        
        console.log("Formulario enviado:", formData);
        
        if (window.Swal) {
          Swal.fire({
            icon: "success",
            title: "Mensaje enviado",
            text: "Gracias por contactarme. Te responderé pronto.",
            confirmButtonColor: "#52796f", 
          });
        } else {
          alert("¡Mensaje enviado con éxito!");
        }
        
        // Resetear el formulario
        contactForm.reset();
        
      }, 1800);
    }, 50);
  });
});