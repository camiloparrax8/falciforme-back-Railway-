"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("complicaciones_agudas", "tratamiento_infecciones", {
      type: Sequelize.STRING(255),  // Puedes cambiar STRING(255) si necesitas otro tipo de dato
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("complicaciones_agudas", "tratamiento_infecciones");
  },
};

