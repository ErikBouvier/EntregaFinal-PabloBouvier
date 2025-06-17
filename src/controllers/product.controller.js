import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    console.log("Datos recibidos en req.body:", req.body);
    const { name, description, price, stock } = req.body;

    if (!name || !description || !price || !stock) {
      console.error("Error: Datos incompletos para crear el producto");
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
    });

    console.log("Producto creado exitosamente:", newProduct);
    res
      .status(201)
      .json({ message: "Producto creado exitosamente", product: newProduct });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res
      .status(500)
      .json({ message: "Error al crear producto", error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar producto", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({
      message: "Producto eliminado exitosamente",
      product: deletedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: err.message });
  }
};
