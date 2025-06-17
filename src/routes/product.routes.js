import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { authorize } from "../middlewares/authorization.js";
import passport from "passport";

const router = Router();

router.use((req, res, next) => {
  next();
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllProducts
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize(["admin"]),
  createProduct
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(["admin"]),
  updateProduct
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(["admin"]),
  deleteProduct
);

export default router;
