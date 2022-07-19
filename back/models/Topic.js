module.exports = (sequelize, Datatypes) => {
    const Topic = sequelize.define("Topic", {
        title: {
            type: Datatypes.STRING
        },
        description: {
            type: Datatypes.STRING
        }
    })
    return Topic;
};