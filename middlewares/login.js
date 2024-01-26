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
    let username, password, email;

    if (req.body) {
        username = req.body.username;
        password = req.body.password;
        email = req.body.email;
    }

    if (!username && req.headers.username) {
        username = req.headers.username;
        password = req.headers.password;
        email = req.headers.email;
    }

    if (username && password && email) {
        const user = await UserModel.find(username, email);

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
