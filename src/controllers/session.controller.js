import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { createHash, isValidPassword } from '../utils.js';

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: `El usuario con el mail ${email} ya está registrado` });

    const hashedPassword = createHash(password);
    const user = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Usuario registrado con exito', user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    const valid = isValidPassword(user, password);
    if (!valid) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};

export const current = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  res.json({ user: req.user });
};