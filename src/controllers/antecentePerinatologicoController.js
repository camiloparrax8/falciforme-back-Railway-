const antecentesPerinatologicoService = require("../services/antecentesPerinatologicoService");

// Crear un nuevo antecedente perinatológico
const createAntecedentePerinatologico = async (request, response, next) => {
  try {
    // Llama al servicio para crear un nuevo antecedente perinatológico
    const antecedente =
      await antecentesPerinatologicoService.crearAntecedentePerinatologico(
        request.body
      );
    response.status(200).json(antecedente);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

// Consultar todos los antecedentes perinatológicos
const getAntecedentesPerinatologicos = async (request, response, next) => {
  const id_paciente = request.params.id_paciente; // Capturar el ID del paciente desde la URL
  if (!id_paciente) {
    return response.status(400).json({
      status: "error",
      message: "El ID del paciente es obligatorio",
    });
  }
  try {
    const antecedentes =
      await antecentesPerinatologicoService.obtenerAntecedentesPerinatologicos(
        id_paciente
      );
    response.status(antecedentes.status).json(antecedentes);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

module.exports = {
  createAntecedentePerinatologico,
  getAntecedentesPerinatologicos,
};
