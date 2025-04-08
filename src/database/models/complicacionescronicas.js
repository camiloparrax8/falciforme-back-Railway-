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
        allowNull: true,
      },
      infartos_cerebrales_silentes: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      epilepsia_convulsiones: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cefaleas_recurrentes: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      deficit_cognitivo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      retinopatia_drepanocitica: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hemorragias_vitreas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      neovascularizacion_retiniana: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      iritis_uveitis: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      oclusion_vasos_retinianos: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      disfuncion_diastolica_vii: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      sobrecarga_ferrica: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      trombosis: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hipertension_pulmonar: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
        allowNull: true,
      },
      saos: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      edpfc_tratamiento: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hepatitis_viral_cronica: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      esplenomegalia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hiperesplenismo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      nefropatia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      acidosis_tubular: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      priapismo_recurrente: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      proteinuria: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hipotensia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hematuria_necrosis_papilar: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      enfermedad_renal_cronica: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      huesos_comprometidos: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      osteonecrosis: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      osteopenia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      grado_discapacidad: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      deformidades_osea: {
        type: DataTypes.BOOLEAN,
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
      modelName: "ComplicacionesCronicas",
      tableName: "complicaciones_cronicas",
      timestamps: true,
      paranoid: true, // Borrado lógico
      underscored: true, // Convierte nombres de columnas a snake_case
    }
  );

  return ComplicacionesCronicas;
};
