const { check, validationResult } = require("express-validator");
const { Laboratorio, Paciente } = require("../../database/models");
const laboratorioValidate = {};

laboratorioValidate.validacionCrearLaboratorio = async (request, response, next) => {
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
        check("hematies")
            .notEmpty()
            .withMessage("Los hematies son requeridos")
            .isFloat({ min: 0 })
            .withMessage("Los hematies deben ser un número positivo"),
        check("hematocritos")
            .notEmpty()
            .withMessage("Los hematocritos son requeridos")
            .isFloat({ min: 0 })
            .withMessage("Los hematocritos deben ser un número positivo"),
        check("mch")
            .notEmpty()
            .withMessage("El mch es requerido")
            .isFloat({ min: 0 })
            .withMessage("El mch debe ser un número positivo"),
        check("rdw")
            .notEmpty()
            .withMessage("El rdw es requerido")
            .isFloat({ min: 0 })
            .withMessage("El rdw debe ser un número positivo"),
        check("hemoglobina")
            .notEmpty()
            .withMessage("La hemoglobina es requerida")
            .isFloat({ min: 0 })
            .withMessage("La hemoglobina debe ser un número positivo"),
        check("mcv")
            .notEmpty()
            .withMessage("El mcv es requerido")
            .isFloat({ min: 0 })
            .withMessage("El mcv debe ser un número positivo"),
        check("mchc")
            .notEmpty()
            .withMessage("El mchc es requerido")
            .isFloat({ min: 0 })
            .withMessage("El mchc debe ser un número positivo"),
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

module.exports = laboratorioValidate;
