const { Model } = require("sequelize");
const ComplicacionesCronicasService = require("../services/complicacionesCronicasService");

const createComplicacionesCronicas = async (request, response, next) => {
  try {
    const complicacion = await ComplicacionesCronicasService
      .crearComplicacionesCronicas(request.body);
    response.status(200).json(complicacion);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

const updateComplicacionesCronicas = async (request, response, next) => {
  try {
    const { id } = request.params;
    const camposActualizar = request.body;

    const complicacionActualizada = await ComplicacionesCronicasService
      .actualizarComplicacionesCronicas(id, camposActualizar);

    if (!complicacionActualizada) {
      return response.status(404).json({ mensaje: "Complicación crónica no encontrada" });
    }

    response.status(200).json(complicacionActualizada);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error al actualizar: " + error);
  }
};

const getComplicacionesCronicasPorPaciente = async (request, response, next) => {
  try {
    const { id_paciente } = request.params;

    if (!id_paciente) {
      return response.status(400).json({ mensaje: "El ID del paciente es requerido" });
    }

    const resultado = await ComplicacionesCronicasService.buscarComplicacionesCronicasPorIdPaciente(id_paciente);

    if (resultado.status === "error" && resultado.message.includes("No se encontraron")) {
      return response.status(404).json(resultado);
    }

    return response.status(200).json(resultado);
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error al buscar las complicaciones crónicas: " + error.message,
      data: null
    });
  }
};

module.exports = {
  createComplicacionesCronicas,
  updateComplicacionesCronicas,
  getComplicacionesCronicasPorPaciente,
};
