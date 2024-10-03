"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actor.belongsTo(models.Country, {
        foreignKey: "countryId",
        targetKey: "id",
        as: "country",
      });
    }
  }
  Actor.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      avatar: DataTypes.STRING,
      birthday: DataTypes.DATE,
      countryId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
