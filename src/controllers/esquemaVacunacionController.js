const esquemaVacunacionService = require("../services/esquemaVacunacionService");

const createEsquemaVacunacion = async (request, response, next) => {
  try {
    const esquema = await esquemaVacunacionService.crearEsquemaVacunacion(
      request.body
    );
    response.status(200).json(esquema);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

const getVacunasInput = async (request, response, next) => {
  try {
    const esquemas = await esquemaVacunacionService.obtenerEsquemasVacunacion();
    response.status(esquemas.status).json(esquemas);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

const obtenerVacunasPorPaciente = async (request, response, next) => {
  const id_paciente = request.params.id_paciente; // Capturar el ID del paciente desde la URL

  if (!id_paciente) {
    return response.status(400).json({
      status: "error",
      message: "El ID del paciente es obligatorio",
    });
  }
  try {
    const resultado = await esquemaVacunacionService.obtenerVacunasPorPaciente(
      id_paciente
    );
    response.status(resultado.status).json(resultado);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

module.exports = {
  createEsquemaVacunacion,
  getVacunasInput,
  obtenerVacunasPorPaciente,
};
