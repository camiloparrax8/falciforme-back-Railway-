"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examenes_fisicos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      frecuencia_cardiaca: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      frecuencia_respiratoria: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      saturacion_oxigeno: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      tension_arterial: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      peso: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      talla: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      percentil: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      imc: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      deficit_zinc: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deficit_acido_folico: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deficit_vitamina_d: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      desnutricion: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      obesidad: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      perimetro_cefalico: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      vision: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },
      examen_boca: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      examen_nariz: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      examen_oidos: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      caries: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cuello: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      cardio_pulmunar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      tanner: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      extremidades_observacion: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      extremidades_estado_piel: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      extremidades_condicion: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      estado: {
        type: Sequelize.DataTypes.BOOLEAN, // 🔹 Cambiado para evitar error
        defaultValue: true,
      },
      id_historia_clinica: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "historiaclinica", // 🔹 Revisa que esta tabla realmente exista con este nombre
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_user_create: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      id_user_update: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      id_user_delete: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("examenes_fisicos");
  },
};
