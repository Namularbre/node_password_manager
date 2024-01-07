const UserModel = require('../models/userModel');
const hashing = require('../utils/hashing');

/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    const {username, password} = req.body;

    if (username, password) {
        const user = await UserModel.find(username);

        if (user.length !== 0) {
            const hashedPassword = user[0].password;

            if (await hashing.compare(password, hashedPassword)) {
                next();
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

module.exports = {login};
