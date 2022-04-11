require("dotenv").config();
const mysql = require("mysql2");

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(config);

pool.getConnection((err) => {
    if (err) console.log(err);
    else console.log(`Conected to database ${process.env.DB_DATABASE}`);
});

const logQuery = (sql, params) => {
    console.log(
        "sql: ",
        mysql
            .format(sql, params)
            .replace(/\r?\n|\r/g, " ")
            .split(" ")
            .filter((e) => e !== "")
            .join(" ")
    );
};

const query = (sql, params) => {
    logQuery(sql, params);
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const queryOne = (sql, params) => {
    logQuery(sql, params);
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

module.exports = {
    query,
    queryOne,
};
