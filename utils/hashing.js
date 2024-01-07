const argon2 = require('argon2');

/**
 * @desc Hash a plain text
 * @param plain {string}
 * @returns {Promise<string|null>}
 */
async function hash(plain) {
    try {
        return await argon2.hash(plain);
    } catch (error) {
        console.error('Error while hashing password:', error);
        return null;
    }
}

/**
 * @desc compare a plain text with a hashed one
 * @param plain {string}
 * @param hash {string}
 * @returns {Promise<boolean>}
 */
async function compare(plain, hash) {
    try {
        return await argon2.verify(hash, plain);
    } catch (error) {
        console.error('Error while verifying password:', error);
        return false;
    }
}

module.exports = {hash, compare};
