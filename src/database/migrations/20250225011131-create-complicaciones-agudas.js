"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("complicaciones_agudas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dias_crisis: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      intensidad: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      manejo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      tratamiento: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      huesos_afectados: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      germen: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dias_infeccion: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      crisis_aplastica_infecciosa: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tipo_ingreso: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      duracion_ingreso: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      motivo_ingreso: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
    await queryInterface.dropTable("complicaciones_agudas");
  },
};
