'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Esquema_Vacunacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    
      id_vacunacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vacunas', // Referencia a la tabla `Vacunas`
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'paciente',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      estado: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      fecha_vacunacion: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dosis: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Esquema_Vacunacion');
  },
};
