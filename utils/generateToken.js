const jwt = require('jsonwebtoken');

/**
 * Generate a new JWT from username and email.
 * @param username {string}
 * @param email {string}
 * @returns {Promise<*>}
 */
async function generateToken(username, email) {
    return  jwt.sign({ username, email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {generateToken};
