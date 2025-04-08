"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("complicaciones_cronicas", "vrt", {
      type: Sequelize.STRING(50), // Se cambia a STRING con un máximo de 50 caracteres
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("complicaciones_cronicas", "vrt", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
