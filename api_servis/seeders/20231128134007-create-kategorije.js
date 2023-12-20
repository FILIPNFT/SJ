'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategorijas',
        [
          {id:"1", naziv:"Lek", createdAt: new Date(), updatedAt: new Date() },
          {id:"2", naziv:"Vitamin", createdAt: new Date(), updatedAt: new Date()},
          {id:"3", naziv:"Recept", createdAt: new Date(), updatedAt: new Date()}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kategorijas', null, {});
  }
};
