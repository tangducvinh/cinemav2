"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie_Director.init(
    {
      movieId: DataTypes.INTEGER,
      directorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie_Director",
    }
  );
  return Movie_Director;
};
