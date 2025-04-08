const { Model } = require("sequelize");
const complicacionesCronicasService = require("../services/complicacionesCronicasService");

const createComplicacionesCronicas = async (request, response, next) => {
  try {
    const ComplicacionesCronicas = await complicacionesCronicasService.crearComplicacionesCronicas(request.body);
    response.status(200).json(ComplicacionesCronicas);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

module.exports = {
  createComplicacionesCronicas,
};
