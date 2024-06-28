const Product = require('../models/product');
const {StatusCodes} = require('http-status-codes')
const Categories = require('../models/category')

const createProduct = async (req, res) => {
  try {
    const { name, price, desc, quantity, userId, categoryId } = req.body;
    
    // Check if the categoryId exists
    const category = await Categories.findByPk(categoryId);
    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Category not found' });
    }
    
    const product = await Product.create({ name, price, desc, quantity, userId, categoryId });
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
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