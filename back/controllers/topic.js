const db = require('../models');
const Topic = db.topic;
const Like = db.like;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    const topic = {
        title: req.body.title,
        description: req.body.description,
        userId: res.locals.userId
    };
    Topic.create(topic)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Topic."
            });
        });
};

exports.get = (req, res) =>  {
    Topic.findAll({ include: ["comments", "likes"] })
    .then(topic => res.status(200).json(topic))
    .catch(error => res.status(400).json({ error }));
};

exports.getOne = (req, res) =>  {
    let id = req.params.id;
    Topic.findByPk(id, {include: ["comments"]})
        .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message:`Cannot find Topic with id=${id}`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieveing Topic with id= " + id
          });
        });
};

exports.delete = (req, res) =>  {
    const id = req.params.id;
    Topic.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Topic with id=${id}. Maybe Topic was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Topic with id=" + id
        });
      });
};

exports.update = (req, res) =>  {
    const id = req.params.id;
    Topic.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Topic with id=${id}. Maybe Topic wasn't found or req.body is empty.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Topic with id=" + id
        });
      });
};

exports.like = async (req, res) => {
  try {
    let id = req.params.id;
    let topic = await Topic.findByPk(id);
    console.log(id, topic, res.locals.userId)

    if (req.body.like == 1) {
      const like = {
        userId:res.locals.userId,
        topicId: id,
      };
    Like.create(like);
    }
    
    //select count(*) from like where topicId = xxx and like = x
    // topic.like = topic.usersLiked.length;
    // topic.dislike = topic.usersDisliked.length;
    topic.save()
      .then(() => res.status(200).json({ message: 'Interaction mise à jour !'}))
      .catch(error => res.status(404).json({ error })); 
  } catch {
    error => res.status(404).json({ error });
  }
};