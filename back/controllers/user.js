const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.get = (req, res) => {
  console.log("User.get");
  User.findAll({ include: ["topics", "comments", "likes"]})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
}; 

exports.getOne = (req, res) => {
  console.log("User.getOne");
  let id = req.params.id;
  User.findByPk(id, {include: ["topics", "comments"]})
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

exports.update = (req, res) => {
  console.log("User.update");
  const id = req.params.id;

  User.findByPk(id)
      .then(user => {
        if (user.id !== res.locals.userId) {
          return res.send({message: res.locals.userId})
        } else {
          User.update(req.body, {
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "User was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update User with id=${id}. Maybe User wasn't found or req.body is empty.`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User with id=" + id
              });
            });         
        }
      })
}; 

exports.create = (req, res) => {
  console.log("User.create");
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const user = {
    password: req.body.password,
    pseudo: req.body.pseudo,
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

exports.delete = (req, res) => {
  console.log("User.delete");
  const id = req.params.id;

  User.findByPk(id)
      .then(user => {
        if (user.id !== res.locals.userId) {
          return res.send({message: "It's not you !"})
        } else {
          User.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "User was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete User with id=" + id
              });
            });
        }
      })
}; 

exports.signup = (req, res) => {
  console.log("User.signup");
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        password: hash,
        pseudo: req.body.pseudo,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email
      });
      user.save()
        .then(() => res.status(201).json({ message: 'User has been created !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  console.log("User.login");
  const email = req.body.email;
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      } 
      bcrypt.compare(req.body.password, user.password) 
        .then(valid => {
          console.log(valid);
          if (!valid) {
            return res.status(401).json({ error: 'incorrect password !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
               process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error })); 
    })
    .catch(error => res.status(500).json({ error }));
};