import { Router } from "express";
import passport from "passport";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", authorize(["admin"]), updateUser);
router.delete("/:id", authorize(["admin"]), deleteUser);

export default router;
