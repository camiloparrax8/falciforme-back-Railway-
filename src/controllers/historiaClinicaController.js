const { response } = require("express");
const historiaClinicaService = require("../services/historiaClinicaService");

const buscarHcByIdPaciente = async (request, response, next) => {

    const idpaciente = request.params.id_paciente;

    if (!idpaciente) {
        return response.status(400).json({
            status: "error",
            message: "El ID del paciente es obligatorio"
        });
    }
    try {
        const apiResult = await historiaClinicaService.buscarHcByIdPaciente(idpaciente);

        if (apiResult.status === "404") {
            return response.status(404).json(apiResult);
        }
        return response.status(200).json(apiResult);
    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error: " + error.message
        });
    }
}

const getHcOpenById = async (request, response, next) => {
    const idpaciente = request.params.id_paciente;

    if (!idpaciente) {
        return response.status(400).json({
            status: "error",
            message: "El ID del paciente es obligatorio"
        });
    }

    try {
        const hcOpen = await historiaClinicaService.getHcOpenById(idpaciente);

        if (!hcOpen) {
            return response.status(404).json({
                status: "error",
                message: "No se encontró una historia clínica abierta para este paciente"
            });
        }

        return response.status(200).json({
            status: "success",
            data: hcOpen
        });

    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: "Ha ocurrido un error: " + error.message
        });
    }
}

module.exports = {
    buscarHcByIdPaciente,
    getHcOpenById,
};
