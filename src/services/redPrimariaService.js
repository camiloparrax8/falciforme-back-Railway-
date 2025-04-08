const { RedPrimaria } = require("../database/models");
const apiResponse = require("../utils/apiResponse");
const { Op } = require("sequelize"); // Importar operadores de Sequelize

const crearRedPrimaria = async (redPrimaria) => {
  try {
    const nuevo = await RedPrimaria.create({
      fecha: redPrimaria.fecha,
      hospital: redPrimaria.hospital,
      correo: redPrimaria.correo,
      telefono: redPrimaria.telefono,
      telefono_urgencias: redPrimaria.telefono_urgencias,
      municipio: redPrimaria.municipio,
      departamento: redPrimaria.departamento,
      id_user_create: redPrimaria.id_user_create,
    });

    return new apiResponse(
      "success",
      "Red Primaria creada correctamente",
      nuevo
    );
  } catch (error) {
    console.error(error);
    return new apiResponse("error", "Error al crear la Red Primaria", null);
  }
};

const buscarRedPrimariaPorHospital = async (hospital) => {
  try {
    if (!hospital) {
      return new apiResponse("400", "Error al obtener los Hospitales", null);
    }
    const redPrimarias = await RedPrimaria.findAll({
      where: {
        hospital: {
          [Op.like]: `%${hospital}%`,
        },
      },
    });
    if (!redPrimarias.length) {
      return new apiResponse(
        "404",
        `No se encontraron redes primarias con el hospital: ${hospital}`,
        null
      );
    }

    return new apiResponse(
      "200",
      "Redes Primarias encontradas",
      redPrimarias
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "400",
      "Error al buscar las Redes Primarias por hospital",
      null
    );
  }
};

module.exports = {
  crearRedPrimaria,
  buscarRedPrimariaPorHospital,
};
