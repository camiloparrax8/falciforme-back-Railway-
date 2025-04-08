const { Acompanante } = require("../database/models");
const apiResponse = require("../utils/apiResponse");
const { Op } = require("sequelize"); // Importar operadores de Sequelize

const crearAcompanante = async (acompanante) => {
  try {
    const nuevo = await Acompanante.create({
      nombre: acompanante.nombre,
      apellido: acompanante.apellido,
      celular: acompanante.celular,
      correo: acompanante.correo,
      ocupacion: acompanante.ocupacion,
      municipio: acompanante.municipio,
      departamento: acompanante.departamento,
      direccion: acompanante.direccion, // Nuevo campo
      tipo_identificacion: acompanante.tipo_identificacion, // Campo obligatorio
      identificacion: acompanante.identificacion, // Campo único
      tipo_vivienda: acompanante.tipo_vivienda, // Nuevo campo
      nivel_ingreso: acompanante.nivel_ingreso, // Nuevo campo
      nivel_academico: acompanante.nivel_academico, // Nuevo campo
      tipo_vehiculo: acompanante.tipo_vehiculo, // Nuevo campo

      // Auditoría
      id_user_create: acompanante.id_user_create,
      id_user_update: acompanante.id_user_update || null,
      id_user_delete: acompanante.id_user_delete || null,
    });

    return new apiResponse("200", "Acompañante creado correctamente", nuevo);
  } catch (error) {
    console.error(error);
    return new apiResponse("400", "Error al crear el acompañante", null);
  }
};


const buscarAcompanantePorIdentificacion = async (identificacion) => {
  try {
    if (!identificacion) {
        return new apiResponse("400", "Error al obtener los pacientes", null);
      }
    const acompanantes = await Acompanante.findAll({
      where: {
        identificacion: identificacion,
      },
    });

    if (!acompanantes.length) {
      return new apiResponse(
        "404",
        `No se encontraron acompañantes con la identificación: ${identificacion}`,
        null
      );
    }

    return new apiResponse("200", "Acompañantes encontrados", acompanantes);
  } catch (error) {
    console.error(error);
    return new apiResponse("400", "Error al buscar los acompañantes", null);
  }
};

module.exports = {
  crearAcompanante,
  buscarAcompanantePorIdentificacion, // Cambié el nombre del método
};
