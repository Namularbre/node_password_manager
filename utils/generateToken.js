const jwt = require('jsonwebtoken');

async function generateToken(username) {
    return  jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {generateToken};
