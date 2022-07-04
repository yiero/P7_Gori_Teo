const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;
// const mysql = require('mysql');
// const { Sequelize } = require('sequelize');


exports.get = (req, res, next) => {
  const sequelize = new Sequelize("groupomania", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });

  try {
    sequelize.authenticate();
    sequelize.query("SELECT * FROM utilisateur").then(([results, metadata]) => {
      console.log(results);
      res.status(200).json(results);
    })
  } catch (error) {
    console.log('Impossible de se connecter, erreur suivante :', error);
  }
};

exports.getOne = (req, res) => {
  let id = req.params.id;
  User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message:`Cannot find User with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieveing User with id= " + id
        });
      });
};

exports.update = (req, res, next) => {
  const sequelize = new Sequelize("groupomania", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });
  try {
    sequelize.authenticate();
  } catch {

  }
}; 

exports.create = (req, res) => {
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email
  }
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};  

exports.delete = (req, res, next) => {
  const sequelize = new Sequelize("groupomania", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });
  try {
    sequelize.authenticate();
    let id = req.params.id;
    sequelize.query(`DELETE FROM utilisateur WHERE id=${id}`).then(() => res.status(200).json({ message: 'utilisateur supprimé' }))
  } catch {
    console.log("Suppression échouée code erreur :", error);
  }
};  