const { EstadoHBS } = require("../database/models");
const apiResponse = require("../utils/apiResponse");

// Crear un nuevo estado HBS
const crearEstadoHBS = async (estado) => {
  try {
    const nuevo = await EstadoHBS.create({
      parentesco: estado.parentesco,
      linea_parentesco: estado.linea_parentesco,
      estado: estado.estado,
      id_paciente: estado.id_paciente,
      id_user_create: estado.id_user_create,
    });

    return new apiResponse("success", "Estado HBS creado correctamente", nuevo);
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "error",
      "Error al crear el estado HBS",
      error.message
    );
  }
};

// Consultar todos los estados HBS
const obtenerEstadosHBS = async (id_paciente) => {
  if (!id_paciente) {
    return new apiResponse("400", "El ID del paciente es obligatorio", null);
  }

  try {
    const antecedentes = await EstadoHBS.findAll({
      where: {
        id_paciente: parseInt(id_paciente),
        is_deleted: false, // Filtrar solo registros no eliminados
      },
    });

    if (!antecedentes.length) {
      //
      return new apiResponse("404", "No se encontraron Estado HBS", null);
    }

    return new apiResponse(
      "200",
      "Antecedentes Estado HBS encontrados",
      antecedentes
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "400",
      "Error al obtener los Estado HBS ",
      error.message
    );
  }
};

module.exports = {
  crearEstadoHBS,
  obtenerEstadosHBS,
};
