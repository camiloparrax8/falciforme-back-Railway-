"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("laboratorios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hematies: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      hematocritos: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      mch: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      rdw: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      hemoglobina: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      mcv: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      mchc: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable("laboratorios");
  },
};
