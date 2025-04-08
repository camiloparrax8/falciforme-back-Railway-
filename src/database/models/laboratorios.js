"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Laboratorio extends Model {
    static associate(models) {
      // Relación 1:1 con HistoriaClinica
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  Laboratorio.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      hematies: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      hematocritos: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mch: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rdw: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      hemoglobina: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mcv: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mchc: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
      modelName: "Laboratorio",
      tableName: "laboratorios",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Laboratorio;
};
