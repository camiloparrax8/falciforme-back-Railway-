"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("examenes_fisicos", "condicion_abdominal", {
      type: Sequelize.STRING(255), // Puedes cambiar STRING(255) si necesitas otro tipo de dato
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("examenes_fisicos", "condicion_abdominal");
  },
};
