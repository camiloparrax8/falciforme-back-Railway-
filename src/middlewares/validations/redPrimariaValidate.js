const { check, validationResult } = require('express-validator');
const { validarHospitalUnico } = require('../../utils/validarHospitalUnico');

const redPrimaria = {};

redPrimaria.crearRedPrimaria = async (request, response, next) => {
    const validaciones = [
        check('fecha')
            .notEmpty().withMessage('La fecha es requerida')
            .isISO8601().withMessage('La fecha debe ser válida'),

            check('hospital')
            .notEmpty().withMessage('El hospital es requerido')
            .isLength({ max: 150 }).withMessage('El nombre del hospital debe tener como máximo 150 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios')
            .custom(validarHospitalUnico), // No hay coma adicional aquí

        check('correo')
            .optional({ nullable: true })
            .isEmail().withMessage('El correo debe ser válido')
            .isLength({ max: 150 }).withMessage('El correo debe tener como máximo 150 caracteres')
            .customSanitizer(value => value?.trim()),

        check('telefono')
            .optional({ nullable: true })
            .matches(/^\d+$/).withMessage('El teléfono debe ser numérico')
            .isLength({ min: 7, max: 15 }).withMessage('El teléfono debe tener entre 7 y 15 caracteres'),

        check('telefono_urgencias')
            .optional({ nullable: true })
            .matches(/^\d+$/).withMessage('El teléfono de urgencias debe ser numérico')
            .isLength({ min: 7, max: 15 }).withMessage('El teléfono de urgencias debe tener entre 7 y 15 caracteres'),


        check('municipio')
            .optional({ nullable: true })
            .isLength({ max: 15 }).withMessage('El municipio debe tener como máximo 15 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios'),

        check('departamento')
            .optional({ nullable: true })
            .isLength({ max: 15 }).withMessage('El departamento debe tener como máximo 15 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios'),

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


redPrimaria.validarBusquedaPorHospital = async (request, response, next) => {
    const validaciones = [
        check('hospital')
            .notEmpty().withMessage('El nombre del hospital es requerido')
            .isLength({ max: 150 }).withMessage('El nombre del hospital debe tener como máximo 150 caracteres')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios')
            .customSanitizer(value => value.trim().replace(/\s+/g, ' ')),
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
module.exports = redPrimaria;
