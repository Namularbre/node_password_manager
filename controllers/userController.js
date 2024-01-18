const UserModel = require('../models/userModel');
const hashing = require("../utils/hashing");

class UserController {
    /**
     * @dec Register a user in db
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async register(req, res) {
        const {username, password, email} = req.body;

        if (username && password && email) {
            try {
                const user = await UserModel.find(username, email);

                if (user.length === 0) {
                    const idUser = await UserModel.insert(username, password, email);
                    res.send({
                        idUser: idUser,
                        username: username,
                        password: password,
                        email: email
                    });
                } else {
                    res.status(401).send({message: 'Username or email already exists.'});
                }
            } catch(error) {
                console.error(error.message);
                res.status(500).send({message: "Internal server error."});
            }
        } else {
            res.status(400).send({message: "Missing username, password or email in request payload."});
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async login(req, res) {
        const {username, password, email} = req.body;

        if (username && password && email) {
            const user = await UserModel.find(username, email);

            if (user.length !== 0) {
                const hashedPassword = user[0].password;

                if (await hashing.compare(password, hashedPassword)) {
                    res.send(user[0]);
                } else {
                    res.status(401).send({message: "Unknown user."});
                }
            } else {
                res.status(401).send({message: "Unknown user."});
            }

        } else {
            res.status(401).send({message: "You need to be connected in order to do this command"});
        }
    }
}

module.exports = UserController;
