const { user } = require('../models');
const db = require('../models');
const Comment = db.comment;
const User = db.user;


exports.create = (req, res) => {
    console.log("Comment.create");
    return Comment.create({
        description: req.body.description,
        topicId: req.body.topicId,
        userId: res.locals.userId
    })
        .then((comment) => {
            res.send(comment);
        })
        .catch((err) => {
            (console.log("error"));
        });
};

exports.get = (req, res) => {
    console.log("Comment.get");
    Comment.findAll({include: ["user"]})
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
};

exports.getOne = (req, res) => {
    console.log("Comment.getOne");
    let id = req.params.id;
    Comment.findByPk(id, {include: ["user"]})
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
    console.log("Comment.update");
    let id = req.params.id;

    User.findOne({ where: { id: res.locals.userId }})
        .then(user => {
            Comment.findByPk(id)
                .then(comment => {
                    if (comment.userId == res.locals.userId || user.admin == true) {
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
                    } else {
                        return res.send({message: "Not your comment !"})
                    }
                })
        })
};
// };
exports.delete = (req, res) => {
    console.log("Comment.delete");
    let id = req.params.id;

    User.findOne({ where: { id: res.locals.userId }})
        .then(user => {
            Comment.findByPk(id)
                .then(comment => {
                    if (comment.userId == res.locals.userId || user.admin == true) {
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
                    } else {
                        return res.send({message: "Not your comment !"})
                    }
                })
        })
};

