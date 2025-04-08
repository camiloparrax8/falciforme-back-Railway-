const { check, validationResult } = require('express-validator');
const { Acompanante } = require('../../database/models'); // Importar el modelo

const acompanante = {};

acompanante.crearAcompanante = async (request, response, next) => {
    const validaciones = [
        check('nombre')
            .notEmpty().withMessage('El nombre es requerido')
            .isLength({ max: 100 }).withMessage('El nombre debe tener como máximo 100 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios')
            .customSanitizer(value => value.trim()),

        check('apellido')
            .notEmpty().withMessage('El apellido es requerido')
            .isLength({ max: 100 }).withMessage('El apellido debe tener como máximo 100 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios')
            .customSanitizer(value => value.trim()),

        check('celular')
            .notEmpty().withMessage('El celular es requerido')
            .matches(/^\d+$/).withMessage('El celular debe ser numérico')
            .isLength({ min: 7, max: 15 }).withMessage('El celular debe tener entre 7 y 15 caracteres'),

        check('correo')
            .optional({ nullable: true })
            .isEmail().withMessage('El correo debe ser válido')
            .isLength({ max: 150 }).withMessage('El correo debe tener como máximo 150 caracteres')
            .customSanitizer(value => value?.trim()),

        check('tipo_identificacion')
            .notEmpty().withMessage('El tipo de identificación es requerido')
            .isIn(['CC', 'TI', 'PS']).withMessage('El tipo de identificación no es válido'),

        check('identificacion')
            .notEmpty().withMessage('La identificación es requerida')
            .matches(/^\d+$/).withMessage('La identificación debe ser numérica')
            .isLength({ max: 20 }).withMessage('La identificación debe tener como máximo 20 caracteres')
            .custom(async (value) => {
                // Verificar si ya existe un registro con la misma identificación
                const existeAcompanante = await Acompanante.findOne({ where: { identificacion: value } });
                if (existeAcompanante) {
                    throw new Error('La identificación ya está registrada');
                }
                return true;
            }),

        check('id_user_create')
            .optional({ nullable: true })
            .isInt().withMessage('El id del usuario creador debe ser un número entero'),
    ];

    // Ejecutar validaciones
    await Promise.all(validaciones.map(validation => validation.run(request)));
    const errores = validationResult(request);

    // Verificar si hay errores
    if (!errores.isEmpty()) {
        return response.status(400).json({
            status: "error",
            message: "Errores de validación",
            hasErrors: true,
            errors: errores.array(),
        });
    }

    // Continuar si no hay errores
    next();
};
acompanante.validarBusquedaPorIdentificacion = async (request, response, next) => {
    console.log('entra al validador de buscar por identificacion');
    
    const validaciones = [
        check('identificacion')
            .notEmpty().withMessage('La identificación es requerida')
            .isLength({ max: 20 }).withMessage('La identificación debe tener como máximo 20 caracteres')
            .matches(/^\d+$/).withMessage('La identificación debe ser numérica'),
           
    ];

    // Ejecutar validaciones
    await Promise.all(validaciones.map(validation => validation.run(request)));
    const errores = validationResult(request);

    // Verificar si hay errores
    if (!errores.isEmpty()) {
        return response.status(400).json({
            status: "error",
            message: "Errores de validación",
            hasErrors: true,
            errors: errores.array(),
        });
    }

    // Continuar si no hay errores
    next();
};
module.exports = acompanante;
