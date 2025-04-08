const { where } = require("sequelize");
const { Paciente, Acompanante, RedPrimaria } = require("../database/models");
const apiResponse = require("../utils/apiResponse");



const crearPaciente = async (paciente) => {
  const nuevo = await Paciente.create({
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    tipo_identificacion: paciente.tipo_identificacion,
    identificacion: paciente.identificacion,
    fecha_nacimiento: paciente.fecha_nacimiento,
    sexo: paciente.sexo,
    identidad_genero: paciente.identidad_genero,
    identidad_sexual: paciente.identidad_sexual,
    estrato: paciente.estrato,
    ocupacion: paciente.ocupacion,
    residente: paciente.residente,
    direccion: paciente.direccion,
    procedente: paciente.procedente,
    regimen: paciente.regimen,
    celular: paciente.celular,
    correo: paciente.correo,
    municipio: paciente.municipio,
    departamento: paciente.departamento,
    id_user_create: paciente.id_user_create,
  });

  return new apiResponse("success", "Paciente creado correctamente", nuevo);
};

const obtenerRedPrimaria = async (id) => {
  try {////editar
    const paciente = await Paciente.findByPk(id, {
      include: [{ model: RedPrimaria, as: "redPrimaria" }]
    });

    if (!paciente) {
      return new apiResponse("400", "Paciente no encontrado");
    }

    if (!paciente.redPrimaria) {
      return new apiResponse("404", "El paciente no tiene una red primaria asignada");
    }
    return new apiResponse("200", "Red primaria encontrada", paciente.redPrimaria);
  } catch (error) {
    return new apiResponse("400", "Error al buscar la red primaria", error.message);
  }
};


const actualizarRedPrimaria = async (idPaciente, idRedPrimaria) => {
  try {
    const paciente = await Paciente.findByPk(idPaciente);

    if (!paciente) {
      return new apiResponse("error", "Paciente no encontrado");
    }

    const redPrimaria = await RedPrimaria.findByPk(idRedPrimaria);

    if (!redPrimaria) {
      return new apiResponse("error", "Paciente no encontrado");
    }

    paciente.id_red_primaria = idRedPrimaria;
    await paciente.save();
    return new apiResponse(
      "success",
      "Red primaria actualizada correctamente",
      paciente
    );
  } catch (error) {
    return new apiResponse(
      "error",
      "Error al actualizar red primaria",
      error.message
    );
  }
};
const actualizarAcompanante = async (idPaciente, idAcompanante) => {
  try {
    const paciente = await Paciente.findByPk(idPaciente);

    if (!paciente) {
      return new apiResponse("error", "Paciente no encontrado");
    }
    const acompanante = await Acompanante.findByPk(idAcompanante);

    if (!acompanante) {
      return new apiResponse("error", "acompanante no encontrado");
    }

    paciente.id_acompaniante = idAcompanante;
    await paciente.save();
    return new apiResponse(
      "success",
      "Acompaniante actualizada correctamente",
      paciente
    );
  } catch (error) {
    return new apiResponse(
      "error",
      "Error al actualizar Acompaniante",
      error.message
    );
  }
};

const obtenerPaciente = async (identificacion) => {
  try {
    if (!identificacion) {
      return new apiResponse("400", "Error al obtener los pacientes", null);
    }
    const paciente = await Paciente.findOne({
      where: {
        identificacion: identificacion,
      },
      include: [
        {
          model: Acompanante,
          as: "acompaniante",
          required: false,
        },
        {
          model: RedPrimaria,
          as: "redPrimaria",
          required: false,
        },
      ],
    });
    if (!paciente) {
      return new apiResponse("404", "No existe el paciente", null);
    }
    return new apiResponse("200", "", paciente);
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "400",
      "Error al obtener los pacientes",
      error.message
    );
  }
};


// ... existing code ...

const obtenerPacientePorId = async (id) => {
  try {
    if (!id) {
      return new apiResponse("400", "ID de paciente no proporcionado", null);
    }
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return new apiResponse("404", "No existe el paciente con ese ID", null);
    }
    return new apiResponse("200", "", paciente);
  } catch (error) {
    console.error(error);
    return new apiResponse(
      "400",
      "Error al obtener el paciente por ID",
      error.message
    );
  }
};

module.exports = {
  crearPaciente,
  actualizarRedPrimaria,
  actualizarAcompanante,
  obtenerPaciente,
  obtenerRedPrimaria,
  obtenerPacientePorId, // Agregar la nueva función a las exportaciones
};

