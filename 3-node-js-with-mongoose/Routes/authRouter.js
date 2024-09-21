const express = require('express')
const authController = require('./../Controllers/authController')

// parsing incoming request
const router = express.Router()

// sign up RHF is called if user makes request to endpoint /users/signup
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
module.exports = router;