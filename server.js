const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: subject,
    html: `
  <div class="email-container">
    <div class="email-header">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      <h1>NUEVO MENSAJE RECIBIDO</h1>
    </div>
    
    <div class="email-content">
      <h3 class="message-title">Detalles del Formulario de Contacto</h3>
      <br>
      
      <div class="field-row">
        <h4>Nombre:</h4>
        <div class="field-value">${name}</div>
        <br>
      </div>
      
      <div class="field-row">
        <h4>Email:</h4>
        <div class="field-value">${email}</div>
        <br>
      </div>
      
      <div class="field-row">
        <h4>Asunto:</h4>
        <div class="field-value">${subject}</div>
        <br>
      </div>
      
      <div class="field-row">
        <h4>Mensaje:</h4>
        <div class="message-box">${message}</div>
        <br>
      </div>
    </div>
  </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar:", error);
      res
        .status(500)
        .json({ success: false, error: "Error al enviar el mensaje." });
    } else {
      console.log("Correo enviado:", info.response);
      res.json({ success: true });
    }
  });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
