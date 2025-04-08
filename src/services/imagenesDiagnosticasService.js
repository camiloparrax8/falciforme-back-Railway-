/**
 * Servicio para la gestión de imágenes diagnósticas
 * @module imagenesDiagnosticasService
 * @requires sequelize
 * @requires ../database/models
 * @requires ../utils/apiResponse
 * @requires ./historiaClinicaService
 */

const { where } = require("sequelize");
const { ImagenDiagnostica, HistoriaClinica, Paciente } = require("../database/models");
const ApiResponse = require("../utils/apiResponse");
const historiaClinicaService = require("./historiaClinicaService");

/**
 * Crea un nuevo registro de imagen diagnóstica
 * @async
 * @function crearImagenDiagnostica
 * @param {Object} imagen - Datos de la imagen diagnóstica
 * @param {number} imagen.id_paciente - ID del paciente
 * @param {string} imagen.imagenes_diagnosticas - Tipo de imagen diagnóstica
 * @param {Date} imagen.fecha - Fecha del estudio
 * @param {string} imagen.tipo_resultado - Tipo de resultado
 * @param {string} imagen.resultado - Descripción del resultado
 * @returns {Promise<ApiResponse>} Respuesta con el resultado de la operación
 */
const crearImagenDiagnostica = async (imagen) => {
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(imagen.id_paciente);

  const nuevaImagen = await ImagenDiagnostica.create({
    id_historia_clinica: id_hc_open,
    imagenes_diagnosticas: imagen.imagenes_diagnosticas,
    fecha: imagen.fecha,
    tipo_resultado: imagen.tipo_resultado,
    resultado: imagen.resultado,
    estado: true,
  });
  if (!nuevaImagen)
    return new ApiResponse(
      "error",
      "Imagen Diagnóstica no se guardó correctamente",
      null
    );
  return new ApiResponse(
    "success",
    "Imagen Diagnóstica guardada correctamente",
    nuevaImagen
  );
};

/**
 * Busca todas las imágenes diagnósticas de un paciente
 * @async
 * @function buscarImagenesDiagnosticasPorIdPaciente
 * @param {number} idPaciente - ID del paciente
 * @returns {Promise<ApiResponse>} Respuesta con las imágenes diagnósticas encontradas
 * @throws {Error} Si hay un error en la búsqueda
 */
const buscarImagenesDiagnosticasPorIdPaciente = async (idPaciente) => {
  try {
    // Primero verificamos que el paciente exista
    const paciente = await Paciente.findByPk(idPaciente);
    if (!paciente) {
      return new ApiResponse(
        "error",
        "El paciente no existe",
        null
      );
    }

    // Buscamos la historia clínica activa del paciente
    const historiaClinica = await HistoriaClinica.findOne({
      where: {
        id_paciente: idPaciente,
        estado: 1
      }
    });

    if (!historiaClinica) {
      return new ApiResponse(
        "error",
        "El paciente no tiene una historia clínica activa",
        null
      );
    }

    // Buscamos todas las imágenes diagnósticas para esa historia clínica
    const imagenes = await ImagenDiagnostica.findAll({
      where: {
        id_historia_clinica: historiaClinica.id,
        estado: true
      },
      order: [['createdAt', 'DESC']]
    });

    return new ApiResponse(
      "success",
      "Imágenes diagnósticas encontradas",
      imagenes
    );

  } catch (error) {
    return new ApiResponse(
      "error",
      `Error al buscar imágenes diagnósticas: ${error.message}`,
      null
    );
  }
};

/**
 * Actualiza el estado de eliminación lógica de una imagen diagnóstica
 * @async
 * @function actualizarEstadoImagenDiagnostica
 * @param {number} id_imagen_diagnostica - ID de la imagen diagnóstica
 * @param {boolean} isDeleted - Estado de eliminación
 * @returns {Promise<ApiResponse>} Respuesta con el resultado de la actualización
 * @throws {Error} Si hay un error en la actualización
 */
const actualizarEstadoImagenDiagnostica = async (id_imagen_diagnostica, isDeleted) => {
  try {
    // Buscamos la imagen diagnóstica por ID
    const imagen = await ImagenDiagnostica.findByPk(id_imagen_diagnostica);

    if (!imagen) {
      return new ApiResponse(
        "error",
        "No se encontró la imagen diagnóstica",
        null
      );
    }

    // Actualizamos el estado
    await imagen.update({
      estado: !isDeleted
    });

    return new ApiResponse(
      "success",
      isDeleted ? "Imagen diagnóstica eliminada lógicamente" : "Imagen diagnóstica restaurada",
      imagen
    );
  } catch (error) {
    return new ApiResponse(
      "error",
      `Error al actualizar estado de la imagen diagnóstica: ${error.message}`,
      null
    );
  }
};

module.exports = {
  crearImagenDiagnostica,
  buscarImagenesDiagnosticasPorIdPaciente,
  actualizarEstadoImagenDiagnostica
};
