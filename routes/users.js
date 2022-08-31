const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



router.post('/signup',
    userController.validate('createUser'),
    userController.createUser
);

router.post('/login',
    userController.validate('userLogin'),
    userController.userLogin
);

module.exports = router;