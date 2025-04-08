module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("complicaciones_agudas", "tipo_ingreso")
      .then(() => queryInterface.removeColumn("complicaciones_agudas", "fecha_ingreso"))
      .then(() => queryInterface.removeColumn("complicaciones_agudas", "duracion_ingreso"))
      .then(() => queryInterface.removeColumn("complicaciones_agudas", "motivo_ingreso"));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("complicaciones_agudas", "tipo_ingreso", {
      type: Sequelize.STRING(50),
      allowNull: true,
    })
    .then(() => queryInterface.addColumn("complicaciones_agudas", "fecha_ingreso", {
      type: Sequelize.DATE,
      allowNull: true,
    }))
    .then(() => queryInterface.addColumn("complicaciones_agudas", "duracion_ingreso", {
      type: Sequelize.INTEGER,
      allowNull: true,
    }))
    .then(() => queryInterface.addColumn("complicaciones_agudas", "motivo_ingreso", {
      type: Sequelize.STRING(255),
      allowNull: true,
    }));
  },
};
