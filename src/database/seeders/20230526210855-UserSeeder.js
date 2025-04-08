'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [
      {nombres: 'Administrador', apellidos: 'Sistema', cedula: '1063077056', correo: 'admin@gmail.com', celular: '3008686108', user: 'admin', password: '$2a$10$JoJi/j2vTybToPbGGaoQ1OwafiaJIGkuwUU4eLuLR6XmzH1OLJk9C', id_rol: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
