"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("ingresos", "ingreso_complicaciones_agudas");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("ingreso_complicaciones_agudas", "ingresos");
  },
};
