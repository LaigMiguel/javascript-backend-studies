const express = require('express')
const router = express.Router()

const usersController = require('../controllers/userController')

router.get('/', usersController.getUsers)

router.get('/count', usersController.getUsersCount)
router.get('/names', usersController.getUsersNames)

router.get('/search', usersController.getUsersByName)

router.get('/:id', usersController.getUserById)

router.post('/', usersController.postNewUser)

router.put('/:id', usersController.putUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router
