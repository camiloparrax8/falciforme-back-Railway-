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
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(complicacion.id_paciente);

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
      "Examen físico guardado correctamente",
      null
    );
  return new apiResponse(
    "success",
    "Examen físico guardado correctamente",
    nuevoExamen
  );
};

module.exports = {
  crearComplicacionesCronicas,
};
