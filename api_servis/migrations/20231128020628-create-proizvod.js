'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proizvods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naziv: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      opis: {
        type: Sequelize.TEXT
      },
      cena: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kategorija_id: {
        type: Sequelize.INTEGER,
        allowNull: false
        // Ukloniti ili zakomentarisati references deo
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Proizvods');
  }
};