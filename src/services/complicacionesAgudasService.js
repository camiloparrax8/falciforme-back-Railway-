const { where } = require("sequelize");
const {
  ComplicacionesAgudas,
  HistoriaClinica,
  Paciente,
} = require("../database/models");
const apiResponse = require("../utils/apiResponse");
const historiaClinicaService = require("./historiaClinicaService");

const crearComplicacionesAgudas = async (complicacion) => {
  try {
    // Obtener el ID de la historia clínica abierta del paciente
    const id_hc_open = await historiaClinicaService.buscarHcOpenById(
      complicacion.id_paciente
    );

    // Verificar si ya existe una complicación aguda activa para esta historia clínica
    const complicacionExistente = await ComplicacionesAgudas.findOne({
      where: {
        id_historia_clinica: id_hc_open,
        estado: true,
        is_deleted: false
      }
    });

    // Si ya existe una complicación aguda activa, no permitir crear otra
    if (complicacionExistente) {
      return new apiResponse(
        "error",
        "Ya existe una complicación aguda activa para esta historia clínica",
        null
      );
    }

    // Crear la nueva complicación aguda
    const nuevaComplicacion = await ComplicacionesAgudas.create({
      id_historia_clinica: id_hc_open,
      fecha: complicacion.fecha,
      dias_crisis: complicacion.dias_crisis,
      intensidad: complicacion.intensidad,
      manejo: complicacion.manejo,
      tratamiento: complicacion.tratamiento,
      huesos_afectados: complicacion.huesos_afectados,
      germen: complicacion.germen,
      tratamiento_infecciones: complicacion.tratamiento_infecciones,
      dias_infeccion: complicacion.dias_infeccion,
      crisis_aplastica_infecciosa: complicacion.crisis_aplastica_infecciosa,
      estado: true,
      id_user_create: complicacion.id_user_create,
      id_user_update: complicacion.id_user_create,
    });

    if (!nuevaComplicacion) {
      return new apiResponse(
        "error",
        "Error al guardar la complicación aguda",
        null
      );
    }

    return new apiResponse(
      "success",
      "Complicación aguda guardada correctamente",
      nuevaComplicacion
    );
  } catch (error) {
    console.error("Error en crearComplicacionesAgudas:", error);
    return new apiResponse(
      "error",
      "Error al crear la complicación aguda: " + error.message,
      null
    );
  }
};

const obtenerComplicacionAgudaPorPaciente = async (id_paciente) => {
  try {
    // Primero verificamos que el paciente exista
    const paciente = await Paciente.findByPk(id_paciente);
    if (!paciente) {
      return new apiResponse("error", "El paciente no existe", null);
    }
    // Buscamos la historia clínica activa del paciente
    const historiaClinica = await HistoriaClinica.findOne({
      where: { id_paciente, estado: 1 },
    });

    if (!historiaClinica) {
      return new apiResponse("error", "El paciente no tiene una historia clinica activa", null);
    }

    // Buscamos las complicaciones agudas de la historia clínica
    const complicaciones = await ComplicacionesAgudas.findOne({
      where: { id_historia_clinica: historiaClinica.id, estado: true },
      order: [['createdAt', 'DESC']]
    });

    if (!complicaciones) {
      return new apiResponse("error", "No se encontraron complicaciones agudas para el paciente", null);
    }
    return new apiResponse("success", "Complicaciones agudas obtenidas correctamente", complicaciones);
  } catch (error) {
    console.error("Error en obtenerComplicacionAgudaPorPaciente:", error);
    return new apiResponse("error", "Error al obtener las complicaciones agudas", error);
  }
};


module.exports = {
  crearComplicacionesAgudas,
  obtenerComplicacionAgudaPorPaciente,
};
