const express = require('express')
const userControllers = require('./../Controllers/userControllers')

const router = express.Router();


// router.route('/users-stats')
//     .get(userControllers.getUserStats);

router.route('/')
    .get(userControllers.getAllUser)
    .post(userControllers.createUser)
    .delete(userControllers.deleteAllUser)

router.route('/:id')
    .get(userControllers.getUserbyId)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser)

    
module.exports = router;