const { check, validationResult } = require("express-validator");
const { ImagenDiagnostica, Paciente } = require("../../database/models");
const imagenDiagnosticaValidate = {};

imagenDiagnosticaValidate.validacionCrearImagenDiagnostica = async (request, response, next) => {
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
        check("imagenes_diagnosticas")
            .notEmpty()
            .withMessage("Las imágenes diagnósticas son requeridas")
            .isString()
            .withMessage("Las imágenes diagnósticas deben ser validas")
            .custom(async (value) => {
                if (value !== "Radiografía" && value !== "Ecografía" && value !== "Tomografía" && value !== "Resonancia Magnética") {
                    throw new Error("El tipo de imagen diagnóstica debe ser Radiografía, Ecografía, Tomografía o Resonancia Magnética");
                }
            }),
        check("fecha")
            .notEmpty()
            .withMessage("La fecha es requerida")
            .isDate()
            .withMessage("La fecha debe ser una fecha válida"),
        check("tipo_resultado")
            .notEmpty()
            .withMessage("El tipo de resultado es requerido")
            .isString()
            .withMessage("El tipo de resultado debe ser valido")
            .custom(async (value) => {
                if (value !== "Normal" && value !== "Anormal" && value !== "Pendiente de Evaluación") {
                    throw new Error("El tipo de resultado debe ser Normal, Anormal o Pendiente de Evaluación");
                }
            }),
        check("resultado")
            .notEmpty()
            .withMessage("El resultado es requerido")
            .isString()
            .withMessage("El resultado debe ser valido"),

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

imagenDiagnosticaValidate.validacionObtenerImagenesDiagnosticas = async (request, response, next) => {
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
                return true;
            })
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

module.exports = imagenDiagnosticaValidate;
