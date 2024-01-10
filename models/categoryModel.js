const db = require('../utils/database');

class CategoryModel {
    /**
     *
     * @param name {string}
     * @param idUser {number}
     * @returns {Promise<number>}
     */
    static async insert(name, idUser) {
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                INSERT INTO categories (name, idUser)
                VALUE (?, ?);
            `, [name, idUser]);
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
     * @param idUser {number}
     * @returns {Promise<Object[]>}
     */
    static async selectByUser(idUser) {
        let conn;
        let results;

        try {
            conn = await db.getConnection();
            results = await conn.query(`
                SELECT idCategory, name
                FROM categories
                WHERE idUser = ?;
            `, [idUser]);
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
     * @param idCategory {number}
     * @param name {string}
     * @param idUser {number}
     * @returns {Promise<boolean>}
     */
    static async update(idCategory, name, idUser){
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                UPDATE categories
                SET name = ?
                WHERE idCategory = ? AND idUser = ?;
            `, [name, idCategory, idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return (row.affectedRows === 1);
    }

    /**
     *
     * @param idCategory {number}
     * @param idUser {number}
     * @returns {Promise<boolean>}
     */
    static async delete(idCategory, idUser){
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                DELETE FROM categories
                WHERE idCategory = ? AND idUser = ?;
            `, [idCategory, idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return (row.affectedRows === 1);
    }
}

module.exports = CategoryModel;
