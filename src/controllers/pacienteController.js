const pacienteService = require("../services/pacienteService");

const createPaciente = async (request, response, next) => {
  try {
    const paciente = await pacienteService.crearPaciente(request.body);
    response.status(200).json(paciente);
  } catch (error) {
    response.status(500).json("Ha ocurrido un error: " + error);
  }
};
const ActualizarRedPrimaria = async (request, response, next) => {
  try {
    const { idPaciente, idRedPrimaria } = request.body;
    const result = await pacienteService.actualizarRedPrimaria(
      idPaciente,
      idRedPrimaria
    );
    response.status(result.status === "success" ? 200 : 400).json(result);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};
const ActualizarAcompanante = async (request, response, next) => {
  try {
    const { idPaciente, idAcompanante } = request.body;
    const result = await pacienteService.actualizarAcompanante(
      idPaciente,
      idAcompanante
    );

    response.status(result.status === "success" ? 200 : 400).json(result);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};
const getPacientesId = async (request, response, next) => {
  const identificacion = request.params.identificacion;
  console.log("identificacion", identificacion);

  if (!identificacion) {
    return response.status(400).json({
      status: "La solicitud está mal formada o tiene datos inválidos.",
      message: "El ID del paciente es obligatorio",
    });
  }
  try {
    const paciente = await pacienteService.obtenerPaciente(identificacion);
    response.status(paciente.status).json(paciente);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};
const getPacientesId2 = async (request, response, next) => {
  const id = request.params.id;

  if (!id) {
    return response.status(400).json({
      status: "La solicitud está mal formada o tiene datos inválidos.",
      message: "El ID del paciente es obligatorio",
    });
  }
  try {
    const paciente = await pacienteService.obtenerPacientePorId(id);
    response.status(paciente.status).json(paciente);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

const getRedPrimariaIdPaciente = async (request, response, next) => {
  const idpaciente = request.params.idpaciente;

  if (!idpaciente) {
    return response.status(400).json({
      status: "error",
      message: "El ID del paciente es obligatorio"
    });
  }

  try {
    const apiResult = await pacienteService.obtenerRedPrimaria(idpaciente);

    if (apiResult.status === "404") {
      return response.status(404).json(apiResult);
    }
    return response.status(200).json(apiResult);
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message
    });
  }
};



module.exports = {
  createPaciente,
  ActualizarRedPrimaria,
  ActualizarAcompanante,
  getPacientesId,
  getRedPrimariaIdPaciente,
  getPacientesId2
};
