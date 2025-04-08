const { check, validationResult } = require('express-validator');
const { Paciente } = require('../../database/models');

const antecedentePerinatologico = {};

antecedentePerinatologico.crearAntecedentePerinatologico = async (request, response, next) => {
    const validaciones = [
        check('peso_al_nacer')
            .optional({ nullable: true })
            .matches(/^\d+(\.\d{1,2})?$/).withMessage('El peso debe ser numérico con hasta dos decimales')
            .isLength({ max: 10 }).withMessage('El peso debe tener como máximo 10 caracteres'),

        check('talla_al_nacer')
            .optional({ nullable: true })
            .matches(/^\d+(\.\d{1,2})?$/).withMessage('La talla debe ser numérica con hasta dos decimales')
            .isLength({ max: 10 }).withMessage('La talla debe tener como máximo 10 caracteres'),

        check('nota')
            .optional({ nullable: true })
            .isLength({ max: 500 }).withMessage('La nota debe tener como máximo 500 caracteres'),

        check('condicion_al_nacer')
            .optional({ nullable: true })
            .isLength({ max: 255 }).withMessage('La condición al nacer debe tener como máximo 255 caracteres'),

        check('cuidado_neonatal')
            .optional({ nullable: true })
            .isLength({ max: 255 }).withMessage('El cuidado neonatal debe tener como máximo 255 caracteres'),

        check('etirico_neonatal')
            .optional({ nullable: true })
            .isLength({ max: 255 }).withMessage('El etírico neonatal debe tener como máximo 255 caracteres'),

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

module.exports = antecedentePerinatologico;
