"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat.init(
    {
      name: DataTypes.STRING,
      roomId: DataTypes.INTEGER,
      number: DataTypes.INTEGER,
      row: DataTypes.INTEGER,
      column: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      ticketPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
