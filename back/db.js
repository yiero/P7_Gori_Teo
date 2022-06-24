const mysql = require('mysql');

exports.db = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "groupomania"
});