const { check, validationResult } = require("express-validator");
const { Paciente } = require("../../database/models");

const trasplanteProgenitorValidate = {};

trasplanteProgenitorValidate.validacionCrearTrasplanteProgenitor = async (
  request,
  response,
  next
) => {
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
    check("paciente")
      .notEmpty()
      .withMessage("El paciente es requerido")
      .custom(async (value) => {
        if (value !== "Realizado" && value !== "No Realizado") {
          throw new Error("El paciente debe ser Realizado o No Realizado");
        }
      }),
    check("padres")
      .notEmpty()
      .withMessage("El padres es requerido")
      .custom(async (value) => {
        if (value !== "Realizado" && value !== "No Realizado") {
          throw new Error("El padres debe ser Realizado o No Realizado");
        }
      }),
    check("hermanos")
      .notEmpty()
      .withMessage("El hermanos es requerido")
      .custom(async (value) => {
        if (value !== "Realizado" && value !== "No Realizado") {
          throw new Error("El hermanos debe ser Realizado o No Realizado");
        }
      }),
    check("tipo_indicaciones")
      .notEmpty()
      .withMessage("El tipo de indicaciones es requerido")
      .isString()
      .withMessage("El tipo de indicaciones debe ser un texto"),
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

module.exports = trasplanteProgenitorValidate;
