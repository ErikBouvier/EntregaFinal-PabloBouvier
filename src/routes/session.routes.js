import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import UserDTO from "../dtos/user.dto.js";

const router = Router();

router.post("/register", (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(400)
        .json({ message: info?.message || "Error en el registro" });
    const { password, ...userData } = user.toObject();
    res.status(201).json({ message: "Usuario registrado", user: userData });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ message: info?.message || "Credenciales inválidas" });
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login exitoso", token });
  })(req, res, next);
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({ user: userDTO });
  }
);

export default router;
