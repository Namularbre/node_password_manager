const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {function}
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    const token = req.headers['authorization'];

    if (token == null) {
        res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error(err);
                return res.sendStatus(403);
            }

            req.user = user;

            next();
        });
    }
}

module.exports = {login};
