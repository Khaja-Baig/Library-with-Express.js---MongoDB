const express = require('express')
const authControllers = require('./../Controllers/authController')

const router = express.Router();


router.route('/signup')
    .post(authControllers.signup_post)

router.route('/login')
    .post(authControllers.login_post)

router.route('/logout')
    .get(authControllers.logout_get)

    
module.exports = router;