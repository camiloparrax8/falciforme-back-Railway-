const { check, validationResult } = require("express-validator");
const {
  Paciente,
  Red_Primaria,
  Acompanante,
} = require("../../database/models");

const paciente = {};

paciente.crearPaciente = async (request, response, next) => {
  const validaciones = [
    check("nombre")
      .notEmpty()
      .withMessage("El nombre es requerido")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage("Solo se permiten letras y espacios")
      .isLength({ max: 100 })
      .withMessage("El nombre debe tener como máximo 100 caracteres")
      .customSanitizer((value) => value.trim().replace(/\s+/g, " ")),

    check("apellido")
      .notEmpty()
      .withMessage("El apellido es requerido")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage("Solo se permiten letras y espacios")
      .isLength({ max: 100 })
      .withMessage("El apellido debe tener como máximo 100 caracteres")
      .customSanitizer((value) => value.trim().replace(/\s+/g, " ")),

    check("tipo_identificacion")
      .notEmpty()
      .withMessage("El tipo de identificación es obligatorio")
      .isIn(["CC", "TI", "PS"])
      .withMessage("El tipo de identificación no es válido"),

    check("identificacion")
      .notEmpty()
      .withMessage("La identificación es requerida")
      .matches(/^\d+$/)
      .withMessage("La identificación debe ser numérica")
      .isLength({ max: 20 })
      .withMessage("La identificación debe tener como máximo 20 caracteres")
      .custom(async (value) => {
        const paciente = await Paciente.findOne({
          where: { identificacion: value },
        });
        if (paciente) {
          throw new Error("La identificación ya está registrada");
        }
        return true;
      }),

    check("fecha_nacimiento")
      .notEmpty()
      .withMessage("La fecha de nacimiento es requerida")
      .isISO8601()
      .withMessage("La fecha de nacimiento debe ser una fecha válida"),

    check("sexo")
      .notEmpty()
      .withMessage("El sexo es requerido")
      .isIn(["Masculino", "Femenino", "Otro"])
      .withMessage("El sexo debe ser válido"),

    check("correo")
      .optional({ nullable: true })
      .isEmail()
      .withMessage("El correo debe ser válido")
      .isLength({ max: 150 })
      .withMessage("El correo debe tener como máximo 150 caracteres")
      .customSanitizer((value) => value.trim()),

    check("celular")
      .optional({ nullable: true })
      .matches(/^\d+$/)
      .withMessage("El celular debe ser numérico")
      .isLength({ max: 15 })
      .withMessage("El celular debe tener como máximo 15 caracteres"),

    check("municipio").notEmpty().withMessage("El municipio es obligatorio"),

    check("departamento")
      .notEmpty()
      .withMessage("El departamento es obligatorio"),

    check("id_red_primaria")
      .optional({ nullable: true })
      .custom(async (value) => {
        if (value) {
          const redPrimaria = await Red_Primaria.findByPk(value);
          if (!redPrimaria) {
            throw new Error("La red primaria no existe");
          }
        }
        return true;
      }),

    check("id_acompaniante")
      .optional({ nullable: true })
      .custom(async (value) => {
        if (value) {
          const acompaniante = await Acompanante.findByPk(value);
          if (!acompaniante) {
            throw new Error("El acompañante no existe");
          }
        }
        return true;
      }),

    // Puedes añadir validaciones para otros campos relacionados como identidad, ocupación, etc.
  ];

  await Promise.all(validaciones.map((validation) => validation.run(request)));
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json({
      status: "error",
      message: "Errores de validación",
      hasErrors: true,
      errors: errores.array(),
    });
  }
  next();
};
paciente.validateFindByIdentificacion = async (request, response, next) => {
  const validaciones = [
    check("identificacion")
      .notEmpty()
      .withMessage("La identificación es requerida")
      .matches(/^\d+$/)
      .withMessage("La identificación debe ser numérica")
      .isLength({ max: 20 })
      .withMessage("La identificación debe tener como máximo 20 caracteres")
      .custom(async (value) => {
        const paciente = await Paciente.findOne({
          where: { identificacion: value },
        });
        if (paciente) {
          throw new Error("La identificación ya está registrada");
        }
        return true;
      }),
  ];

  await Promise.all(validaciones.map((validation) => validation.run(request)));
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json({
      status: "error",
      message: "Errores de validación",
      hasErrors: true,
      errors: errores.array(),
    });
  }
  next();
};
paciente.crearPaciente = async (request, response, next) => {
  const validaciones = [
    check("nombre")
      .notEmpty()
      .withMessage("El nombre es requerido")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage("Solo se permiten letras y espacios")
      .isLength({ max: 100 })
      .withMessage("El nombre debe tener como máximo 100 caracteres")
      .customSanitizer((value) => value.trim().replace(/\s+/g, " ")),

    check("apellido")
      .notEmpty()
      .withMessage("El apellido es requerido")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage("Solo se permiten letras y espacios")
      .isLength({ max: 100 })
      .withMessage("El apellido debe tener como máximo 100 caracteres")
      .customSanitizer((value) => value.trim().replace(/\s+/g, " ")),

    check("tipo_identificacion")
      .notEmpty()
      .withMessage("El tipo de identificación es obligatorio")
      .isIn(["CC", "TI", "PS"])
      .withMessage("El tipo de identificación no es válido"),

    check("identificacion")
      .notEmpty()
      .withMessage("La identificación es requerida")
      .matches(/^\d+$/)
      .withMessage("La identificación debe ser numérica")
      .isLength({ max: 20 })
      .withMessage("La identificación debe tener como máximo 20 caracteres")
      .custom(async (value) => {
        const paciente = await Paciente.findOne({
          where: { identificacion: value },
        });
        if (paciente) {
          throw new Error("La identificación ya está registrada");
        }
        return true;
      }),

    check("fecha_nacimiento")
      .notEmpty()
      .withMessage("La fecha de nacimiento es requerida")
      .isISO8601()
      .withMessage("La fecha de nacimiento debe ser una fecha válida"),

    check("sexo")
      .notEmpty()
      .withMessage("El sexo es requerido")
      .isIn(["Masculino", "Femenino", "Otro"])
      .withMessage("El sexo debe ser válido"),

    check("correo")
      .optional({ nullable: true })
      .isEmail()
      .withMessage("El correo debe ser válido")
      .isLength({ max: 150 })
      .withMessage("El correo debe tener como máximo 150 caracteres")
      .customSanitizer((value) => value.trim()),

    check("celular")
      .optional({ nullable: true })
      .matches(/^\d+$/)
      .withMessage("El celular debe ser numérico")
      .isLength({ max: 15 })
      .withMessage("El celular debe tener como máximo 15 caracteres"),

    check("municipio").notEmpty().withMessage("El municipio es obligatorio"),

    check("departamento")
      .notEmpty()
      .withMessage("El departamento es obligatorio"),

    check("id_red_primaria")
      .optional({ nullable: true })
      .custom(async (value) => {
        if (value) {
          const redPrimaria = await Red_Primaria.findByPk(value);
          if (!redPrimaria) {
            throw new Error("La red primaria no existe");
          }
        }
        return true;
      }),

    check("id_acompaniante")
      .optional({ nullable: true })
      .custom(async (value) => {
        if (value) {
          const acompaniante = await Acompanante.findByPk(value);
          if (!acompaniante) {
            throw new Error("El acompañante no existe");
          }
        }
        return true;
      }),

    // Puedes añadir validaciones para otros campos relacionados como identidad, ocupación, etc.
  ];

  await Promise.all(validaciones.map((validation) => validation.run(request)));
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json({
      status: "error",
      message: "Errores de validación",
      hasErrors: true,
      errors: errores.array(),
    });
  }
  next();
};

paciente.actualizarAcompanante = async (request, response, next) => {
  console.log("Validador ejecutado");

  const validaciones = [
    check("idPaciente")
      .notEmpty()
      .withMessage("El ID del paciente es requerido"),
    check("idAcompanante")
      .notEmpty()
      .withMessage("El ID de Acompaniante es requerido"),
  ];

  await Promise.all(validaciones.map((validation) => validation.run(request)));
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    console.log("Errores de validación:", errores.array());
    return response.status(400).json({
      status: "error",
      message: "Errores de validación",
      hasErrors: true,
      errors: errores.array(),
    });
  }
  next();
};

paciente.actualizarRedPrimaria = async (request, response, next) => {
  console.log("Validador ejecutado");

  const validaciones = [
    check("idPaciente")
      .notEmpty()
      .withMessage("El ID del paciente es requerido"),
    check("idRedPrimaria")
      .notEmpty()
      .withMessage("El ID de la red primaria es requerido"),
  ];

  await Promise.all(validaciones.map((validation) => validation.run(request)));
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    console.log("Errores de validación:", errores.array());
    return response.status(400).json({
      status: "error",
      message: "Errores de validación",
      hasErrors: true,
      errors: errores.array(),
    });
  }
  next();
};

module.exports = paciente;
