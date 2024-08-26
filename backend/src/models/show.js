"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Show.hasOne(db.Cinema);
      Show.belongsTo(models.Cinema, {
        foreignKey: "cinemaId",
        targetKey: "id",
        as: "cinema",
      });
      Show.belongsTo(models.Movie, {
        foreignKey: "movieId",
        targetKey: "id",
        as: "movie",
      });
      Show.belongsTo(models.Room, {
        foreignKey: "roomId",
        targetKey: "id",
        as: "room",
      });
    }
  }
  Show.init(
    {
      movieId: DataTypes.INTEGER,
      cinemaId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
      timeStart: DataTypes.DATE,
      roomId: DataTypes.INTEGER,
      timeEnd: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Show",
    }
  );
  return Show;
};
