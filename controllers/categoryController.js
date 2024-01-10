const CategoryModel = require('../models/categoryModel');

class CategoryController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async get(req, res) {
        const {idUser} = req.body;

        if (idUser) {
            try {
                const categories = await CategoryModel.selectByUser(idUser);
                res.send(categories);
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: 'Internal server error'});
            }
        } else {
            res.status(400).send({message: 'Missing idUser in request payload'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async post(req, res) {
        const {idUser, name} = req.body;

        if (idUser && name) {
            try {
                const idCategory = await CategoryModel.insert(name, idUser);

                res.send({
                    idCategory: idCategory,
                    name: name,
                    idUser: idUser
                });
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: 'Internal server error'});
            }
        } else {
            res.status(400).send({message: 'Missing idUser and name in request.'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async put(req, res) {
        const {idUser, name} = req.body;
        const {idCategory} = req.params;

        if (name && idUser) {
            try {
                const update = await CategoryModel.update(idCategory, name, idUser);

                res.send(update);
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: 'Internal server error'});
            }
        } else {
            res.status(400).send({message: 'Missing idUser and name in request.'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async delete(req, res) {
        const {idUser} = req.body;
        const {idCategory} = req.params;

        if (idUser) {
            try {
                const update = await CategoryModel.delete(idCategory, idUser);
                res.send(update);
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: 'Internal server error'});
            }
        } else {
            res.status(400).send({message: 'Missing idUser and name in request.'});
        }
    }
}

module.exports = CategoryController;
