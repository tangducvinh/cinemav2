"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderedSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(OrderedSeat, { as: "orderedSeats" });
      OrderedSeat.belongsTo(models.Seat, {
        foreignKey: "seatId",
        targetKey: "id",
        as: "seat",
      });
    }
  }
  OrderedSeat.init(
    {
      seatId: DataTypes.INTEGER,
      showId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderedSeat",
    }
  );
  return OrderedSeat;
};
