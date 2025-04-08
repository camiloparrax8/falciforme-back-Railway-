const { check, validationResult } = require('express-validator');
const { Paciente, Vacuna } = require('../../database/models');

const esquemaVacunacionValidator = {};

esquemaVacunacionValidator.crearEsquemaVacunacion = async (request, response, next) => {
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

        check('id_vacunacion')
            .notEmpty().withMessage('El ID de la vacunación es obligatorio')
            .isInt().withMessage('El ID de la vacunación debe ser un número entero')
            .custom(async (value) => {
                const vacuna = await Vacuna.findByPk(value);
                if (!vacuna) {
                    throw new Error('La vacuna no existe');
                }
                return true;
            }),

        check('estado')
            .optional({ nullable: true })
            .isLength({ max: 100 }).withMessage('El estado debe tener como máximo 100 caracteres'),

        check('fecha_vacunacion')
            .optional({ nullable: true })
            .isISO8601().withMessage('La fecha de vacunación debe ser válida'),

        check('dosis')
            .optional({ nullable: true })
            .isInt().withMessage('La dosis debe ser un número entero'),

        check('id_user_create')
            .optional({ nullable: true })
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

module.exports = esquemaVacunacionValidator;
