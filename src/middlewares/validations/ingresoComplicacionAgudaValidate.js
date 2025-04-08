const { check, validationResult } = require("express-validator");
const { IngresoComplicacionesAgudas, ComplicacionesAgudas } = require("../../database/models");

const ingresoComplicacionAguda = {};

ingresoComplicacionAguda.validacionCrearIngresoComplicacionAguda = async (request, response, next) => {
    const validaciones = [
        check("id_complicacion_aguda")
            .notEmpty()
            .withMessage("El ID de la complicación aguda es requerido")
            .isInt({ min: 1 })
            .withMessage("El ID de la complicación aguda debe ser un número entero positivo")
            .custom(async (value) => {
                const complicacionAguda = await ComplicacionesAgudas.findByPk(value);
                if (!complicacionAguda) {
                    throw new Error("La complicación aguda no existe");
                }
                if (!complicacionAguda.estado) {
                    throw new Error("La complicación aguda no está activa");
                }
            }),

        check("tipo_ingreso")
            .notEmpty()
            .withMessage("El tipo de ingreso es requerido")
            .custom(async (value) => {
                if (value !== "UCI" && value !== "Hospitalizado") {
                  throw new Error("El tipo de ingreso debe ser 'UCI' u 'Hospitalizado'");
                }
              }),

        check("fecha_ingreso")
            .notEmpty()
            .withMessage("La fecha de ingreso es requerida")
            .isDate()
            .withMessage("La fecha de ingreso debe ser una fecha válida")
            .custom((value) => {
                const fechaIngreso = new Date(value);
                const hoy = new Date();
                if (fechaIngreso > hoy) {
                    throw new Error("La fecha de ingreso no puede ser futura");
                }
                return true;
            }),

        check("duracion_ingreso")
            .notEmpty()
            .withMessage("La duración del ingreso es requerida")
            .isInt({ min: 0 })
            .withMessage("La duración del ingreso debe ser un número entero positivo"),

        check("motivo_ingreso")
            .notEmpty()
            .withMessage("El motivo de ingreso es requerido")
            .isString()
            .withMessage("El motivo de ingreso debe ser una cadena de caracteres")
            .isLength({ max: 255 })
            .withMessage("El motivo de ingreso debe tener como máximo 255 caracteres"),
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

module.exports = ingresoComplicacionAguda;
