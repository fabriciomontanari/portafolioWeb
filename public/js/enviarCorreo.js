document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

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
            confirmButtonColor: "#3085d6",
          });
          contactForm.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al enviar el mensaje.",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "warning",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor.",
        });
      });
  });
});
