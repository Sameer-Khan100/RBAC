const express = require('express')
const productController = require('../controllers/productController')
const authController = require('../middleware/authUser')
const { StatusCodes } = require('http-status-codes')
const { check, validationResult } = require('express-validator');


const router = express.Router()

router.post('/create', authController.authenticateToken, productController.createProduct)

router.get('/get/:id',[
    check("id").isInt({min : 1})
        .withMessage("Please provide Id")
],
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  }, 
authController.authenticateToken, productController.getProduct)

module.exports = router;
