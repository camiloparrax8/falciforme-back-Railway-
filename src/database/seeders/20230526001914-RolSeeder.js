'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { nombre: 'ADMIN', descripcion: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'MEDICO', descripcion: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'ENFERMERO', descripcion: null, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'ACOMPANIANTE', descripcion: null, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
