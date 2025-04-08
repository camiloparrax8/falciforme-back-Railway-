"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("soportes_transfusionales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      soporte_transfusional: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero_transfusiones: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      frecuencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aloinmunizacion: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      fecha_sobrecarga_hierro: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quelentes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ferritina: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      ferritina_dosis: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fecha_sobrecarga_organo: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pancreatica: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      evaluacion_cardiaca: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("soportes_transfusionales");
  },
};
