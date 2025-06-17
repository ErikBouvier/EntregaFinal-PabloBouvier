import Cart from "../models/cart.js";
import Ticket from "../models/ticket.js";
import Product from "../models/product.js"; 

export const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, products: [] });
  }
  return cart;
};

export const addProductToCart = async (cart, productId, quantity) => {
  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw new Error("El producto no existe en la base de datos");
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex > -1) {
    cart.products[productIndex].quantity = quantity; 
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  return cart;
};

export const processCartPurchase = async (cart, userEmail) => {
  const purchasedProducts = [];
  const failedProducts = [];

  for (const item of cart.products) {
    const product = await Product.findById(item.product);

    if (product && product.stock >= item.quantity) {
      const updatedProduct = await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
      purchasedProducts.push(item);
    } else {
      failedProducts.push(product ? product._id : "Producto no encontrado");
    }
  }

  const totalAmount = purchasedProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const ticket = await Ticket.create({
    amount: totalAmount,
    purchaser: userEmail,
  });

  cart.products = cart.products.filter(
    (item) => !failedProducts.includes(item.product ? item.product._id : null)
  );
  await cart.save();

  return { ticket, failedProducts };
};
