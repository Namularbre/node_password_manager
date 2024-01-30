const PasswordModel = require('../models/passwordModel');
const passwordGenerator = require("../utils/passwordGenerator");
const {encrypt, decrypt} = require("../utils/encryption");
const CategoryModel = require('../models/categoryModel');

class PasswordController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async index(req, res) {
        const {idUser} = req.params;

        if (idUser) {
            try {
                const passwords = await PasswordModel.selectAll(idUser);

                res.send(passwords);
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error."});
            }
        } else {
            res.status(400).send({message: "Missing site in request payload."});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async post(req, res) {
        const {idUser} = req.body;
        const {site} = req.params;

        if (site && idUser) {
            try {
                const sites = await PasswordModel.select(site, idUser);

                if (sites.length === 0) {
                    const generatedPassword = await passwordGenerator();
                    const encrypted = await encrypt(generatedPassword);

                    const idPassword = await PasswordModel.insert(site, idUser, encrypted.encryptedPassword, encrypted.initialisationVector);

                    res.send({
                        site: site,
                        idUser: idUser,
                        idPassword: idPassword,
                    });
                } else {
                    res.status(401).send({message: "Site already registered."});
                }
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error"});
            }
        } else {
            res.status(400).send({message: "Missing idUser in request payload."});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async get(req, res) {
        const {idUser} = req.body;
        const {site} = req.params;

        if (site) {
            try {
                const passwordEntry = await PasswordModel.select(site, idUser);

                if (passwordEntry.length !== 0) {
                    const decryptedPassword = await decrypt(passwordEntry[0].password, passwordEntry[0].initialisationVector);

                    res.send({
                        idPassword: passwordEntry[0].idPassword,
                        site: passwordEntry[0].site,
                        password: decryptedPassword,
                        idUser: passwordEntry[0].idUser
                    });
                } else {
                    res.status(404).send({message: "Unknown site."});
                }
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error"});
            }
        } else {
            res.status(400).send({message: "Missing site in request payload."});
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
        const {site} = req.params;

        if (site) {
            try {
                const deletion = await PasswordModel.delete(site, idUser);
                res.send(deletion);
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error"});
            }
        } else {
            res.status(400).send({message: "Missing site in request payload."});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async put(req, res) {
        const {site} = req.params;
        const {idUser, newPassword} = req.body;

        if (idUser && newPassword) {
            try {
                const passwordEntry = await PasswordModel.select(site, idUser);

                if (passwordEntry.length !== 0) {
                    const update = await PasswordModel.update(site, idUser, newPassword);
                    res.send(update);
                } else {
                    res.status(404).send({message: "Site not found."});
                }
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error."});
            }
        } else {
            res.status(400).send({message: "Missing site in request payload."});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async setCategory(req, res) {
        const {name} = req.params;
        const {idPassword} = req.body;

        if (name && idPassword) {
            try {
                const category = await CategoryModel.selectByName(name);

                if (category.length !== 0) {
                    const update = await PasswordModel.updateCategory(idPassword, category[0].idCategory);
                    res.send(update);
                } else {
                    res.status(404).send({message: "Category not found."});
                }
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error."});
            }
        } else {
            res.status(400).send({message: "Missing site in request payload."});
        }
    }
}

module.exports = PasswordController;
