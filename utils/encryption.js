const crypto = require('crypto');

/**
 * Encrypt any plain text
 * @param password {string}
 * @returns {Promise<{initialisationVector: string, encryptedPassword: string}>}
 */
async function encrypt(password) {
    try {
        const initialisationVector = crypto.randomBytes(16);
        const apiSecretKey = Buffer.from(process.env.API_SECRET_KEY, 'hex');
        const cipher = crypto.createCipheriv('aes-256-cbc', apiSecretKey, initialisationVector);
        let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
        encryptedPassword += cipher.final('hex');
        return { initialisationVector: initialisationVector.toString('hex'), encryptedPassword };
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
}

/**
 * Decrypt an encrypted text
 * @param encryptedPassword {string}
 * @param initialisationVector {string}
 * @returns {Promise<string>}
 */
async function decrypt(encryptedPassword, initialisationVector) {
    try {
        const apiSecretKey = Buffer.from(process.env.API_SECRET_KEY, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', apiSecretKey, Buffer.from(initialisationVector, 'hex'));
        let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
        decryptedPassword += decipher.final('utf-8');
        return decryptedPassword;
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}

module.exports = { encrypt, decrypt };
