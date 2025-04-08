const enfermedadCronicaService = require("../services/enfermedadCronicaService");

// Crear una nueva enfermedad crónica
const createEnfermedadCronica = async (request, response, next) => {
  try {
    const enfermedad = await enfermedadCronicaService.crearEnfermedadCronica(
      request.body
    );
    response.status(200).json(enfermedad);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};

// Consultar todas las enfermedades crónicas
const getEnfermedadesCronicas = async (request, response, next) => {
  const id_paciente = request.params.id_paciente; // Capturar el ID del paciente desde la URL

  if (!id_paciente) {
    return response.status(400).json({
      status: "error",
      message: "El ID del paciente es obligatorio",
    });
  }

  try {
    const enfermedadesData =
      await enfermedadCronicaService.obtenerEnfermedadesCronicas(id_paciente);

    // Mapear y transformar los datos
    const enfermedades = enfermedadesData.data.reduce((acc, item) => {
      // Buscar si ya existe la enfermedad y especifica
      let enfermedadExistente = acc.find(
        (e) =>
          e.enfermedad === item.enfermedad &&
          e.especifica === item.enfermedad_especifica
      );

      // Asignar color según línea de parentesco
      const colorMap = {
        "Padre": "emerald",
        "Madre": "emerald",
        "Abuelo Paterno": "emerald",
        "Abuela Paterno": "emerald",
        "Abuelo Materno": "emerald",
        "Abuela Materno": "emerald",
      };

      if (!enfermedadExistente) {
        // Si no existe, crearla
        enfermedadExistente = {
          enfermedad: item.enfermedad,
          especifica: item.enfermedad_especifica,
          portadores: [],
        };
        acc.push(enfermedadExistente);
      }

      // Agregar portador si existe
      if (item.portador === "Sí" && item.linea_parentesco_portador) {
        enfermedadExistente.portadores.push({
          nombre: item.linea_parentesco_portador,
          color: colorMap[item.linea_parentesco_portador] || "emerald",
        });
      }

      return acc;
    }, []);

    response.status(200).json({
      status: "success",
      data: enfermedades,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "Ha ocurrido un error: " + error.message,
    });
  }
};


module.exports = {
  createEnfermedadCronica,
  getEnfermedadesCronicas,
};
