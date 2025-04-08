"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HistoriaClinica extends Model {
    static associate(models) {
      HistoriaClinica.belongsTo(models.Paciente, {
        foreignKey: "id_paciente",
        as: "paciente",
      });
      HistoriaClinica.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        as: "usuario",
      });
      HistoriaClinica.hasOne(models.ExamenesFisico, {
        foreignKey: "id_historia_clinica",
        as: "examenes_fisicos",
      });
      HistoriaClinica.hasOne(models.TransplanteProgenitores, {
        foreignKey: "id_historia_clinica",
        as: "transplante_progenitores",
      });
      HistoriaClinica.hasOne(models.ComplicacionesCronicas, {
        foreignKey: "id_historia_clinica",
        as: "complicaciones_cronicas",
      });
      HistoriaClinica.hasOne(models.Laboratorio, {
        foreignKey: "id_historia_clinica",
        as: "laboratorio",
      });
      HistoriaClinica.hasOne(models.ImagenDiagnostica, {
        foreignKey: "id_historia_clinica",
        as: "imagenes_diagnosticas",
      });
      HistoriaClinica.hasOne(models.SoporteTransfusional, {
        foreignKey: "id_historia_clinica",
        as: "soportes_transfusionales",
      });
      HistoriaClinica.hasMany(models.VacunaHc, {
        foreignKey: "id_historia_clinica",
        as: "vacuna",
      });
      HistoriaClinica.hasMany(models.Tratamiento, {
        foreignKey: "id_historia_clinica",
        as: "tratamiento",
      });
      HistoriaClinica.hasMany(models.ComplicacionesAgudas, {
        foreignKey: "id_historia_clinica",
        as: "complicaciones_agudas",
      });
    }
  }
  HistoriaClinica.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      modelName: "HistoriaClinica",
      tableName: "historiaClinica",
      timestamps: true,
      paranoid: true, // Habilita el borrado lógico
      underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
    }
  );

  return HistoriaClinica;
};
