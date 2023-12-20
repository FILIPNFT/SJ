'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('proizvods',
        [
          {id:"1",naziv:"Brufen", opis:"bolovi", cena: 1200, kategorija_id:1, createdAt: new Date(), updatedAt: new Date() },
          {id:"2",naziv:"Insulin", opis:"dijabetes", cena: 300, kategorija_id:2, createdAt: new Date(), updatedAt: new Date()},
          {id:"3",naziv:"Probiotik", opis:"stomak", cena: 500, kategorija_id:3, createdAt: new Date(), updatedAt: new Date()}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proizvods', null, {});
  }
};
