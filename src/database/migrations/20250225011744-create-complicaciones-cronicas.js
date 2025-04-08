"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("complicaciones_cronicas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vasculopatia_cerebral: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      infartos_cerebrales_silentes: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      epilepsia_convulsiones: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      cefaleas_recurrentes: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deficit_cognitivo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      retinopatia_drepanocitica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hemorragias_vitreas: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      neovascularizacion_retiniana: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      iritis_uveitis: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      oclusion_vasos_retinianos: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      disfuncion_diastolica_vii: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sobrecarga_ferrica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      trombosis: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hipertension_pulmonar: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      vrt: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      numero_crisis: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tratamientos: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      hipomexia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      saos: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      edpfc_tratamiento: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      hepatitis_viral_cronica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      esplenomegalia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hiperesplenismo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      nefropatia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      acidosis_tubular: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      priapismo_recurrente: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      proteinuria: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hipotensia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hematuria_necrosis_papilar: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      enfermedad_renal_cronica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      huesos_comprometidos: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      osteonecrosis: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      osteopenia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      grado_discapacidad: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      deformidades_osea: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      id_historia_clinica: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "historiaClinica",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_user_create: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_user_update: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_user_delete: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("complicaciones_cronicas");
  },
};
