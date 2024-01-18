const express = require('express');
const UserController = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/register')
    .post(UserController.register);

userRouter
    .route('/')
    .post(UserController.login);

module.exports = userRouter;
