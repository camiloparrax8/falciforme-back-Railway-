const { check, validationResult } = require("express-validator");
const { ComplicacionCronica, Paciente } = require("../../database/models");
const complicacionCronicaValidate = {};

complicacionCronicaValidate.validacionCrearComplicacionCronica = async (request, response, next) => {
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
        check("vasculopatia_cerebral")
            .notEmpty()
            .withMessage("La vasculopatia cerebral es requerida")
            .isBoolean()
            .withMessage("La vasculopatia cerebral debe ser un booleano"),
        check("infartos_cerebrales_silentes")
            .notEmpty()
            .withMessage("Los infartos cerebrales silenciosos son requeridos")
            .isBoolean()
            .withMessage("Los infartos cerebrales silenciosos deben ser un booleano"),
        check("epilepsia_convulsiones")
            .notEmpty()
            .withMessage("Las convulsiones son requeridas")
            .isBoolean()
            .withMessage("Las convulsiones deben ser un booleano"),
        check("cefaleas_recurrentes")
            .notEmpty()
            .withMessage("Las cefaleas recurrentes son requeridas")
            .isBoolean()
            .withMessage("Las cefaleas recurrentes deben ser un booleano"),
        check("deficit_cognitivo")
            .notEmpty()
            .withMessage("El déficit cognitivo es requerido")
            .isBoolean()
            .withMessage("El déficit cognitivo debe ser un booleano"),

     
            
    ]
    await Promise.all(validaciones.map((validation) => validation.run(request)));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = complicacionCronicaValidate;
