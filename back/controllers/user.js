const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// UPDATE / DELETE à terminer

exports.get = (req, res) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
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

exports.update = (req, res) => {
  const id = req.params.id;
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

exports.delete = (req, res) => {
  const id = req.params.id;
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
};  