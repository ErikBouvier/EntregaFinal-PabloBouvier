import User from "../models/user.js";
import Cart from "../models/cart.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener usuario", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const updateData = { first_name, last_name, email, age, role };
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar usuario", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: "Producto añadido al carrito", cart });
  } catch (err) {
    res.status(500).json({
      message: "Error al añadir producto al carrito",
      error: err.message,
    });
  }
};
