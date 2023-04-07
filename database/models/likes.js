'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    static associate(models) {
      likes.belongsTo(models.places);
      likes.belongsTo(models.users);
    }
  }
  likes.init({
    isLike: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};