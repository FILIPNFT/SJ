'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kategorija extends Model {
    static associate({ Proizvod }) {
      this.hasMany(Proizvod, { foreignKey: 'kategorija_id', as: 'proizvodi' });
    }
  }

  Kategorija.init({
    naziv: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Kategorija',
    timestamps: true
  });

  return Kategorija;
};