const acompananteService = require("../services/acompananteService");

const crearAcompanante = async (request, response, next) => {
  try {
    const acompanante = await acompananteService.crearAcompanante(request.body);
    response.status(200).json(acompanante);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

const getAcompanante = async (request, response, next) => {
  try {
    const { identificacion } = request.params;

    const acompanante =
      await acompananteService.buscarAcompanantePorIdentificacion(
        identificacion
      );
    return response.status(acompanante.status).json(acompanante);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: "500",
      message: "Ha ocurrido un error al buscar la Red Primaria",
      error: error.message,
    });
  }
};

module.exports = {
  crearAcompanante,
  getAcompanante,
};
