const userController = require('../controllers/userController')
const authController = require('../middleware/authUser')
const { userValidationRules, validate } = require('../middleware/validators');
const express = require('express')


const router = express.Router()

router.post('/create', userValidationRules(), validate, userController.createUser);
router.post('/signIn', authController.signIn)
router.delete('/delete/:id', authController.authenticateToken, userController.deleteUser)

module.exports = router;
