/**
 * Controlador para la gestión de imágenes diagnósticas
 * @module imagenesDiagnosticasController
 */

const { Model } = require("sequelize");
const imagenesDiagnosticasService = require("../services/imagenesDiagnosticasService");

/**
 * Crea un nuevo registro de imagen diagnóstica
 * @async
 * @function createImagenDiagnostica
 * @param {Object} request - Objeto de solicitud Express
 * @param {Object} request.body - Datos de la imagen diagnóstica
 * @param {string} request.body.imagenes_diagnosticas - Tipo de imagen
 * @param {string} request.body.fecha - Fecha del estudio
 * @param {string} request.body.tipo_resultado - Tipo de resultado
 * @param {string} request.body.resultado - Descripción del resultado
 * @param {Object} response - Objeto de respuesta Express
 * @param {Function} next - Función siguiente middleware
 * @returns {Promise<void>} Respuesta JSON con el resultado de la operación
 */
const createImagenDiagnostica = async (request, response, next) => {
    try {
        const imagenDiagnostica = await imagenesDiagnosticasService
            .crearImagenDiagnostica(request.body);
        response.status(200).json(imagenDiagnostica);
    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error al crear la imagen diagnóstica: " + error.message,
            data: null
        });
    }
};

/**
 * Obtiene las imágenes diagnósticas de un paciente específico
 * @async
 * @function getImagenesDiagnosticasByPaciente
 * @param {Object} request - Objeto de solicitud Express
 * @param {Object} request.params - Parámetros de la URL
 * @param {string} request.params.id_paciente - ID del paciente
 * @param {Object} response - Objeto de respuesta Express
 * @param {Function} next - Función siguiente middleware
 * @returns {Promise<void>} Respuesta JSON con las imágenes diagnósticas encontradas
 */
const getImagenesDiagnosticasByPaciente = async (request, response, next) => {
    try {
        const { id_paciente } = request.params;
        const resultado = await imagenesDiagnosticasService
            .buscarImagenesDiagnosticasPorIdPaciente(id_paciente);

        if (resultado.status === "error") {
            return response.status(404).json(resultado);
        }

        return response.status(200).json(resultado);
    } catch (error) {
        console.error("Error en getImagenesDiagnosticasByPaciente:", error);
        return response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error al buscar las imágenes diagnósticas: " + error.message,
            data: null
        });
    }
};

/**
 * Actualiza el estado de eliminación lógica de una imagen diagnóstica
 * @async
 * @function updateImagenDiagnosticaEstado
 * @param {Object} request - Objeto de solicitud Express
 * @param {Object} request.params - Parámetros de la URL
 * @param {string} request.params.id_imagen_diagnostica - ID de la imagen diagnóstica
 * @param {Object} request.body - Datos a actualizar
 * @param {boolean} request.body.is_deleted - Estado de eliminación
 * @param {Object} response - Objeto de respuesta Express
 * @param {Function} next - Función siguiente middleware
 * @returns {Promise<void>} Respuesta JSON con el resultado de la actualización
 */
const updateImagenDiagnosticaEstado = async (request, response, next) => {
    try {
        const { id_imagen_diagnostica } = request.params;
        const { is_deleted } = request.body;

        const resultado = await imagenesDiagnosticasService
            .actualizarEstadoImagenDiagnostica(id_imagen_diagnostica, is_deleted);

        if (resultado.status === "error") {
            return response.status(404).json(resultado);
        }

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error al actualizar la imagen diagnóstica: " + error.message,
            data: null
        });
    }
};

module.exports = {
    createImagenDiagnostica,
    getImagenesDiagnosticasByPaciente,
    updateImagenDiagnosticaEstado
};
