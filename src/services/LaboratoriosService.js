const { where } = require("sequelize");
const { Laboratorio, HistoriaClinica, Paciente } = require("../database/models");
const ApiResponse = require("../utils/apiResponse");
const historiaClinicaService = require("./historiaClinicaService");

const crearLaboratorio = async (laboratorio) => {
    // Primero verificamos si el paciente ya tiene una historia clínica abierta
    const historiasClinicas = await HistoriaClinica.findAll({
        where: {
            id_paciente: laboratorio.id_paciente,
            estado: 1
        }
    });

    // Si existe una historia clínica abierta, continuamos con la creación
    if (historiasClinicas && historiasClinicas.length > 0) {

        // Si no existe un laboratorio previo, continuamos con la creación
        const id_hc_open = await historiaClinicaService.buscarHcOpenById(laboratorio.id_paciente);

        const nuevoLaboratorio = await Laboratorio.create({
            id_historia_clinica: id_hc_open,
            hematies: laboratorio.hematies,
            hematocritos: laboratorio.hematocritos,
            mch: laboratorio.mch,
            rdw: laboratorio.rdw,
            hemoglobina: laboratorio.hemoglobina,
            mcv: laboratorio.mcv,
            mchc: laboratorio.mchc,
            estado: true,
        });

        if (!nuevoLaboratorio)
            return new ApiResponse(
                "error",
                "Laboratorio no se guardó correctamente",
                null
            );
        return new ApiResponse(
            "success",
            "Laboratorio guardado correctamente",
            nuevoLaboratorio
        );
    }
};

const buscarLaboratoriosPorIdPaciente = async (idPaciente) => {
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

        // Buscamos todos los laboratorios para esa historia clínica
        const laboratorios = await Laboratorio.findAll({
            where: {
                id_historia_clinica: historiaClinica.id,
                estado: true
            },
            order: [['createdAt', 'DESC']]
        });

        return new ApiResponse(
            "success",
            "Laboratorios encontrados",
            laboratorios
        );

    } catch (error) {
        return new ApiResponse(
            "error",
            `Error al buscar laboratorios: ${error.message}`,
            null
        );
    }
};

const actualizarEstadoLaboratorio = async (idLaboratorio, isDeleted) => {
    try {
        // Buscamos el laboratorio por ID
        const laboratorio = await Laboratorio.findByPk(idLaboratorio);

        if (!laboratorio) {
            return new ApiResponse(
                "error",
                "No se encontró el laboratorio",
                null
            );
        }

        // Actualizamos el estado (en este caso invertimos el valor de "estado"
        // ya que en el backend usas "estado:true" para activos)
        await laboratorio.update({
            estado: !isDeleted
        });

        return new ApiResponse(
            "success",
            isDeleted ? "Laboratorio eliminado lógicamente" : "Laboratorio restaurado",
            laboratorio
        );
    } catch (error) {
        return new ApiResponse(
            "error",
            `Error al actualizar estado del laboratorio: ${error.message}`,
            null
        );
    }
};

module.exports = {
    crearLaboratorio,
    buscarLaboratoriosPorIdPaciente,
    actualizarEstadoLaboratorio
};
