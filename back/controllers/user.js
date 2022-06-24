const User = require ('../models/User');
const mysql = require('mysql');
//const db = require('../db');
//const { connect } = require('./routes/post');

exports.get = (req, res, next) => {
    const con = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "groupomania"
      });

      con.connect(function(err) {
        if (err) throw err;
        let query = "SELECT * FROM utilisateur";
        con.query(query, function(err, result, fields) {
          if (err) throw err;
          res.status(200).json(result);
        })
      });
};

exports.getOne = (req, res, next) => {
    const con = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "groupomania"
      });

      con.connect(function(err) {
        if (err) throw err;
        let id = req.params.id;
        let query = `SELECT * FROM utilisateur WHERE id=${id}`;
        con.query(query, function(err, result, fields) {
          if (err) throw err;
          res.status(200).json(result);
        })
      });
};