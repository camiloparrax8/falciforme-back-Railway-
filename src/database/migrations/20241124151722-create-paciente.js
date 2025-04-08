'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Paciente', {
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
      fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      identidad_genero: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      identidad_sexual: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      estrato: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      ocupacion: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      residente: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      direccion: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      procedente: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      regimen: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      celular: {
        type: Sequelize.STRING(15),
        allowNull: true,
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
      id_red_primaria: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Red_Primaria',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      id_acompaniante: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Acompanantes',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('Paciente');
  },
};
