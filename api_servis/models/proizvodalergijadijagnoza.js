'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProizvodAlergijaDijagnoza extends Model {
    static associate({ Proizvod, AlergijaDijagnoza }) {
      this.belongsTo(Proizvod, { foreignKey: 'proizvod_id', as: 'proizvod' });
      this.belongsTo(AlergijaDijagnoza, { foreignKey: 'alergijaDijagnoza_id', as: 'alergijaDijagnoza' });
    }
  }
  ProizvodAlergijaDijagnoza.init({
    proizvod_id: DataTypes.INTEGER,
    alergijaDijagnoza_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProizvodAlergijaDijagnoza',
    timestamps: true
  });
  return ProizvodAlergijaDijagnoza;
};
