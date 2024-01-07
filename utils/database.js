const mariadb = require('mariadb');

const pool = mariadb.createPool({
    connectionLimit: 5,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
});

module.exports = pool;
