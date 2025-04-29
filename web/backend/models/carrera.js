'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Carrera.associate = function(models) {
    Carrera.hasMany(models.Oferta, { foreignKey: 'carreraId' });
  };
  
  Carrera.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrera',
  });
  return Carrera;
};