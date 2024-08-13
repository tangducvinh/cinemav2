"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      //   id: DataTypes.INTEGER,
      // genreId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      overview: DataTypes.TEXT,
      poster: DataTypes.TEXT,
      // backdrop: DataTypes.TEXT,
      release: DataTypes.DATE,
      runtime: DataTypes.INTEGER,
      status: DataTypes.STRING,
      slug: DataTypes.STRING,
      backdrop: DataTypes.STRING,
      video: DataTypes.TEXT,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
