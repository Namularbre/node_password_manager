const express = require('express');
const CategoryController = require('../controllers/categoryController');
const {login} = require("../middlewares/login");

const categoryRouter = express.Router();

categoryRouter
    .route('/add')
    .post(login, CategoryController.post);

categoryRouter
    .route('/:idCategory')
    .put(login, CategoryController.put)
    .delete(login, CategoryController.delete);

categoryRouter
    .route('/all')
    .get(login, CategoryController.get);

module.exports = categoryRouter;
