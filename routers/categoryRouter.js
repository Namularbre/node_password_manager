const express = require('express');
const CategoryController = require('../controllers/categoryController');
const {login} = require("../middlewares/login");

const categoryRouter = express.Router();

categoryRouter
    .route('/')
    .get(login, CategoryController.get);

categoryRouter
    .route('/add')
    .post(login, CategoryController.post);

categoryRouter
    .route('/:idCategory')
    .put(login, CategoryController.put)
    .delete(login, CategoryController.delete);

module.exports = categoryRouter;
