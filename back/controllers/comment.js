const db = require('../models');
const Comment = db.comment;


exports.create = (req, res) => {
    const comment = {
        description: req.body.description
    }
    Comment.create(comment) 
        .then((comment) => {
            res.send(comment);
         })
         .catch((err) => {
             console.log(err); 
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

