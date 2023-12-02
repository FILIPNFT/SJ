'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlergijaDijagnoza extends Model {
    static associate({ Proizvod, ProizvodAlergijaDijagnoza }) {
      this.belongsToMany(Proizvod, { through: ProizvodAlergijaDijagnoza, foreignKey: 'alergijaDijagnoza_id', otherKey: 'proizvod_id', as: 'proizvodi' });
    }
  }
  AlergijaDijagnoza.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AlergijaDijagnoza',
    timestamps: true
  });
  return AlergijaDijagnoza;
};
