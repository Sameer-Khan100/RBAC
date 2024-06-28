const Categories = require("../models/category");
const {StatusCodes} = require('http-status-codes')

const createCategory = async (req, res) => {
  const { name, desc, userId } = req.body;
  try {
    const category = await Categories.create({ name, desc, userId });
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
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
