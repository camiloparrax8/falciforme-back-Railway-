"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ingresos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tipo_ingreso: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      duracion_ingreso: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      motivo_ingreso: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      id_complicacion_aguda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "complicaciones_agudas",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ingresos");
  },
};
