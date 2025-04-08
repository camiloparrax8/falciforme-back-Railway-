'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Red_Primaria', [
      {
        fecha: new Date('2023-01-01'),
        hospital: 'Hospital General de Medellín',
        correo: 'contacto@hospitalmedellin.com',
        telefono: '6041234567',
        telefono_urgencias: '6047654321',
        municipio: 'Medellín',
        departamento: 'Antioquia',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fecha: new Date('2023-02-15'),
        hospital: 'Clínica Valle del Lili',
        correo: 'info@valledellili.com',
        telefono: '6022345678',
        telefono_urgencias: '6028765432',
        municipio: 'Cali',
        departamento: 'Valle del Cauca',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fecha: new Date('2023-03-10'),
        hospital: 'Hospital Universitario San Ignacio',
        correo: 'contacto@husi.org',
        telefono: '6013456789',
        telefono_urgencias: '6019876543',
        municipio: 'Bogotá',
        departamento: 'Cundinamarca',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Red_Primaria', null, {});
  }
};
