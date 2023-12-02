// models/narudzbina.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    static associate({ StavkaNarudzbine }) {
      this.hasMany(StavkaNarudzbine, { foreignKey: 'narudzbina_id', as: 'stavkeNarudzbine' });
    }
  }
  Narudzbina.init({
    vreme_narucivanja: DataTypes.DATE,
    zakazano_vreme: DataTypes.DATE,
    status: DataTypes.STRING,
    adresa: DataTypes.TEXT,
    telefon: DataTypes.STRING,
    ime_prezime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Narudzbina',
    timestamps: true
  });
  return Narudzbina;
};
