const express = require('express')
const categoryController = require('../controllers/categoryController')
const authController = require('../middleware/authUser')

const router = express.Router()

router.post('/create', authController.authenticateToken, authController.authenticateRole('super admin'), categoryController.createCategory)
router.get('/get/:id', authController.authenticateToken, categoryController.getCategory)
router.delete('/delete/:name', authController.authenticateToken, authController.authenticateRole('super admin'), categoryController.deleteCategory)

module.exports = router;
