const { check, validationResult } = require("express-validator");
const { VacunaHc, Paciente } = require("../../database/models");
const vacunaHcValidate = {};

vacunaHcValidate.validacionCrearVacunaHc = async (request, response, next) => {

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
        check("nombre_vacuna")
        .notEmpty()
        .withMessage("El nombre de la vacuna es requerido")
        .isString()
        .withMessage("El nombre de la vacuna debe ser un texto"),
        check("fecha")
        .notEmpty()
        .withMessage("La fecha es requerida")
        .isDate()
        .withMessage("La fecha debe ser una fecha válida"),
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
}

module.exports = vacunaHcValidate;