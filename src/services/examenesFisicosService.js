const { where } = require("sequelize");
const {
  ExamenesFisico,
  HistoriaClinica,
  Paciente,
} = require("../database/models");
const apiResponse = require("../utils/apiResponse");
// const id = require("faker/lib/locales/id_ID");
const historiaClinicaService = require("./historiaClinicaService");

const crearExamenFisico = async (examen) => {
  // Primero verificamos si el paciente ya tiene una historia clínica abierta
  const historiasClinicas = await HistoriaClinica.findAll({
    where: {
      id_paciente: examen.id_paciente,
      estado: 1
    }
  });

  // Si existe una historia clínica abierta, verificamos si ya tiene un examen físico
  if (historiasClinicas && historiasClinicas.length > 0) {
    const idsHistoriasClinicas = historiasClinicas.map(hc => hc.id);

    const examenExistente = await ExamenesFisico.findOne({
      where: {
        id_historia_clinica: idsHistoriasClinicas,
        estado: true
      }
    });

    if (examenExistente) {
      return new apiResponse(
        "error",
        "Ya existe un examen físico activo para este paciente en la historia clínica abierta",
        null
      );
    }
  }

  // Si no existe un examen previo, continuamos con la creación
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(examen.id_paciente);

  const nuevoExamen = await ExamenesFisico.create({
    id_historia_clinica: id_hc_open,
    frecuencia_cardiaca: examen.frecuencia_cardiaca,
    frecuencia_respiratoria: examen.frecuencia_respiratoria,
    saturacion_oxigeno: examen.saturacion_oxigeno,
    tension_arterial: examen.tension_arterial,
    peso: examen.peso,
    talla: examen.talla,
    percentil: examen.percentil,
    imc: examen.imc,
    deficit_zinc: examen.deficit_zinc,
    deficit_acido_folico: examen.deficit_acido_folico,
    deficit_vitamina_d: examen.deficit_vitamina_d,
    desnutricion: examen.desnutricion,
    obesidad: examen.obesidad,
    perimetro_cefalico: examen.perimetro_cefalico,
    vision: examen.vision,
    examen_boca: examen.examen_boca,
    examen_nariz: examen.examen_nariz,
    examen_oidos: examen.examen_oidos,
    caries: examen.caries || null,
    cuello: examen.cuello,
    cardio_pulmunar: examen.cardio_pulmunar,
    condicion_abdominal: examen.condicion_abdominal,
    tanner: examen.tanner,
    extremidades_observacion: examen.extremidades_observacion,
    extremidades_estado_piel: examen.extremidades_estado_piel,
    extremidades_condicion: examen.extremidades_condicion,
    estado: true,
    id_user_create: examen.id_user_create,
  });
  if (!nuevoExamen)
    return new apiResponse(
      "error",
      "Examen físico guardado correctamente",
      null
    );
  return new apiResponse(
    "success",
    "Examen físico guardado correctamente",
    nuevoExamen
  );
};

const actualizarExamenFisico = async (id, camposActualizar) => {
  try {
    // Verificar que el examen existe
    const examenExistente = await ExamenesFisico.findByPk(id);

    if (!examenExistente) {
      return null;
    }

    // Actualizar solo los campos proporcionados
    await examenExistente.update(camposActualizar);

    // Obtener el registro actualizado
    return examenExistente.reload();
  } catch (error) {
    throw new Error(`Error al actualizar examen físico: ${error.message}`);
  }
};

const buscarExamenFisicoPorIdPaciente = async (idPaciente) => {
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

    // Buscamos el examen físico más reciente para esa historia clínica
    const examenFisico = await ExamenesFisico.findOne({
      where: {
        id_historia_clinica: historiaClinica.id,
        estado: true
      },
      order: [['createdAt', 'DESC']]
    });

    if (!examenFisico) {
      return new apiResponse(
        "error",
        "No se encontró examen físico para el paciente",
        null
      );
    }

    return new apiResponse(
      "success",
      "Examen físico encontrado",
      examenFisico
    );

  } catch (error) {
    return new apiResponse(
      "error",
      `Error al buscar examen físico: ${error.message}`,
      null
    );
  }
};

module.exports = {
  crearExamenFisico,
  actualizarExamenFisico,
  buscarExamenFisicoPorIdPaciente,
};
