const { where } = require("sequelize");
const {
  ComplicacionesCronicas,
  HistoriaClinica,
  Paciente,
} = require("../database/models");
const apiResponse = require("../utils/apiResponse");
// const id = require("faker/lib/locales/id_ID");
const historiaClinicaService = require("./historiaClinicaService");

const crearComplicacionesCronicas = async (complicacion) => {
  try {
    // Obtener el ID de la historia clínica abierta del paciente
    const id_hc_open = await historiaClinicaService.buscarHcOpenById(
      complicacion.id_paciente
    );

    // Primero verificamos si el paciente ya tiene una historia clínica abierta
    const historiasClinicas = await HistoriaClinica.findOne({
      where: {
        id_paciente: complicacion.id_paciente,
        estado: 1
      }
    });

    // Si existe una historia clínica abierta, verificamos si ya tiene complicaciones crónicas
    if (historiasClinicas && historiasClinicas.length > 0) {
      const idsHistoriasClinicas = historiasClinicas.map(hc => hc.id);

      const complicacionExistente = await ComplicacionesCronicas.findOne({
        where: {
          id_historia_clinica: idsHistoriasClinicas,
          estado: true
        }
      });

      if (complicacionExistente) {
        return new apiResponse(
          "error",
          "Ya existe un registro de complicaciones crónicas activo para este paciente en la historia clínica abierta",
          null
        );
      }
    }

    const nuevoExamen = await ComplicacionesCronicas.create({
      id_historia_clinica: id_hc_open,
      vasculopatia_cerebral: complicacion.vasculopatia_cerebral,
      infartos_cerebrales_silentes: complicacion.infartos_cerebrales_silentes,
      epilepsia_convulsiones: complicacion.epilepsia_convulsiones,
      cefaleas_recurrentes: complicacion.cefaleas_recurrentes,
      deficit_cognitivo: complicacion.deficit_cognitivo,
      retinopatia_drepanocitica: complicacion.retinopatia_drepanocitica,
      hemorragias_vitreas: complicacion.hemorragias_vitreas,
      neovascularizacion_retiniana: complicacion.neovascularizacion_retiniana,
      iritis_uveitis: complicacion.iritis_uveitis,
      oclusion_vasos_retinianos: complicacion.oclusion_vasos_retinianos,
      disfuncion_diastolica_vii: complicacion.disfuncion_diastolica_vii,
      sobrecarga_ferrica: complicacion.sobrecarga_ferrica,
      trombosis: complicacion.trombosis,
      hipertension_pulmonar: complicacion.hipertension_pulmonar,
      vrt: complicacion.vrt,
      numero_crisis: complicacion.numero_crisis,
      tratamientos: complicacion.tratamientos,
      hipomexia: complicacion.hipomexia,
      saos: complicacion.saos,
      edpfc_tratamiento: complicacion.edpfc_tratamiento,
      hepatitis_viral_cronica: complicacion.hepatitis_viral_cronica,
      esplenomegalia: complicacion.esplenomegalia,
      hiperesplenismo: complicacion.hiperesplenismo,
      nefropatia: complicacion.nefropatia,
      acidosis_tubular: complicacion.acidosis_tubular,
      priapismo_recurrente: complicacion.priapismo_recurrente,
      proteinuria: complicacion.proteinuria,
      hipotensia: complicacion.hipotensia,
      hematuria_necrosis_papilar: complicacion.hematuria_necrosis_papilar,
      enfermedad_renal_cronica: complicacion.enfermedad_renal_cronica,
      huesos_comprometidos: complicacion.huesos_comprometidos,
      osteonecrosis: complicacion.osteonecrosis,
      osteopenia: complicacion.osteopenia,
      grado_discapacidad: complicacion.grado_discapacidad,
      deformidades_osea: complicacion.deformidades_osea,
      estado: true,
      id_user_create: complicacion.id_user_create,
    });

    if (!nuevoExamen)
      return new apiResponse(
        "error",
        "Complicacion Cronica guardado correctamente",
        null
      );
    return new apiResponse(
      "success",
      "Complacion Cronica guardado correctamente",
      nuevoExamen
    );
  } catch (error) {
    return new apiResponse(
      "error",
      `Error al crear complicaciones crónicas: ${error.message}`,
      null
    );
  }
};

const actualizarComplicacionesCronicas = async (id, camposActualizar) => {
  try {
    // Verificar que la complicación existe
    const complicacionExistente = await ComplicacionesCronicas.findByPk(id);

    if (!complicacionExistente) {
      return null;
    }

    // Actualizar solo los campos proporcionados
    await complicacionExistente.update(camposActualizar);

    // Obtener el registro actualizado
    return complicacionExistente.reload();
  } catch (error) {
    throw new Error(`Error al actualizar complicación crónica: ${error.message}`);
  }
};

const buscarComplicacionesCronicasPorIdPaciente = async (idPaciente) => {
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

    // Buscamos las complicaciones crónicas más recientes para esa historia clínica
    const complicaciones = await ComplicacionesCronicas.findOne({
      where: {
        id_historia_clinica: historiaClinica.id,
        estado: true
      },
      order: [['createdAt', 'DESC']]
    });

    if (!complicaciones) {
      return new apiResponse(
        "error",
        "No se encontraron complicaciones crónicas para el paciente",
        null
      );
    }

    return new apiResponse(
      "success",
      "Complicaciones crónicas encontradas",
      complicaciones
    );

  } catch (error) {
    return new apiResponse(
      "error",
      `Error al buscar complicaciones crónicas: ${error.message}`,
      null
    );
  }
};

module.exports = {
  crearComplicacionesCronicas,
  actualizarComplicacionesCronicas,
  buscarComplicacionesCronicasPorIdPaciente,
};
