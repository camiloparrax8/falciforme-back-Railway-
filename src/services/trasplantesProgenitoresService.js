const { where } = require("sequelize");
const { TransplanteProgenitores, HistoriaClinica, Paciente } = require("../database/models");
const apiResponse = require("../utils/apiResponse");
// const id = require("faker/lib/locales/id_ID");
const historiaClinicaService = require("./historiaClinicaService");

const crearTransplanteProgenitores = async (data) => {
  // Primero verificamos si el paciente ya tiene una historia clínica abierta
  const historiasClinicas = await HistoriaClinica.findAll({
    where: {
      id_paciente: data.id_paciente,
      estado: 1
    }
  });

  // Si existe una historia clínica abierta, verificamos si ya tiene un trasplante de progenitores
  if (historiasClinicas && historiasClinicas.length > 0) {
    const idsHistoriasClinicas = historiasClinicas.map(hc => hc.id);

    const trasplanteExistente = await TransplanteProgenitores.findOne({
      where: {
        id_historia_clinica: idsHistoriasClinicas,
        estado: true
      }
    });

    if (trasplanteExistente) {
      return new apiResponse(
        "error",
        "Ya existe un registro de trasplante de progenitores activo para este paciente en la historia clínica abierta",
        null
      );
    }
  }

  // Si no existe un trasplante previo, continuamos con la creación
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(data.id_paciente);

  const nuevoTrasplante = await TransplanteProgenitores.create({
    id_historia_clinica: id_hc_open,
    paciente: data.paciente,
    padres: data.padres,
    hermanos: data.hermanos,
    tipo_indicaciones: data.tipo_indicaciones,
    estado: true,
    id_user_create: data.id_user_create,
  });

  if (!nuevoTrasplante)
    return new apiResponse(
      "error",
      "Error al guardar el trasplante de progenitores",
      null
    );
  return new apiResponse(
    "success",
    "Trasplante de progenitores guardado correctamente",
    nuevoTrasplante
  );
};

const buscarTransplantePorIdPaciente = async (idPaciente) => {
  try {
    // Primero verificamos que el paciente exista
    const paciente = await Paciente.findByPk(idPaciente);
    if (!paciente) {
      return new apiResponse(
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
      return new apiResponse(
        "error",
        "El paciente no tiene una historia clínica activa",
        null
      );
    }

    // Buscamos el trasplante de progenitores más reciente para esa historia clínica
    const trasplante = await TransplanteProgenitores.findOne({
      where: {
        id_historia_clinica: historiaClinica.id,
        estado: true
      },
      order: [['createdAt', 'DESC']]
    });

    if (!trasplante) {
      return new apiResponse(
        "error",
        "No se encontró registro de trasplante de progenitores para el paciente",
        null
      );
    }

    return new apiResponse(
      "success",
      "Trasplante de progenitores encontrado",
      trasplante
    );

  } catch (error) {
    return new apiResponse(
      "error",
      `Error al buscar trasplante de progenitores: ${error.message}`,
      null
    );
  }
};

module.exports = {
  crearTransplanteProgenitores,
  buscarTransplantePorIdPaciente
};
