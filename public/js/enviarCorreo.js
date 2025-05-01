document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const sendButton = document.querySelector("button.enviar");
  const airplane = document.getElementById("paper-plane");

  airplane.setAttribute("width", "24");
  airplane.setAttribute("height", "24");
  
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
    
    airplane.style.left = `${startX}px`;
    airplane.style.top = `${startY}px`;
    airplane.style.display = "block";
    airplane.style.transform = "scale(0.6) rotate(0deg)";
    airplane.style.opacity = "1";
    airplane.style.transition = "none";
    
    setTimeout(() => {
      airplane.style.transition = "all 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
      
      const endX = window.innerWidth - 50;
      const endY = 50;
      
      airplane.animate([
        { 
          transform: "scale(0.6) rotate(0deg)",
          offset: 0 
        },
        { 
          transform: "scale(0.5) rotate(15deg) translate(80px, -40px)",
          offset: 0.3 
        },
        { 
          transform: "scale(0.4) rotate(-10deg) translate(160px, -80px)",
          offset: 0.6 
        },
        { 
          transform: "scale(0.3) rotate(5deg) translate(220px, -120px)",
          offset: 0.8 
        },
        { 
          transform: "scale(0.2) rotate(0deg) translate(280px, -160px)",
          opacity: 0.2,
          offset: 1 
        }
      ], {
        duration: 1500,
        easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        fill: "forwards"
      });
      
      const trailDuration = 1500; 
      const trailInterval = 100; 
      let trailCount = trailDuration / trailInterval;
      
      const createTrail = setInterval(() => {
        if (trailCount <= 0) {
          clearInterval(createTrail);
          return;
        }
        
        const trail = document.createElement("div");
        const airplaneRect = airplane.getBoundingClientRect();
        
        trail.style.position = "absolute";
        trail.style.width = "4px";
        trail.style.height = "4px";
        trail.style.backgroundColor = "#84a98c";
        trail.style.borderRadius = "50%";
        trail.style.left = `${airplaneRect.left + airplaneRect.width/2}px`;
        trail.style.top = `${airplaneRect.top + airplaneRect.height/2}px`;
        trail.style.zIndex = "9998";
        trail.style.opacity = "0.7";
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
          trail.style.transition = "opacity 0.5s ease-out";
          trail.style.opacity = "0";
          setTimeout(() => trail.remove(), 500);
        }, 200);
        
        trailCount--;
      }, trailInterval);
      
      setTimeout(() => {
        airplane.style.display = "none";
        airplane.style.transform = "scale(1) rotate(0deg)";
        airplane.style.transition = "none";
        
        const baseURL =
          window.location.hostname === "localhost"
            ? "http://localhost:2000"
            : window.location.origin;

        fetch(`${baseURL}/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Mensaje enviado",
              text: "Gracias por contactarme. Te responderé pronto.",
              confirmButtonColor: "#52796f", 
            });
            contactForm.reset();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al enviar el mensaje.",
              confirmButtonColor: "#354f52",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "warning",
            title: "Error de conexión",
            text: "No se pudo conectar con el servidor.",
            confirmButtonColor: "#cad2c5",
          });
        });
      }, 1800);
    }, 50);
  });
});