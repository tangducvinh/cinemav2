"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Genres",
          key: "id",
        },
      },
      overview: {
        type: Sequelize.TEXT,
      },
      poster: {
        type: Sequelize.TEXT,
      },
      backdrop: {
        type: Sequelize.TEXT,
      },
      release: {
        type: Sequelize.DATE,
      },
      runtime: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movies");
  },
};
