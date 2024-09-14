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
      overview: {
        type: Sequelize.TEXT,
      },
      poster: {
        type: Sequelize.TEXT,
      },
      slug: {
        type: Sequelize.STRING,
      },
      backdrop: {
        type: Sequelize.STRING,
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
      country: {
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
