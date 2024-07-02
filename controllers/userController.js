const User = require("../models/user")
// import {
// 	ReasonPhrases,
// 	StatusCodes,
// 	getReasonPhrase,
// 	getStatusCode,
// } from 'http-status-codes';
const {StatusCodes} = require('http-status-codes')
const {body, validationResult} = require('express-validator')
const Categories = require('../models/category');
const Product = require('../models/product');
const { validationResult } = require("express-validator");


const createUser = async (req, res) => {
  // Perform request validation
  await body('name').notEmpty().withMessage('Name is required').run(req);
  await body('email').isEmail().withMessage('Invalid email').run(req);
  await body('password').isString().withMessage('Password must be a string').notEmpty().withMessage('Password is required').run(req);
  await body('role').isIn(['super admin', 'admin']).withMessage('Invalid role').run(req);

  // Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email is already in use' });
    }
    const user = await User.create({ name, email, password, role });
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

  const deleteUser = async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
  
      // Validate the userId parameter
      if (isNaN(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
      }
  
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
      }
  
      // Ensure that the user performing this action is an admin
      if (req.user.role !== 'super admin' && req.user.role !== 'admin') {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "You don't have permission to perform this action" });
      }
  
      // Check for related records (example: Categories) and handle them if necessary
      const categories = await Categories.findAll({ where: { userId: userId } });
      if (categories.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Cannot delete user with existing categories" });
      }
      const product = await Product.findAll({where: {userId: userId}});
      if (product.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Cannot delete user with existing products" });
        }
  
      await user.destroy();
      res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };





  module.exports = {
    createUser,
    deleteUser
  }