"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mahasiswa", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      nama_mahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asal_kota: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agama: {
        type: Sequelize.ENUM(
          "Islam",
          "Kristen",
          "Katolik",
          "Hindu",
          "Buddha",
          "Khonghucu"
        ),
        allowNull: false,
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
    await queryInterface.dropTable("mahasiswa");
  },
};
