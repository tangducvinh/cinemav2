"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.hasMany(models.OrderSeat);
      // Order.hasMany(models.OrderFood);
      Order.belongsTo(models.Show, {
        foreignKey: "showId",
        targetKey: "id",
        as: "show",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      showId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
