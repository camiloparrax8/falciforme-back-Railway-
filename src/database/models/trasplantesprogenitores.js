"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransplanteProgenitores extends Model {
    static associate(models) {
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  TransplanteProgenitores.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      paciente: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      padres: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      hermanos: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tipo_indicaciones: {
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
      modelName: "TransplanteProgenitores",
      tableName: "transplantes_progenitores",
      timestamps: true,
      paranoid: true, // Habilita el borrado lógico
      underscored: true, // Usa snake_case en los nombres de las columnas
    }
  );

  return TransplanteProgenitores;
};
