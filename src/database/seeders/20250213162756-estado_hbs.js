'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('estado_hbs', [
      {
        parentesco: 'Padre',
        linea_parentesco: 'Paterno',
        estado: 'Positivo',
        id_paciente: 1,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        parentesco: 'Madre',
        linea_parentesco: 'Materno',
        estado: 'Negativo',
        id_paciente: 2,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        parentesco: 'Hermano',
        linea_parentesco: 'Paterno',
        estado: 'Desconocido',
        id_paciente: 3,
        id_user_create: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estado_hbs', null, {});
  }
};
