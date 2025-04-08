const { EsquemaVacunacion, Paciente, Vacuna } = require("../database/models");
const apiResponse = require("../utils/apiResponse");

const crearEsquemaVacunacion = async (esquema) => {
  try {
    const nuevo = await EsquemaVacunacion.create({
      id_paciente: esquema.id_paciente,
      id_vacunacion: esquema.id_vacunacion,
      estado: esquema.estado,
      fecha_vacunacion: esquema.fecha_vacunacion,
      dosis: esquema.dosis,
      id_user_create: esquema.id_user_create,
    });

    return new apiResponse(
      "success",
      "Esquema de vacunación creado correctamente",
      nuevo
    );
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "error",
      "Error al crear el esquema de vacunación",
      error.message
    );
  }
};
const obtenerVacunasPorPaciente = async (id_paciente) => {
  try {
    if (!id_paciente) {
      return new apiResponse("400", "El ID del paciente es obligatorio", null);
    }

    const esquemaVacunacion = await EsquemaVacunacion.findAll({
      where: {
        id_paciente: parseInt(id_paciente),
        is_deleted: false, // Filtrar solo registros no eliminados
      },
      include: [
        {
          model: Vacuna,
          as: "vacuna",
          attributes: ["id", "nombre", "descripcion"],
          where: {
            is_deleted: false, // Filtrar vacunas activas
          },
          required: true,
        },
      ],
    });

    if (!esquemaVacunacion.length) {
      return new apiResponse(
        "404",
        "No se encontraron vacunas activas para este paciente",
        null
      );
    }

    // ✅ Transformar la respuesta y organizar por fecha
    const vacunas = esquemaVacunacion
      .map(item => ({
        id: item.vacuna.id,
        nombre: item.vacuna.nombre,
        dosis: item.dosis,
        fecha: item.fecha_vacunacion 
          ? new Date(item.fecha_vacunacion).toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            }) 
          : 'Sin fecha',
      }))
      .sort((a, b) => {
        const fechaA = new Date(a.fecha.split('/').reverse().join('-'));
        const fechaB = new Date(b.fecha.split('/').reverse().join('-'));
        return fechaB - fechaA; // Orden descendente (más reciente primero)
      });

    return new apiResponse(
      "200",
      "Vacunas activas encontradas",
      vacunas
    );

  } catch (error) {
    return new apiResponse(
      "400",
      "Error al obtener las vacunas del paciente",
      error.message
    );
  }
};



module.exports = {
  crearEsquemaVacunacion,
  obtenerVacunasPorPaciente,
};
