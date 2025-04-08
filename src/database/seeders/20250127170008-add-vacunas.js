'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vacunas', [
      {
        nombre: 'Eritropoyetina',
        descripcion: 'Estimula la producción de glóbulos rojos en pacientes con anemia severa.',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Hierro dextrano inyectable',
        descripcion: 'Suplemento de hierro administrado por vía intravenosa para tratar deficiencia severa.',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Ácido fólico inyectable',
        descripcion: 'Vitamina esencial para la producción de glóbulos rojos, administrado como tratamiento complementario.',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Vitamina B12 (Cianocobalamina)',
        descripcion: 'Usada para tratar la anemia perniciosa causada por deficiencia de vitamina B12.',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Hierro sacarosa',
        descripcion: 'Hierro intravenoso utilizado en pacientes con anemia por insuficiencia renal.',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vacunas', null, {});
  },
};
