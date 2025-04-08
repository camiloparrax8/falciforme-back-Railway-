const laboratorioService = require("../services/LaboratoriosService");

const createLaboratorio = async (request, response, next) => {
    try {
        const laboratorio = await laboratorioService.crearLaboratorio(request.body);
        response.status(200).json(laboratorio);
    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error al crear el laboratorio: " + error.message,
            data: null
        });
    }
};

const getLaboratoriosByPaciente = async (request, response, next) => {
    try {
        const { id_paciente } = request.params;

        if (!id_paciente) {
            return response.status(400).json({
                status: "error",
                message: "El ID del paciente es requerido",
                data: null
            });
        }

        const resultado = await laboratorioService.buscarLaboratoriosPorIdPaciente(id_paciente);

        if (resultado.status === "error" && resultado.message.includes("No se encontró")) {
            return response.status(404).json(resultado);
        }

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error al buscar los laboratorios: " + error.message,
            data: null
        });
    }
};

const updateLaboratorioEstado = async (request, response, next) => {
    try {
        const { id } = request.params;
        const { is_deleted } = request.body;

        const resultado = await laboratorioService.actualizarEstadoLaboratorio(id, is_deleted);

        if (resultado.status === "error") {
            return response.status(404).json(resultado);
        }

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error al actualizar el laboratorio: " + error.message,
            data: null
        });
    }
};

module.exports = {
    createLaboratorio,
    getLaboratoriosByPaciente,
    updateLaboratorioEstado
};


