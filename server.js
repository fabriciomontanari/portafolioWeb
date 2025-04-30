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

app.post("/send-email", (req, res) => {
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
      <h3>Nuevo mensaje desde el formulario de contacto</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong><br>${message}</p>
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
