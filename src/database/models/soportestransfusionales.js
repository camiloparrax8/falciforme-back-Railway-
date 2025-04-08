"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SoporteTransfusional extends Model {
    static associate(models) {
      // Relación 1:1 con HistoriaClinica
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  SoporteTransfusional.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      soporte_transfusional: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_transfusiones: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      frecuencia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aloinmunizacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fecha_sobrecarga_hierro: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      quelentes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ferritina: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ferritina_dosis: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      fecha_sobrecarga_organo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pancreatica: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      evaluacion_cardiaca: {
        type: DataTypes.STRING,
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
      modelName: "SoporteTransfusional",
      tableName: "soportes_transfusionales",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return SoporteTransfusional;
};
