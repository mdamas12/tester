'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      movie.hasMany(models.Favorite);
    }
  };
  movie.init({
    tittle: DataTypes.STRING,
    year: DataTypes.STRING,
    imdrId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: DataTypes.STRING,
    poster: DataTypes.STRING, 
    //favorite: DataTypes.BOOLEAN,
   // movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movie',
    tableName: 'movies'
  });
  return movie;
};