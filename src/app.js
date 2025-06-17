import "./loadEnv.js";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import sessionRoutes from "./routes/session.routes.js";
import userRoutes from "./routes/user.routes.js";
import passwordRoutes from "./routes/password.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/product.routes.js";
import "./config/passport.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend.html"));
});

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Conexión a MongoDB establecida correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log("Servidor iniciado correctamente");
    });
  })
  .catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
  });
