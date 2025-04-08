const estadoHBSService = require("../services/estadoHbsService");

// Crear un nuevo estado HBS
const createEstadoHBS = async (request, response, next) => {
  try {
    // Llama al servicio para crear un nuevo estado HBS
    const estado = await estadoHBSService.crearEstadoHBS(request.body);
    response.status(200).json(estado);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

// Consultar todos los estados HBS
const getEstadosHBS = async (request, response, next) => {
  const id_paciente = request.params.id_paciente; // Capturar el ID del paciente desde la URL

  if (!id_paciente) {
    return response.status(400).json({
      status: "error",
      message: "El ID del paciente es obligatorio",
    });
  }
  try {
    const estadoHBS = await estadoHBSService.obtenerEstadosHBS(id_paciente);
    response.status(estadoHBS.status).json(estadoHBS);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

module.exports = {
  createEstadoHBS,
  getEstadosHBS,
};
