module.exports = (sequelize, Datatypes) => {
    const Topic = sequelize.define("topic", {
        title: {
            type: Datatypes.STRING
        },
        description: {
            type: Datatypes.STRING
        },
        like: {
            type: Datatypes.INTEGER
        },
        dislike: {
            type: Datatypes.INTEGER
        },
        usersLiked: {
            type: Datatypes.STRING
        },
        usersDisliked: {
            type: Datatypes.STRING
        }
    })
    return Topic;
};