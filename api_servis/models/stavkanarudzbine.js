'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaNarudzbine extends Model {
    static associate({ Narudzbina, Proizvod }) {
      this.belongsTo(Narudzbina, { foreignKey: 'narudzbina_id', as: 'narudzbina' });
      this.belongsTo(Proizvod, { foreignKey: 'proizvod_id', as: 'proizvod' });
    }
  }
  StavkaNarudzbine.init({
    komada: DataTypes.INTEGER,
    jedinicna_cena: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
    timestamps: true
  });
  return StavkaNarudzbine;
};
