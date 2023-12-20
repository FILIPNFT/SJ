'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alergijaDijagnozas',
        [
          {id:"1", naziv:"Dijabetes", createdAt: new Date(), updatedAt: new Date() },
          {id:"2", naziv:"Aspirin", createdAt: new Date(), updatedAt: new Date()},
          {id:"3", naziv:"Astma", createdAt: new Date(), updatedAt: new Date()}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AlergijaDijagnozas', null, {});

  }
};
