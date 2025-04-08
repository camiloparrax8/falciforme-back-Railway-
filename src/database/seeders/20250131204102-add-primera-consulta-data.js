'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Primera_Consulta', [
      {
        fecha_hematologica: new Date('2024-01-15'),
        edad_consulta: 5,
        fecha_inicio_sintoma: new Date('2023-12-10'),
        id_paciente: 1,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: false,
        parentescos_multiples: JSON.stringify([
          "anemia",
          "dolor_oseo",
          "dactilitis",
          "palidez"
        ])
      },
      {
        fecha_hematologica: new Date('2024-02-05'),
        edad_consulta: 8,
        fecha_inicio_sintoma: new Date('2023-11-20'),
        id_paciente: 2,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: false,
        parentescos_multiples: JSON.stringify([
          "fatiga",
          "ictericia",
          "dificultad_respiratoria"
        ])
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Primera_Consulta', null, {});
  }
};
