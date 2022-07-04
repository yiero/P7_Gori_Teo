module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
    return User;
};
