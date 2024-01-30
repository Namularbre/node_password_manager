const db = require('../utils/database');

class PasswordModel {
    /**
     *
     * @param idUser {number}
     * @returns {Promise<any>}
     */
    static async selectAll(idUser) {
        let conn;
        let result;

        try {
            conn = await db.getConnection();
            result = conn.query(`
                SELECT idPassword, site, password, idUser, idCategory, initialisationVector
                FROM passwords
                WHERE idUser = ?;
            `, [idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return result;
    }

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
    static async search(site, idUser) {
        let conn;
        let results;

        try {
            conn = await db.getConnection();
            results = await conn.query(`
                SELECT idPassword, site, password, idCategory, initialisationVector
                FROM passwords
                WHERE site LIKE ? AND idUser = ?;
            `, [`%${site}%`, idUser]);
        } catch(error) {
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

    /**
     *
     * @param site {string}
     * @param idUser {number}
     * @param newPassword {string}
     * @returns {Promise<*>}
     */
    static async update(site, idUser, newPassword) {
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                UPDATE passwords
                SET password = ?
                WHERE site = ? AND idUser = ?;
            `, [newPassword, site, idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return (row.affectedRows !== 0);
    }
}

module.exports = PasswordModel;
