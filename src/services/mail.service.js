import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de contraseña",
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a: ${email}, ID: ${info.messageId}`);
  } catch (error) {
    console.error(`Error al enviar correo a: ${email}`, error);
    throw new Error("No se pudo enviar el correo de recuperación");
  }
};
