"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderedFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(OrderedFood, {
        foreignKey: "orderId",
        targetKey: "id",
        // as: "cinema",
      });
      models.Food.hasMany(OrderedFood, {
        foreignKey: "foodId",
        targetKey: "id",
      });
    }
  }
  OrderedFood.init(
    {
      orderId: DataTypes.INTEGER,
      foodId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderedFood",
    }
  );
  return OrderedFood;
};
