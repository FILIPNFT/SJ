'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vreme_narucivanja: {
        type: Sequelize.DATE,
        allowNull: false
      },
      zakazano_vreme: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      adresa: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      telefon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ime_prezime: {
        type: Sequelize.STRING,
        allowNull: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Narudzbinas');
  }
};