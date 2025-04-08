const { check, validationResult } = require('express-validator');
const { Paciente } = require('../../database/models');

const enfermedadCronicaValidator = {};

enfermedadCronicaValidator.crearEnfermedadCronica = async (request, response, next) => {
    const validaciones = [
        check('id_paciente')
            .notEmpty().withMessage('El ID del paciente es obligatorio')
            .isInt().withMessage('El ID del paciente debe ser un número entero')
            .custom(async (value) => {
                const paciente = await Paciente.findByPk(value);
                if (!paciente) {
                    throw new Error('El paciente no existe');
                }
                return true;
            }),

        check('enfermedad')
            .notEmpty().withMessage('La enfermedad es obligatoria')
            .isLength({ max: 150 }).withMessage('La enfermedad debe tener como máximo 150 caracteres'),

        check('enfermedad_especifica')
            .notEmpty().withMessage('La enfermedad específica es obligatoria')
            .isLength({ max: 255 }).withMessage('La enfermedad específica debe tener como máximo 255 caracteres'),

        check('portador')
            .notEmpty().withMessage('El campo "portador" es obligatorio')
            .isIn(['Sí', 'No']).withMessage('El valor de portador debe ser "Sí" o "No"'),

        check('linea_parentesco_portador')
            .notEmpty().withMessage('La línea de parentesco del portador es obligatoria')
            .isLength({ max: 100 }).withMessage('La línea de parentesco del portador debe tener como máximo 100 caracteres'),

        check('id_user_create')
            .notEmpty().withMessage('El ID del usuario creador es obligatorio')
            .isInt().withMessage('El ID del usuario creador debe ser un número entero'),
    ];

    await Promise.all(validaciones.map(validation => validation.run(request)));
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

module.exports = enfermedadCronicaValidator;
