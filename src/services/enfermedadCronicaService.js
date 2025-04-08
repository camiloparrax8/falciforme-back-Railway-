const { EnfermedadCronica } = require("../database/models");
const apiResponse = require("../utils/apiResponse");

// Crear una nueva enfermedad crónica
const crearEnfermedadCronica = async (enfermedad) => {
  try {
    const nueva = await EnfermedadCronica.create({
      id_paciente: enfermedad.id_paciente,
      enfermedad: enfermedad.enfermedad,
      enfermedad_especifica: enfermedad.enfermedad_especifica,
      portador: enfermedad.portador,
      linea_parentesco_portador: enfermedad.linea_parentesco_portador,
      id_user_create: enfermedad.id_user_create,
    });

    return new apiResponse(
      "success",
      "Enfermedad crónica creada correctamente",
      nueva
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "error",
      "Error al crear la enfermedad crónica",
      error.message
    );
  }
};

// Consultar todas las enfermedades crónicas
const obtenerEnfermedadesCronicas = async (id_paciente) => {
  if (!id_paciente) {
    return new apiResponse("400", "El ID del paciente es obligatorio", null);
  }

  try {
    const enfemedadCronica = await EnfermedadCronica.findAll({
      where: {
        id_paciente: parseInt(id_paciente),
        is_deleted: false, // Filtrar solo registros no eliminados
      },
      attributes: [
        "id",
        "enfermedad",
        "enfermedad_especifica",
        "portador",
        "linea_parentesco_portador",
      ],
    });

    if (!enfemedadCronica.length) {
      //
      return new apiResponse(
        "404",
        "No se encontraron enfermedades cronicas",
        null
      );
    }

    return new apiResponse(
      "200",
      "enfermedades cronicas encontrados",
      enfemedadCronica
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "400",
      "Error al obtener enfermedades cronicas ",
      error.message
    );
  }
};

module.exports = {
  crearEnfermedadCronica,
  obtenerEnfermedadesCronicas,
};
