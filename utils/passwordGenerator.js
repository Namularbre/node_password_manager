const crypto = require('crypto');

/**
 * @desc Generate a random password
 * @param length {number}
 * @returns {Promise<string>}
 */
async function generatePassword(length = 12) {
    const randomBytes = crypto.randomBytes(length);
    return randomBytes.toString('base64').slice(0, length);
}

module.exports = generatePassword;
