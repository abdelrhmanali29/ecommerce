const Product = require('./product.model');

module.exports = {
  async create(product) {
    const newProduct = await Product.create(product);

    return newProduct;
  },

  async list(query) {
    const products = await Product.find(query);

    return products;
  },

  async delete(id) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },
};
