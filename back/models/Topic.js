module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define("Topic", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    })
    return Topic;
};