const User = require ('../models/User');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
//const db = require('../db');
//const { connect } = require('./routes/post');


exports.get = (req, res, next) => {
  const sequelize = new Sequelize("groupomania", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });

  try {
    sequelize.authenticate();
    sequelize.query("SELECT * FROM utilisateur").then(([results, metadata]) => {
      console.log(results);
    })
  } catch (error) {
    console.log('Impossible de se connecter, erreur suivante :', error);
  }
};

exports.getOne = (req, res, next) => {
  const sequelize = new Sequelize("groupomania", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });

  try {
    sequelize.authenticate();
    let id = req.params.id;
    sequelize.query(`SELECT * FROM utilisateur WHERE id=${id}`).then(([results, metadata]) => {
      console.log(results);
    })
  } catch (error) {
    console.log('Impossible de se connecter, erreur suivante :', error);
  }
};