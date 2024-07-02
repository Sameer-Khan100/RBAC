const Product = require('../models/product');
const {StatusCodes} = require('http-status-codes')
const Categories = require('../models/category')

const createProduct = async (req, res) => {
  try {
    const { name, price, desc, quantity, categoryId } = req.body;
    const userId = req.user.id; // Assuming the userId comes from authentication middleware

    // Check if the categoryId exists
    const category = await Categories.findByPk(categoryId);
    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Category not found' });
    }

    // Check for duplicate product name within the same category
    const existingProduct = await Product.findOne({ where: { name, categoryId } });
    if (existingProduct) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product name already exists in this category' });
    }

    const product = await Product.create({ name, price, desc, quantity, userId, categoryId });
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    // Validate the productId parameter
    if (isNaN(productId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports ={
    createProduct,
    getProduct
}