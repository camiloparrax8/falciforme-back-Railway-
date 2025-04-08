'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Acompanantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tipo_identificacion: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      identificacion: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      celular: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
     
      municipio: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      departamento: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      direccion: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      ocupacion: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      tipo_vivienda: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      nivel_ingreso: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      nivel_academico: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      tipo_vehiculo: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      id_user_create: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_user_update: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_user_delete: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Acompanantes');
  },
};
