const db = require('../models');
const Comment = db.comment;


exports.create = (req, res) => {
    return Comment.create({
        description: req.body.description,
        topicId: req.body.topicId
    })
        .then((comment) => {
            res.send(comment);
        })
        .catch((err) => {
            (console.log("error"));
        });
};
 exports.get = (req, res) => {
    Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
};
exports.getOne = (req, res) => {
    let id = req.params.id;
    Comment.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Comment with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comment with id= " + id
            });
        });
};
exports.update = (req, res) => {
    let id = req.params.id;
    Comment.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Comment was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update comment with id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating comment with id= " + id
        });
    });
};
exports.delete = (req, res) => {
    let id = req.params.id;
    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully !"
                });
            } else {
                res.send({
                    message: `Cannot delete comment with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete comment with id= " + id
            });
        });
};

