'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proizvod extends Model {
    static associate({ Kategorija,AlergijaDijagnoza, ProizvodAlergijaDijagnoza, StavkaNarudzbine }) {
      this.belongsTo(Kategorija, { foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, { foreignKey: 'proizvod_id', as: 'stavkeNarudzbine' });
      this.belongsToMany(AlergijaDijagnoza, { through: ProizvodAlergijaDijagnoza, foreignKey: 'proizvod_id', otherKey: 'alergijaDijagnoza_id', as: 'alergijeDijagnoze' });
    }
  }

  Proizvod.init({
    naziv: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    opis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cena: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Proizvod',
    timestamps: true
  });

  return Proizvod;
};