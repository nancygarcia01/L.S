'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      addressId: {
        type: Sequelize.INTEGER,
        references:{
          model:"address",
          key:"id",
        },
        onDelete:"CASCADE",
        onUpdelete:"CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id",
        },
        onDelete:"CASCADE",
        onUpdelete:"CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('places');
  }
};