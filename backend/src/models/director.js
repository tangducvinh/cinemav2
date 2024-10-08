"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Director.belongsTo(models.Country, {
        foreignKey: "countryIdd",
        targetKey: "id",
        as: "country",
      });
      Director.belongsToMany(models.Movie, {
        through: models.Movie_Director,
        as: "movies",
      });
    }
  }
  Director.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      avatar: DataTypes.STRING,
      birthday: DataTypes.DATE,
      countryIdd: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Director",
    }
  );
  return Director;
};
