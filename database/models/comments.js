'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    static associate(models) {
   comments.belongsTo(models.places);
   comments.belongsTo(models.users);
    }
  }
  comments.init({
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN,
    placeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};