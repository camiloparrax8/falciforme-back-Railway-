const { Model } = require("sequelize");
const TratamientosService = require("../services/TratamientosServices");


const createTratamiento = async (request, response, next) => {
  const tratamiento = request.body;
  try {
    const tratamientoCreada = await TratamientosService.crearTratamiento(tratamiento);
    response.status(200).json(tratamientoCreada);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};

module.exports = {  
    createTratamiento,
};
