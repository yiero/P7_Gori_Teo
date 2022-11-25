module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('user', {
        pseudo: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        nom: {
            type: Datatypes.STRING,
            allowNull: false
        },
        prenom: {
            type: Datatypes.STRING,
            allowNull: false
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true
        },
        admin: {
            type: Datatypes.BOOLEAN,
            defaultValue: false
        }
    });
    return User;
};
