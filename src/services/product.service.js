export const updateProductStock = async (product, quantity) => {
  if (product.stock >= quantity) {
    product.stock -= quantity;
    await product.save();
    return true;
  }
  return false;
};
