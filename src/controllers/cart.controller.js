import Cart from "../models/cart.js";
import User from "../models/user.js";
import {
  addProductToCart,
  processCartPurchase,
} from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findById(req.user.cart);
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });

      await User.findByIdAndUpdate(userId, { cart: cart._id });
    }

    const updatedCart = await addProductToCart(cart, productId, quantity);
    console.log("Carrito actualizado:", updatedCart); 

    res.json({ message: "Producto añadido al carrito", cart: updatedCart });
  } catch (err) {
    console.error("Error al añadir producto al carrito:", err); 
    res.status(500).json({
      message: "Error al añadir producto al carrito",
      error: err.message,
    });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product");

    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });

    if (cart.products.some((item) => item.product === null)) {
      return res.status(400).json({
        message: "Algunos productos no están disponibles en la base de datos",
      });
    }

    const { ticket, failedProducts } = await processCartPurchase(
      cart,
      req.user.email
    );

    res.json({
      message: "Compra finalizada",
      ticket,
      failedProducts,
    });
  } catch (err) {
    console.error("Error al finalizar la compra:", err);
    res.status(500).json({
      message: "Error al finalizar la compra",
      error: err.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    console.log("Usuario autenticado:", req.user);
    console.log("ID del carrito asociado al usuario:", req.user.cart);

    const userCart = await Cart.findById(req.user.cart);
    if (!userCart) {
      console.error("Carrito no encontrado para el ID:", req.user.cart);
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.json({ cart: userCart });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
