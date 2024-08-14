"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      //   roomId: {
      //     type: Sequelize.INTEGER,
      //     references: {
      //       model: "Rooms",
      //       key: "id",
      //     },
      //   },
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
    await queryInterface.dropTable("Rooms");
  },
};
