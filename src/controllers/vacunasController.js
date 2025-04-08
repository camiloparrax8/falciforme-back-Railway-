const { Model } = require("sequelize");
const VacunasService = require("../services/vacunasService");

const createVacuna = async (request, response, next) => {
  const vacuna = request.body;
  try {
    const vacunaCreada = await VacunasService.crearVacuna(vacuna);
    response.status(200).json(vacunaCreada);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

module.exports = {
  createVacuna,
};
