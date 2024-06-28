const userController = require('../controllers/userController')
const authController = require('../middleware/authUser')
const express = require('express')


const router = express.Router()

router.post('/create', userController.createUser)
router.post('/signIn', authController.signIn)

module.exports = router;
