const { check, validationResult } = require("express-validator");
const { Tratamiento, Paciente } = require("../../database/models");
const tratamientoValidate = {};

tratamientoValidate.validacionCrearTratamiento = async (
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
    check("titulo")
      .notEmpty()
      .withMessage("El titulo es requerido")
      .isString()
      .withMessage("El titulo debe ser un texto"),
    check("n_dias")
      .notEmpty()
      .withMessage("El numero de dias es requerido")
      .isInt({ min: 1 })
      .withMessage("El numero de dias debe ser un número entero positivo"),
    check("dosis")
      .notEmpty()
      .withMessage("La dosis es requerida")
      .isString()
      .withMessage("La dosis debe ser un texto"),
    check("tipo")
      .notEmpty()
      .withMessage("El tipo es requerido")
      .isString()
      .withMessage("El tipo debe ser un texto"),
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

module.exports = tratamientoValidate;
