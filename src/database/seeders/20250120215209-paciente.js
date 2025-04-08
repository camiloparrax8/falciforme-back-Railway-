'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Paciente', [
      {
        nombre: 'Andrés',
        apellido: 'López',
        tipo_identificacion: 'CC',
        identificacion: '123456789',
        fecha_nacimiento: new Date('1990-05-20'),
        sexo: 'Masculino',
        identidad_genero: 'Hombre',
        identidad_sexual: 'Heterosexual',
        estrato: '3',
        ocupacion: 'Ingeniero de Sistemas',
        residente: 'Conjunto Residencial Los Pinos',
        direccion: 'Calle 123 #45-67',
        procedente: 'Bogotá',
        regimen: 'Contributivo',
        celular: '3001122334',
        correo: 'andres.lopez@example.com',
        municipio: 'Bogotá',
        departamento: 'Cundinamarca',
        id_red_primaria: 1,
        id_acompaniante: 1,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Camila',
        apellido: 'Torres',
        tipo_identificacion: 'TI',
        identificacion: '987654321',
        fecha_nacimiento: new Date('2005-08-15'),
        sexo: 'Femenino',
        identidad_genero: 'Mujer',
        identidad_sexual: 'Heterosexual',
        estrato: '4',
        ocupacion: 'Estudiante',
        residente: 'Barrio El Paraíso',
        direccion: 'Carrera 54 #23-10',
        procedente: 'Medellín',
        regimen: 'Subsidiado',
        celular: '3012233445',
        correo: 'camila.torres@example.com',
        municipio: 'Medellín',
        departamento: 'Antioquia',
        id_red_primaria: 2,
        id_acompaniante: 2,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Luis',
        apellido: 'Martínez',
        tipo_identificacion: 'CC',
        identificacion: '1122334455',
        fecha_nacimiento: new Date('1980-12-01'),
        sexo: 'Masculino',
        identidad_genero: 'Hombre',
        identidad_sexual: 'Heterosexual',
        estrato: '2',
        ocupacion: 'Docente',
        residente: 'Urbanización Las Palmas',
        direccion: 'Avenida 34 #12-45',
        procedente: 'Cali',
        regimen: 'Contributivo',
        celular: '3023344556',
        correo: 'luis.martinez@example.com',
        municipio: 'Cali',
        departamento: 'Valle del Cauca',
        id_red_primaria: 3,
        id_acompaniante: 3,
        id_user_create: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Paciente', null, {});
  }
};

