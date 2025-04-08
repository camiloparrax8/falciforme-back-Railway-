'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Antecedentes_Perinatologicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      peso_al_nacer: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      talla_al_nacer: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      nota: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      condicion_al_nacer: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cuidado_neonatal: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      etirico_neonatal: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
    await queryInterface.dropTable('Antecedentes_Perinatologicos');
  },
};
