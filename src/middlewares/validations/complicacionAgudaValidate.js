const { check, validationResult } = require("express-validator");
const { ComplicacionAguda, Paciente } = require("../../database/models");
const complicacionAguda = {};

complicacionAguda.validacionCrearComplicacionAguda = async (request, response, next) => {
  const validaciones = [
    check("id_paciente")
      .notEmpty()
      .withMessage("El ID del paciente es requerido")
      .isInt({ min: 1 })
      .withMessage("El ID del paciente debe ser un número entero positivo")
      .custom(async (value) => {
        const paciente = await Paciente.findByPk(value);
        if (!paciente) {
          throw new Error("El paciente no existe");
        }
      }),

    check("fecha")
      .notEmpty()
      .withMessage("La fecha es requerida")
      .isDate()
      .withMessage("La fecha debe ser una fecha válida"),

    check("dias_crisis")
      .notEmpty()
      .withMessage("Los días de crisis son requeridos")
      .isInt({ min: 0 })
      .withMessage("Los días de crisis deben ser un número entero positivo"),

    check("intensidad")
      .notEmpty()
      .withMessage("La intensidad es requerida")
      .isString()
      .withMessage("La intensidad debe ser una cadena de caracteres")
      .isLength({ max: 255 })
      .withMessage("La intensidad debe tener como máximo 255 caracteres"),

    check("manejo")
      .notEmpty()
      .withMessage("El manejo es requerido")
      .custom(async (value) => {
        if (value !== "Casa" && value !== "Hospitalario") {
          throw new Error("El manejo debe ser 'Casa' u 'Hospitalario'");
        }
      }),

    check("tratamiento")
      .notEmpty()
      .withMessage("El tratamiento es requerido")
      .isString()
      .withMessage("El tratamiento debe ser una cadena de caracteres")
      .isLength({ max: 255 })
      .withMessage("El tratamiento debe tener como máximo 255 caracteres"),

    check("huesos_afectados")
      .notEmpty()
      .withMessage("Los huesos afectados son requeridos")
      .isString()
      .withMessage("Los huesos afectados debe ser una cadena de caracteres")
      .isLength({ max: 255 })
      .withMessage("Los huesos afectados debe tener como máximo 255 caracteres"),

    check("germen")
      .notEmpty()
      .withMessage("El germen es requerido")
      .isLength({ max: 255 })
      .withMessage("El germen debe tener como máximo 255 caracteres"),

    check("tratamiento_infecciones")
      .notEmpty()
      .withMessage("El tratamiento de infección es requerido")
      .isString()
      .withMessage("El tratamiento de infección debe ser una cadena de caracteres")
      .isLength({ max: 255 })
      .withMessage("El tratamiento de infección debe tener como máximo 255 caracteres"),

    check("dias_infeccion")
      .notEmpty()
      .withMessage("Los días de infección son requeridos")
      .isInt({ min: 0 })
      .withMessage("Los días de infección deben ser un número entero positivo"),

    check("crisis_aplastica_infecciosa")
      .notEmpty()
      .withMessage("La crisis aplástica infecciosa es requerida")
      .isBoolean()
      .withMessage("La crisis aplástica infecciosa debe ser un booleano"),
    ]
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

module.exports = complicacionAguda;

