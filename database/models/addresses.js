'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    static associate(models) {
      address.hasOne(models.places);
    
    }
  }
  address.init({
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    street: DataTypes.STRING,
    suburd: DataTypes.STRING,
    postalcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};