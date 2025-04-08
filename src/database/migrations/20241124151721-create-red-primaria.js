'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Red_Primaria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hospital: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      telefono_urgencias: {
        type: Sequelize.STRING(15),
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
    await queryInterface.dropTable('Red_Primaria');
  },
};
