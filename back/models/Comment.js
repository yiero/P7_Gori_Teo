module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define("Comment", {
        description: {
            type: Datatypes.STRING
        }
    })
    return Comment;
};