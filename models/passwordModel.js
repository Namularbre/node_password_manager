const db = require('../utils/database');

class PasswordModel {
    /**
     *
     * @param site {string}
     * @param idUser {number}
     * @param password {string}
     * @param initialisationVector {string}
     * @returns {Promise<number>}
     */
    static async insert(site, idUser, password, initialisationVector) {
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                INSERT INTO passwords (site, password, initialisationVector, idUser)
                VALUE (?, ?, ?, ?);
            `, [site, password, initialisationVector, idUser]);
        } catch(error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return parseInt(row.insertId);
    }

    /**
     *
     * @param site {string}
     * @param idUser {number}
     * @returns {Promise<Object[]>}
     */
    static async select(site, idUser) {
        let conn;
        let results;

        try {
            conn = await db.getConnection();
            results = await conn.query(`
                SELECT idPassword, site, password, idUser, initialisationVector
                FROM passwords
                WHERE idUser = ? AND site = ?;
            `, [idUser, site]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return results;
    }

    /**
     *
     * @param site {string}
     * @param password {string}
     * @param idUser {number}
     * @returns {Promise<Object>}
     */
    static async update(site, password, idUser) {
        throw new Error('NOT_IMPLEMENTED'); //TODO: implements
    }

    /**
     *
     * @param site {string}
     * @param idUser {number}
     * @returns {Promise<Object>}
     */
    static async delete(site, idUser) {
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                DELETE FROM passwords
                WHERE site = ? AND idUser = ?;
            `, [site, idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return row;
    }
}

module.exports = PasswordModel;
