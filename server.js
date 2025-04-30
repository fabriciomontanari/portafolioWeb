const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

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
      user: "fmontanari766@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "fmontanari766@gmail.com",
    subject: subject,
    html: `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Mensaje de Contacto</title>
  <style>
    /* Usando la paleta de colores proporcionada */
    :root {
      --light: #cad2c5;
      --light-accent: #84a98c;
      --medium: #52796f;
      --dark-accent: #354f52;
      --dark: #2f3e46;
      --white: #f8f9fa;
    }
    
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: var(--dark);
      background-color: var(--white);
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: var(--white);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(47, 62, 70, 0.15);
    }
    
    .email-header {
      background-color: var(--dark);
      color: var(--white);
      padding: 25px;
      text-align: center;
      border-bottom: 5px solid var(--dark-accent);
    }
    
    .email-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 1px;
    }
    
    .email-content {
      padding: 30px;
      background-color: var(--white);
    }
    
    .message-title {
      color: var(--dark-accent);
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 25px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--light-accent);
    }
    
    .field-row {
      margin-bottom: 20px;
    }
    
    .field-label {
      color: var(--medium);
      font-weight: 600;
      margin-bottom: 5px;
      display: block;
    }
    
    .field-value {
      background-color: var(--light);
      padding: 12px 15px;
      border-radius: 6px;
      border-left: 4px solid var(--medium);
    }
    
    .message-box {
      background-color: var(--light);
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid var(--medium);
      margin-top: 10px;
      white-space: pre-line;
    }
    
    .email-footer {
      background-color: var(--light-accent);
      color: var(--white);
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
    
    .icon {
      width: 50px;
      height: 50px;
      fill: var(--white);
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      <h1>NUEVO MENSAJE RECIBIDO</h1>
    </div>
    
    <div class="email-content">
      <h3 class="message-title">Detalles del Formulario de Contacto</h3>
      
      <div class="field-row">
        <span class="field-label">Nombre:</span>
        <div class="field-value">${name}</div>
      </div>
      
      <div class="field-row">
        <span class="field-label">Email:</span>
        <div class="field-value">${email}</div>
      </div>
      
      <div class="field-row">
        <span class="field-label">Asunto:</span>
        <div class="field-value">${subject}</div>
      </div>
      
      <div class="field-row">
        <span class="field-label">Mensaje:</span>
        <div class="message-box">${message}</div>
      </div>
    </div>
    
    <div class="email-footer">
      Este correo ha sido generado automáticamente. Por favor no responda directamente a este mensaje.
    </div>
  </div>
</body>
</html>
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
