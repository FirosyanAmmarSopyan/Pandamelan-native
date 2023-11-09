const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/' , UserController.handlerUserCreate)
router.get('/' , UserController.findAll)
router.get('/:id' , UserController.findByPk)
router.delete('/:id' , UserController.deleteOne)
module.exports = router