"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transplantes_progenitores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      paciente: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      padres: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      hermanos: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tipo_indicaciones: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      id_historia_clinica: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "historiaClinica",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transplantes_progenitores");
  },
};
