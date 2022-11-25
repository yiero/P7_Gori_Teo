module.exports = (sequelize, Datatypes) => {
    const Topic = sequelize.define("topic", {
        title: {
            type: Datatypes.STRING
        },
        description: {
            type: Datatypes.STRING
        },
        imageUrl: {
            type: Datatypes.STRING
        }
    })
    return Topic;
};