"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Incentive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Incentive.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      poster: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Incentive",
    }
  );
  return Incentive;
};
