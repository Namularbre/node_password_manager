const db = require('../utils/database');
const hashing = require('../utils/hashing');

class UserModel {
    /**
     *
     * @param username {string}
     * @param password {string}
     * @param email {string|null}
     * @returns {Promise<number>}
     */
    static async insert(username, password, email) {
        let conn;
        let row;

        try {
            const hashedPassword = await hashing.hash(password);

            if (password) {
                conn = await db.getConnection();
                row = await conn.query(`
                INSERT INTO users (username, password, email)
                VALUES (?, ?, ?);
            `, [username, hashedPassword, email]);
            } else {
                throw new Error('PASSWORD_NOT_HASHED_ERROR');
            }
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return parseInt(row.insertId);
    }

    /**
     *
     * @param username {string}
     * @param email {string}
     * @returns {Promise<Object[]>}
     */
    static async find(username, email) {
        let conn;
        let result;

        try {
            conn = await db.getConnection();
            result = await conn.query(`
                SELECT idUser, username, password, email
                FROM users
                WHERE username = ? OR email = ?;
            `, [username, email]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return result;
    }
}

module.exports = UserModel;
