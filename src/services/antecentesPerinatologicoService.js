const { where } = require("sequelize");
const { AntecedentePerinatologico } = require("../database/models");
const apiResponse = require("../utils/apiResponse");

// Crear un nuevo antecedente perinatológico
const crearAntecedentePerinatologico = async (antecedente) => {
  try {
    const nuevo = await AntecedentePerinatologico.create({
      peso_al_nacer: antecedente.peso_al_nacer,
      talla_al_nacer: antecedente.talla_al_nacer,
      nota: antecedente.nota,
      condicion_al_nacer: antecedente.condicion_al_nacer,
      cuidado_neonatal: antecedente.cuidado_neonatal,
      etirico_neonatal: antecedente.etirico_neonatal,
      id_paciente: antecedente.id_paciente,
      id_user_create: antecedente.id_user_create,
    });

    return new apiResponse(
      "success",
      "Antecedente perinatológico creado correctamente",
      nuevo
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "error",
      "Error al crear el antecedente perinatológico",
      error.message
    );
  }
};

// Consultar todos los antecedentes perinatológicos
const obtenerAntecedentesPerinatologicos = async (id_paciente) => {
  if (!id_paciente) {
    return new apiResponse("400", "El ID del paciente es obligatorio", null);
  }
  try {
    const antecedentes = await AntecedentePerinatologico.findAll({
      where: {
        id_paciente: parseInt(id_paciente),
        is_deleted: false, // Filtrar solo registros no eliminados
      },
    });

    if (!antecedentes.length) {
      //
      return new apiResponse(
        "404",
        "No se encontraron antecedentes perinatológicos",
        null
      );
    }

    return new apiResponse(
      "200",
      "Antecedentes perinatológicos encontrados",
      antecedentes
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "400",
      "Error al obtener los antecedentes perinatológicos",
      error.message
    );
  }
};

module.exports = {
  crearAntecedentePerinatologico,
  obtenerAntecedentesPerinatologicos,
};
