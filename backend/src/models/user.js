"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      birthday: DataTypes.DATE,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.TEXT,
      sex: DataTypes.BOOLEAN,
      role: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
