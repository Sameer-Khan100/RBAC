const express = require('express')
const productController = require('../controllers/productController')
const authController = require('../middleware/authUser')
const { StatusCodes } = require('http-status-codes')
const { check, productValidationRules, validate} = require('express-validator');


const router = express.Router()

router.post('/create', authController.authenticateToken, authController.authenticateRole("super admin"),productValidationRules(), validate, productController.createProduct)

router.get('/get/:id',[
    check("id").isInt({min : 1})
        .withMessage("Please provide Id")
], validate , authController.authenticateToken, productController.getProduct)

module.exports = router;
