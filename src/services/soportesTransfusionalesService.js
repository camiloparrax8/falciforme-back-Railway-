const { where } = require("sequelize");
const { SoporteTransfusional } = require("../database/models");
const ApiResponse = require("../utils/apiResponse");
const historiaClinicaService = require("./historiaClinicaService");

const crearSoporteTransfusional = async (soporte) => {
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(soporte.id_paciente);

  const nuevoSoporte = await SoporteTransfusional.create({
    id_historia_clinica: id_hc_open,
    fecha: soporte.fecha,
    soporte_transfusional: soporte.soporte_transfusional,
    numero_transfusiones: soporte.numero_transfusiones,
    frecuencia: soporte.frecuencia,
    aloinmunizacion: soporte.aloinmunizacion,
    fecha_sobrecarga_hierro: soporte.fecha_sobrecarga_hierro,
    quelentes: soporte.quelentes,
    ferritina: soporte.ferritina,
    ferritina_dosis: soporte.ferritina_dosis,
    fecha_sobrecarga_organo: soporte.fecha_sobrecarga_organo,
    lic: soporte.lic,
    pancreatica: soporte.pancreatica,
    evaluacion_cardiaca: soporte.evaluacion_cardiaca,
    estado: true,
    id_user_create: soporte.id_user_create,
  });
  if (!nuevoSoporte)
    return new ApiResponse(
      "400",
      "Soporte Transfusional No se guardado correctamente",
      null
    );
  return new ApiResponse(
    "200",
    "Soporte Transfusional guardado correctamente",
    nuevoSoporte
  );
};

module.exports = {
  crearSoporteTransfusional,
};
