const { check, validationResult } = require('express-validator');
const { Paciente } = require('../../database/models');

const estadoHBS = {};

estadoHBS.crearEstadoHBS = async (request, response, next) => {
    const validaciones = [
        check('parentesco')
            .notEmpty().withMessage('El parentesco es obligatorio')
            .isLength({ max: 100 }).withMessage('El parentesco debe tener como máximo 100 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El parentesco solo puede contener letras y espacios'),

        check('linea_parentesco')
            .notEmpty().withMessage('La línea de parentesco es obligatoria')
            .isLength({ max: 100 }).withMessage('La línea de parentesco debe tener como máximo 100 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('La línea de parentesco solo puede contener letras y espacios'),

        check('estado')
            .notEmpty().withMessage('El estado es obligatorio')
            .isLength({ max: 50 }).withMessage('El estado debe tener como máximo 50 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El estado solo puede contener letras y espacios'),

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

module.exports = estadoHBS;
