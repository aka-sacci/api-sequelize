'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImcResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImcResults.init({
    email: DataTypes.STRING,
    value: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'ImcResults',
  });
  return ImcResults;
};