'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'teste',  {
        type: Sequelize.STRING,
        allowNull: true
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('Usuarios', 'teste');
  }
};
