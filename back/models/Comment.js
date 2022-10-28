module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define("comment", {

        description: {
            type: Datatypes.STRING
        }
        
    })
    return Comment;
};