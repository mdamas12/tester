const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/database');
const db = {};


db.connection = new Sequelize(config.database, config.username, config.password, config);

// Vincular los modelos
db.User = require('../models/User')(db.connection,DataTypes);
db.Movie = require('../models/Movie')(db.connection,DataTypes);
db.Favorite = require('../models/Favorite')(db.connection,DataTypes);

//asociar los modelos
db.User.associate(db);
db.Movie.associate(db);
db.Favorite.associate(db);

module.exports = db;