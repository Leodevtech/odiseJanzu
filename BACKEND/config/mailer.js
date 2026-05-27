import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

transporter.verify((err, sucess) => {
  if (err) console.error("Erreur SMTP ", err.message);
  else console.log("SMTP connecté");
});

export const sendVerificationMail = async (email, token) => {
  await transporter.sendMail({
    from: "Authentification API <nathalieanneloc@gmail.com>",
    to: email,
    subject: "Confirmez votre email",
    html: `<h2> Bienvenue ${email} ! </h2>
    <p> Merci pour votre inscription , veuillez cliquez sur le lien ci dessous pour vérifier votre email: </p> <br/>
    <a href="http://localhost:3000/api/auth/verify=${token}">Vérifier mon email</a>
    `,
  });
};
