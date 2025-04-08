"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ComplicacionesAgudas extends Model {
    static associate(models) {
      // Relación 1:1 con HistoriaClinica
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
      this.hasMany(models.IngresoComplicacionesAgudas, {
        foreignKey: "id_complicacion_aguda",
        as: "ingresosComplicaciones",
      });
    }
  }

  ComplicacionesAgudas.init(
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
      },
      dias_crisis: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      intensidad: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      manejo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tratamiento: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      huesos_afectados: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      germen: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dias_infeccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crisis_aplastica_infecciosa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tratamiento_infecciones: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
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
      modelName: "ComplicacionesAgudas",
      tableName: "complicaciones_agudas",
      timestamps: true,
      paranoid: true, // Habilita el borrado lógico
      underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
    }
  );

  return ComplicacionesAgudas;
};
