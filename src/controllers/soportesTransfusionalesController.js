const { Model } = require("sequelize");
const SoportesTransfusionalesService = require("../services/soportesTransfusionalesService");

const createSoportesTransfusionales = async (request, response, next) => {
  try {
    const soporteTransfusional = await SoportesTransfusionalesService.crearSoporteTransfusional(request.body);
    response.status(200).json(soporteTransfusional);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

module.exports = {
  createSoportesTransfusionales,
};
