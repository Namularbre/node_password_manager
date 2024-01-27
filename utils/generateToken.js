const jwt = require('jsonwebtoken');

async function generateToken(username, email) {
    return  jwt.sign({ username, email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {generateToken};
