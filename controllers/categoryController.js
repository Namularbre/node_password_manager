const CategoryModel = require('../models/categoryModel');

class CategoryController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async getAll(req, res) {
        try {
            const categories = await CategoryModel.selectAll();
            res.send(categories);
        } catch(error) {
            console.error(error.message);
            res.status(500).send({message: 'Internal server error'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async post(req, res) {
        const {name} = req.body;

        if (name) {
            try {
                const idCategory = await CategoryModel.insert(name);

                res.send({
                    idCategory: idCategory,
                    name: name
                });
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: 'Internal server error'});
            }
        } else {
            res.status(400).send({message: 'Missing name in request.'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async put(req, res) {
        const {name} = req.body;
        const {idCategory} = req.params;

        if (name) {
            try {
                const update = await CategoryModel.update(idCategory, name);

                res.send(update);
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: 'Internal server error'});
            }
        } else {
            res.status(400).send({message: 'Missing name in request.'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async delete(req, res) {
        const {idCategory} = req.params;

        try {
            const update = await CategoryModel.delete(idCategory);
            res.send(update);
        } catch(error) {
            console.error(error.message);
            res.status(500).send({message: 'Internal server error'});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async get(req, res) {
        const {name} = req.params;

        try {
            const categories = await CategoryModel.selectByName(name);
            res.send(categories);
        } catch(error) {
            console.error(error.message);
            res.status(500).send({message: 'Internal server error'});
        }
    }
}

module.exports = CategoryController;
