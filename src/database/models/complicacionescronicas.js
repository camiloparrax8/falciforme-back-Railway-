"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ComplicacionesCronicas extends Model {
    static associate(models) {
      // Relación 1:1 con HistoriaClinica
      this.belongsTo(models.HistoriaClinica, {
        foreignKey: "id_historia_clinica",
        as: "historiaClinica",
      });
    }
  }

  ComplicacionesCronicas.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      vasculopatia_cerebral: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      infartos_cerebrales_silentes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      epilepsia_convulsiones: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cefaleas_recurrentes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deficit_cognitivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      retinopatia_drepanocitica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hemorragias_vitreas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      neovascularizacion_retiniana: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      iritis_uveitis: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      oclusion_vasos_retinianos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      disfuncion_diastolica_vii: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sobrecarga_ferrica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      trombosis: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hipertension_pulmonar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vrt: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      numero_crisis: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tratamientos: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hipomexia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      saos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      edpfc_tratamiento: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hepatitis_viral_cronica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      esplenomegalia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hiperesplenismo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      nefropatia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      acidosis_tubular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priapismo_recurrente: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      proteinuria: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hipotensia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hematuria_necrosis_papilar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      enfermedad_renal_cronica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      huesos_comprometidos: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      osteonecrosis: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      osteopenia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      grado_discapacidad: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      deformidades_osea: {
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
      modelName: "ComplicacionesCronicas",
      tableName: "complicaciones_cronicas",
      timestamps: true,
      paranoid: true, // Borrado lógico
      underscored: true, // Convierte nombres de columnas a snake_case
    }
  );

  return ComplicacionesCronicas;
};
