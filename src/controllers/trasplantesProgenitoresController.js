const { Model } = require("sequelize");
const TransplantesProgenitoresService = require("../services/trasplantesProgenitoresService");

const crearTransplanteProgenitores = async (request, response, next) => {
  try {
    const trasplante = await TransplantesProgenitoresService
      .crearTransplanteProgenitores(request.body);
    response.status(200).json(trasplante);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

const getTransplantePorPaciente = async (request, response, next) => {
  try {
    const { id_paciente } = request.params;

    if (!id_paciente) {
      return response.status(400).json({ mensaje: "El ID del paciente es requerido" });
    }

    const resultado = await TransplantesProgenitoresService.buscarTransplantePorIdPaciente(id_paciente);

    if (resultado.status === "error" && resultado.message.includes("No se encontró")) {
      return response.status(404).json(resultado);
    }

    return response.status(200).json(resultado);
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error al buscar el trasplante de progenitores: " + error.message,
      data: null
    });
  }
};

module.exports = {
  crearTransplanteProgenitores,
  getTransplantePorPaciente
};

