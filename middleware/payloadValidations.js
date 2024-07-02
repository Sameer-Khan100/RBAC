// middleware/validators.js
const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isString()
      .withMessage("Password must be a string")
      .notEmpty()
      .withMessage("Password is required"),
    body("role").isIn(["super admin", "admin"]).withMessage("Invalid role"),
  ];
};

const categoryValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("desc").notEmpty().withMessage("Description is required"),
  ];
};

const productValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    body("desc").notEmpty().withMessage("Description is required"),
    body("quantity")
      .isFloat({ gt: 0 })
      .withMessage("Quantity must be a positive number"),
    body("categoryId").isInt().withMessage("Category ID must be an integer"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  categoryValidationRules,
  productValidationRules,
  validate,
};
