'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  return  queryInterface.addColumn(`places`, `statusDelete`, {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  })
  },

  async down (queryInterface, Sequelize) {
    return  queryInterface.removeColumn(`places`, `statusDelete`);
  }
};
