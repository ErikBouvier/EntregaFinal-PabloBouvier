import { Router } from "express";
import { addToCart, purchaseCart } from "../controllers/cart.controller.js";
import { authorize } from "../middlewares/authorization.js";
import passport from "passport";
import Cart from "../models/cart.js"; 

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(
      "Valor de req.user antes de authorize en POST /api/cart:",
      req.user
    );
    next();
  },
  authorize(["admin"]),
  addToCart
);
router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  purchaseCart
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("Valor de req.user en GET /api/cart:", req.user);
      const userCart = await Cart.findById(req.user.cart);
      if (!userCart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      res.json({ cart: userCart });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
);

export default router;
