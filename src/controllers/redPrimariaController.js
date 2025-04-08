const redPrimariaService = require("../services/redPrimariaService");

const createRedPrimaria = async (request, response, next) => {
  try {
    const redPrimaria = await redPrimariaService.crearRedPrimaria(request.body);
    response.status(200).json(redPrimaria);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};
const getRedPrimariaPorHospital = async (request, response, next) => {
  try {
    const { hospital } = request.params;
    const redPrimaria = await redPrimariaService.buscarRedPrimariaPorHospital(
      hospital
    );
    return response.status(redPrimaria.status).json(redPrimaria);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error al buscar la Red Primaria",
      error: error.message,
    });
  }
};
module.exports = {
  createRedPrimaria,
  getRedPrimariaPorHospital,
};
