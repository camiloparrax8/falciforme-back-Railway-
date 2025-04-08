const { check, validationResult } = require("express-validator");
const { SoporteTransfusional, Paciente } = require("../../database/models");

const soporteTransfunsionalValidate = {};

soporteTransfunsionalValidate.validacionCrearSoporteTransfunsional = async (request, response, next) => {
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
        check("soporte_transfusional")
        .notEmpty()
        .withMessage("El soporte transfusional es requerido")
        .isString()
        .withMessage("El soporte transfusional debe ser un texto")
        .custom(async (value) => {
            if (value !== "Demanda" && value !== "Cronico") {
                throw new Error("El soporte transfusional debe ser Demanda o Cronico");
            }
        }),
        check("numero_transfusiones")
        .notEmpty()
        .withMessage("El número de transfusiones es requerido")
        .isInt({ min: 1 })
        .withMessage("El número de transfusiones debe ser un número entero positivo")
        .custom(async (value) => {
            if (value < 5 && value > 5 || value < 10 && value > 10) {
                throw new Error("El número de transfusiones debe ser menor a 5 o mayor a 10");
            }
        }),
        check("frecuencia")
        .notEmpty()
        .withMessage("La frecuencia es requerida")
        .isString()
        .withMessage("La frecuencia debe ser un texto")
        .custom(async (value) => {
            if (value !== "Mensual" && value !== "Trimestral" && value !== "Anual" && value !== "No requiere") {
                throw new Error("La frecuencia debe ser Mensual, Trimestral, Anual o No requiere");
            }
        }),
        check("aloinmunizacion")
        .notEmpty()
        .withMessage("La aloinmunización es requerida")
        .isBoolean()
        .withMessage("La aloinmunización debe ser un booleano"),
        check("fecha_sobrecarga_hierro")
        .notEmpty()
        .withMessage("La fecha de sobrecarga de hierro es requerida")
        .isDate()
        .withMessage("La fecha de sobrecarga de hierro debe ser una fecha válida"),
        check("quelentes")
        .notEmpty()
        .withMessage("Los quelentes son requeridos")
        .isString()
        .withMessage("Los quelentes deben ser un texto"),
        check("ferritina")
        .notEmpty()
        .withMessage("La ferritina es requerida")
        .isFloat()
        .withMessage("La ferritina debe ser un número"),
        check("ferritina_dosis")
        .notEmpty()
        .withMessage("La dosis de ferritina es requerida")
        .isFloat()
        .withMessage("La dosis de ferritina debe ser un número"),
        check("fecha_sobrecarga_organo")
        .notEmpty()
        .withMessage("La fecha de sobrecarga de organo es requerida")
        .isDate()
        .withMessage("La fecha de sobrecarga de organo debe ser una fecha válida"),
        check("lic")
        .notEmpty()
        .withMessage("La lic es requerida")
        .isString()
        .withMessage("La lic debe ser un texto"),
        check("pancreatica")
        .notEmpty()
        .withMessage("La pancreatica es requerida")
        .isString()
        .withMessage("La pancreatica debe ser un texto"),
        check("evaluacion_cardiaca")
        .notEmpty()
        .withMessage("La evaluación cardiaca es requerida")
        .isString()
        .withMessage("La evaluación cardiaca debe ser un texto"),
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
module.exports = soporteTransfunsionalValidate;