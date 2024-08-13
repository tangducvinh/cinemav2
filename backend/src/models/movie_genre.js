"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie_Genre.init(
    {
      movieId: DataTypes.INTEGER,
      genreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie_Genre",
    }
  );
  return Movie_Genre;
};
