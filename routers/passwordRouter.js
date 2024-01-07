const express = require('express');
const PasswordController = require('../controllers/passwordController');
const {login} = require('../middlewares/login');
const {log} = require('../middlewares/log');

const passwordRouter = express.Router();

passwordRouter
    .route('/:site')
    .post(log, login, PasswordController.post)
    .get(log, login, PasswordController.get)
    .delete(log, login, PasswordController.delete);

module.exports = passwordRouter;
