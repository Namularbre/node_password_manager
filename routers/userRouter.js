const express = require('express');
const UserController = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/register')
    .post(UserController.register);

module.exports = userRouter;
