const Categories = require("../models/category");
const {StatusCodes} = require('http-status-codes')

const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name, desc } = req.body;

  try {
    // Check for duplicate category name for the same user
    const existingCategory = await Categories.findOne({ where: { name, userId } });
    if (existingCategory) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Category name already exists for this user' });
    }

    const category = await Categories.create({ name, desc, userId });
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    // Validate the productId parameter
    if (isNaN(categoryId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid Category ID' });
    }

    const category = await Categories.findByPk(categoryId);
    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
const deleteCategory = async (req, res) => {
  
  const { name } = req.params;
  try {
    const category = await Categories.findOne({where: {name}});
    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
    }
    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = {
  createCategory,
  getCategory,
  deleteCategory
};
