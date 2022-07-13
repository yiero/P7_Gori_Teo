module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        description: {
            type: Sequelize.STRING
        }
    })
    return Comment;
};