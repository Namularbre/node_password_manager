const express = require('express');
const PasswordController = require('../controllers/passwordController');
const {login} = require('../middlewares/login');

const passwordRouter = express.Router();

passwordRouter
    .route('/:site')
    .post(login, PasswordController.post)
    .get(login, PasswordController.get)
    .delete(login, PasswordController.delete)
    .put(login, PasswordController.put);

passwordRouter
    .route('/search/:site')
    .get(login, PasswordController.search);

passwordRouter
    .route('/all/:idUser')
    .get(login, PasswordController.index);

module.exports = passwordRouter;
