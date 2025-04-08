'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Acompanantes', [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        celular: '3001234567',
        correo: 'juan.perez@example.com',
        ocupacion: 'Ingeniero',
        municipio: 'Bogotá',
        departamento: 'Cundinamarca',
        direccion: 'Calle 123 #45-67',
        tipo_identificacion: 'CC',
        identificacion: '1234567890',
        tipo_vivienda: 'Apartamento',
        nivel_ingreso: 'Alto',
        nivel_academico: 'Universitario',
        tipo_vehiculo: 'Carro',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'María',
        apellido: 'Gómez',
        celular: '3012345678',
        correo: 'maria.gomez@example.com',
        ocupacion: 'Doctora',
        municipio: 'Medellín',
        departamento: 'Antioquia',
        direccion: 'Carrera 10 #20-30',
        tipo_identificacion: 'CC',
        identificacion: '9876543210',
        tipo_vivienda: 'Casa',
        nivel_ingreso: 'Medio',
        nivel_academico: 'Posgrado',
        tipo_vehiculo: 'Moto',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        celular: '3023456789',
        correo: 'carlos.rodriguez@example.com',
        ocupacion: 'Profesor',
        municipio: 'Cali',
        departamento: 'Valle del Cauca',
        direccion: 'Avenida Siempre Viva 742',
        tipo_identificacion: 'CC',
        identificacion: '1122334455',
        tipo_vivienda: 'Casa',
        nivel_ingreso: 'Bajo',
        nivel_academico: 'Secundaria',
        tipo_vehiculo: 'Bicicleta',
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Acompanantes', null, {});
  }
};
