const { Model } = require("sequelize");
const ExamenesFisicosService = require("../services/examenesFisicosService");

const createExamenesFisicos = async (request, response, next) => {
  try {
    const examenFisico = await ExamenesFisicosService
      .crearExamenFisico(request.body);
    response.status(200).json(examenFisico);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

const updateExamenesFisicos = async (request, response, next) => {
  try {
    const { id } = request.params;
    const camposActualizar = request.body;

    const examenActualizado = await ExamenesFisicosService
      .actualizarExamenFisico(id, camposActualizar);

    if (!examenActualizado) {
      return response.status(404).json({ mensaje: "Examen físico no encontrado" });
    }

    response.status(200).json(examenActualizado);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error al actualizar: " + error);
  }
};

const getExamenFisicoPorPaciente = async (request, response, next) => {
  try {
    const { id_paciente } = request.params;

    if (!id_paciente) {
      return response.status(400).json({ mensaje: "El ID del paciente es requerido" });
    }

    const resultado = await ExamenesFisicosService.buscarExamenFisicoPorIdPaciente(id_paciente);

    if (resultado.status === "error" && resultado.message.includes("No se encontró")) {
      return response.status(404).json(resultado);
    }

    return response.status(200).json(resultado);
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error al buscar el examen físico: " + error.message,
      data: null
    });
  }
};

module.exports = {
  createExamenesFisicos,
  updateExamenesFisicos,
  getExamenFisicoPorPaciente,
};