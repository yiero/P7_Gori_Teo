const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false, 
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
db.like = require("./Like")(sequelize, Sequelize);
 //possède plusieurs
db.topic.hasMany(db.comment, { as: "comments" });
db.user.hasMany(db.topic, { as: "topics" });
db.user.hasMany(db.comment, {as: "comments" });
db.user.hasMany(db.like);
db.topic.hasMany(db.like);
//appartiens à
db.comment.belongsTo(db.topic); 
db.topic.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.like.belongsTo(db.user);
db.like.belongsTo(db.topic);
module.exports = db; 