'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('enfermedades_cronicas', [
      {
        id_paciente: 1,
        enfermedad: 'Diabetes',
        enfermedad_especifica: 'Diabetes tipo 2',
        portador: 'No',
        linea_parentesco_portador: null,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_paciente: 2,
        enfermedad: 'Hipertensión',
        enfermedad_especifica: 'Hipertensión arterial esencial',
        portador: 'Sí',
        linea_parentesco_portador: 'Padre',
        id_user_create: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_paciente: 3,
        enfermedad: 'Enfermedad Cardíaca',
        enfermedad_especifica: 'Insuficiencia cardíaca congestiva',
        portador: 'No',
        linea_parentesco_portador: null,
        id_user_create: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enfermedades_cronicas', null, {});
  }
};
