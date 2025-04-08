"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExamenesFisico extends Model {
    static associate(models) {
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  ExamenesFisico.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      frecuencia_cardiaca: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      frecuencia_respiratoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      saturacion_oxigeno: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tension_arterial: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      talla: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      percentil: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      imc: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      deficit_zinc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deficit_acido_folico: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deficit_vitamina_d: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      desnutricion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      obesidad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      perimetro_cefalico: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      vision: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      examen_boca: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      examen_nariz: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      examen_oidos: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      caries: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cuello: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cardio_pulmunar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tanner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      condicion_abdominal: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      extremidades_observacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      extremidades_estado_piel: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      extremidades_condicion: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      id_historia_clinica: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "historiaClinica",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_user_create: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_user_update: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_user_delete: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "ExamenesFisico",
      tableName: "examenes_fisicos",
      timestamps: true,
      paranoid: true, // Habilita el borrado lógico
      underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
    }
  );

  return ExamenesFisico;
};
