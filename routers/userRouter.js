const express = require('express');
const UserController = require('../controllers/userController');

const {log} = require('../middlewares/log');

const userRouter = express.Router();

userRouter
    .route('/register')
    .post(log, UserController.register);

module.exports = userRouter;
