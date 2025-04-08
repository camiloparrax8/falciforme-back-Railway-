const { Model } = require("sequelize");
const ComplicacionesAgudasService = require("../services/complicacionesAgudasService");

const createComplicacionesAgudas = async (request, response, next) => {
  try {
    const ComplicacionesAgudas = await ComplicacionesAgudasService
      .crearComplicacionesAgudas(request.body);
    response.status(200).json(ComplicacionesAgudas);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

const obtenerComplicacionAgudaPorPaciente = async (request, response, next) => {
  try {
    const { id_paciente } = request.params;
    if (!id_paciente) {
      return response.status(400).json({ mensaje: "El ID del paciente es requerido" });
    }
    const resultado = await ComplicacionesAgudasService.obtenerComplicacionAgudaPorPaciente(id_paciente);
    if (resultado.status === "error" && resultado.message.includes("No se encontró")) {
      return response.status(404).json(resultado);
    }
    return response.status(200).json(resultado);
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error al obtener las complicaciones agudas: " + error.message,
      data: null
    });
  }
};

module.exports = {
  createComplicacionesAgudas,
  obtenerComplicacionAgudaPorPaciente,
};