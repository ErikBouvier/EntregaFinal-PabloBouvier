import { Router } from "express";
import { sendPasswordResetEmail } from "../services/mail.service.js";
import UserRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await UserRepository.findByEmail(email);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendPasswordResetEmail(email, resetLink);

  res.json({ message: "Correo de recuperación enviado" });
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findById(decoded.id, true);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "El usuario no tiene una contraseña válida." });
    }

    if (bcrypt.compareSync(newPassword, user.password)) {
      return res.status(400).json({
        message: "La nueva contraseña no puede ser igual a la anterior",
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await UserRepository.updatePassword(user._id, hashedPassword);
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(400).json({ message: "Enlace inválido o expirado" });
  }
});

export default router;
