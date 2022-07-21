const db = require('../models');
const Comment = db.comment;
const Topic = db.topic;


exports.create = (topicId, comment) => {
    return Comment.create({
        description: comment.description,
        topicId: topicId
    })
        .then((comment) => {
            return comment;
        })
        .catch((err) => {
            (console.log("error"));
        });
};
exports.get = (req, res) => {

};
exports.getOne = (req, res) => {

};
exports.update = (req, res) => {

};
exports.delete = (req, res) => {

};

