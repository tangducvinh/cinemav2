"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie_Actor.init(
    {
      movieId: DataTypes.INTEGER,
      actorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie_Actor",
    }
  );
  return Movie_Actor;
};
