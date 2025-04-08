// const Vacuna = require("../database/models/vacunas");
const ApiResponse = require("../utils/apiResponse");
const { where } = require("sequelize");
const historiaClinicaService = require("./historiaClinicaService");
const { Vacuna } = require("../database/models");

const crearVacuna = async (vacuna) => {
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(vacuna.id_paciente);

  const nuevaVacuna = await Vacuna.create({
    id_historia_clinica: id_hc_open,
    nombre_vacuna: vacuna.nombre_vacuna,
    fecha: vacuna.fecha,
    estado: true,
    id_user_create: vacuna.id_user_create,
  });
  if (!nuevaVacuna)
    return new ApiResponse("400", "Vacuna guardada correctamente", null);
  return new ApiResponse("200", "Vacuna guardada correctamente", nuevaVacuna);
};

module.exports = {
  crearVacuna,
};
