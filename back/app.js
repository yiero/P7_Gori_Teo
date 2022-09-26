const express = require('express');
const bodyParser = require('body-parser');
const topicRoutes = require('./routes/topic');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const dotenv = require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


app.use(bodyParser.json());

app.use('/api/topic', topicRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api', userRoutes); // à renommer en api/user ? 

module.exports = app;