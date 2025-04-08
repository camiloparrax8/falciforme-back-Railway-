const { where } = require("sequelize");
const { Tratamiento } = require("../database/models");
const ApiResponse = require("../utils/apiResponse");
const historiaClinicaService = require("./historiaClinicaService");

const crearTratamiento = async (tratamiento) => {
  const id_hc_open = await historiaClinicaService.buscarHcOpenById(tratamiento.id_paciente);

  const nuevoTratamiento = await Tratamiento.create({
    id_historia_clinica: id_hc_open,
    titulo: tratamiento.titulo,
    n_dias: tratamiento.n_dias,
    dosis: tratamiento.dosis,
    tipo: tratamiento.tipo,
    estado: true,
    id_user_create: tratamiento.id_user_create,
  });

  if (!nuevoTratamiento)
    return new ApiResponse("400", "Tratamiento guardado correctamente", null);
  return new ApiResponse("200", "Tratamiento guardado correctamente", nuevoTratamiento);
};

module.exports = {
  crearTratamiento,
};
