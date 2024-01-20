/**
 * @desc Generates a random key for the .env file.
 * @returns {string}
 */
function generateRandomKey() {
    const keyLength = 64;
    const possibleCharacters = '0123456789abcdef';
    let key = '';

    for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
        key += possibleCharacters.charAt(randomIndex);
    }

    return key;
}

const generatedKey = generateRandomKey();

console.log(generatedKey);
