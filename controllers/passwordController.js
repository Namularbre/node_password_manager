const PasswordModel = require('../models/passwordModel');

class PasswordController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async post(req, res) {
        const {idUser} = req.body;
        const {site} = req.params;

        if (site) {
            try {
                const sites = await PasswordModel.select(site, idUser);

                if (sites.length === 0) {
                    const idPassword = await PasswordModel.insert(site, idUser);

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
            res.status(400).send({message: "Missing site in request payload."});
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
                const password = await PasswordModel.select(site, idUser);
                res.send(password);
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
}

module.exports = PasswordController;
