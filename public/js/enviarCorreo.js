document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const sendButton = document.querySelector("button.enviar");
  const airplane = document.getElementById("paper-plane");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    const buttonRect = sendButton.getBoundingClientRect();
    airplane.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    airplane.style.top = `${buttonRect.top + window.scrollY}px`;
    airplane.style.display = "block";
    airplane.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    airplane.style.transform = "translate(-50vw, -50vh)";
    airplane.style.opacity = "1";

    setTimeout(() => {
      airplane.style.display = "none";
      airplane.style.transform = "none";
      airplane.style.opacity = "0";

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
    }, 1000); 
  });
});
