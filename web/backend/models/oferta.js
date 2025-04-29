'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oferta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oferta.associate = function(models) {
    Oferta.belongsTo(models.User, { foreignKey: 'userId' });
    Oferta.belongsTo(models.Carrera, { foreignKey: 'carreraId' });
  };
  
  Oferta.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    empresa: DataTypes.STRING,
    tipo: DataTypes.STRING,
    ubicacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Oferta',
  });
  return Oferta;
};