'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class places extends Model {
    static associate(models) {
      places.belongsTo(models.address);
      places.belongsTo(models.users);
      places.hasMany(models.comments);
      places.hasMany(models.likes);
  
        }
  }
  places.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    statusDelete: DataTypes.BOOLEAN,
    addressId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'places',
  });
  return places;
};