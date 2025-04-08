"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ImagenDiagnostica extends Model {
    static associate(models) {
      // Relación 1:1 con HistoriaClinica
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  ImagenDiagnostica.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imagenes_diagnosticas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tipo_resultado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resultado: {
        type: DataTypes.TEXT,
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
      modelName: "ImagenDiagnostica",
      tableName: "imagenes_diagnosticas",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return ImagenDiagnostica;
};
