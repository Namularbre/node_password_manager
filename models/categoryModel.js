const db = require('../utils/database');

class CategoryModel {
    /**
     *
     * @param name {string}
     * @returns {Promise<number>}
     */
    static async insert(name) {
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                INSERT INTO categories (name)
                VALUE (?);
            `, [name]);
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
     * @returns {Promise<Object[]>}
     */
    static async selectAll() {
        let conn;
        let results;

        try {
            conn = await db.getConnection();
            results = await conn.query(`
                SELECT idCategory, name
                FROM categories;
            `);
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
     * @returns {Promise<boolean>}
     */
    static async update(idCategory, name){
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                UPDATE categories
                SET name = ?
                WHERE idCategory = ?;
            `, [name, idCategory]);
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
     * @returns {Promise<boolean>}
     */
    static async delete(idCategory){
        let conn;
        let row;

        try {
            conn = await db.getConnection();
            row = await conn.query(`
                DELETE FROM categories
                WHERE idCategory = ?;
            `, [idCategory]);
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
     * @param name {string}
     * @returns {Promise<Object[]>}
     */
    static async selectByName(name) {
        let conn;
        let results;

        try {
            conn = await db.getConnection();
            results = await conn.query(`
                SELECT idCategory, name
                FROM categories
                WHERE name = ?;
            `, [name]);
        } catch (error) {
            console.error(error.message);
            throw new Error('DB_ERROR');
        } finally {
            if (conn) await conn.release();
        }

        return results;
    }
}

module.exports = CategoryModel;
