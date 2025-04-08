"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VacunaHc extends Model {
    static associate(models) {
      // Relación 1:1 con HistoriaClinica
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  VacunaHc.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre_vacuna: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      id_historia_clinica: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "HistoriaClinica",
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
      modelName: "VacunaHc",
      tableName: "vacunas_hc",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return VacunaHc;
};
