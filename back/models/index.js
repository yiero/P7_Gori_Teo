const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false, // désactiver requete SQL dans la commande
    // host: "localhost",
    // user: "root",
    // password: "password",
    database: "groupomania",
    operatorsAliases: false,
    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User")(sequelize, Sequelize);
db.topic = require("./Topic")(sequelize, Sequelize);
db.comment = require("./Comment")(sequelize, Sequelize);
db.topic.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.topic, {
    foreignKey: "topicId",
    as: "topic"
});
module.exports = db; 