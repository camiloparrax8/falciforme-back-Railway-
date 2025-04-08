"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class IngresoComplicacionesAgudas extends Model {
    static associate(models) {
      // Relación con ComplicacionesAgudas
      this.belongsTo(models.ComplicacionesAgudas, {
        foreignKey: "id_complicacion_aguda",
        as: "complicacionAguda",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  IngresoComplicacionesAgudas.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tipo_ingreso: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      duracion_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      motivo_ingreso: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      id_complicacion_aguda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "complicaciones_agudas",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "IngresoComplicacionesAgudas",
      tableName: "ingreso_complicaciones_agudas",
      timestamps: true,
      underscored: true,
    }
  );

  return IngresoComplicacionesAgudas;
};
