const { param, validationResult } = require('express-validator');
const { check } = require('express-validator');
const { normalizarTexto, normalizarParabra } = require('./funciones');
const { Usuario, Rol } = require('../../database/models');


const usuario = {};

usuario.crearUsuario = async (request, response, next) => {
    const validaciones = [
        check('nombres').notEmpty().withMessage('El nombre es requerido'),
        check('nombres').custom((value, { request }) => {
            if (value.trim().length === 0) {
                throw new Error('El nombre no puede ser una cadena vacía o de solo espacios');
            }
            return true;
        }),
        check('nombres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios'),
        check('nombres').isLength({ max: 150, min: 2 }).withMessage('Entrada inválida'),
        check('nombres').customSanitizer(value => {
            return value.trim().replace(/\s+/g, ' ');
        }),


        check('apellidos').notEmpty().withMessage('El apellido es requerido'),
        check('apellidos').custom((value, { request }) => {
            if (value.trim().length === 0) {
                throw new Error('El apellido no puede ser una cadena vacía o de solo espacios');
            }
            return true;
        }),
        check('apellidos').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios'),
        check('apellidos').isLength({ max: 150, min: 2 }).withMessage('Entrada inválida'),
        check('apellidos').customSanitizer(value => {
            return value.trim().replace(/\s+/g, ' ');
        }),

        check('cedula').notEmpty().withMessage('La cedula es obligatoria'),
        check('cedula').matches(/^\d+$/).withMessage('Entrada invalida'),
        check('cedula').isLength({ max: 10, min: 7 }).withMessage('La cedula debe contener entre 7 y 10 numeros'),
        check('cedula').custom(async (value) => {
            const usuario = await Usuario.findOne({ where: { cedula: value } });
            if (usuario) {
                throw new Error('El numero de cedula ya se encuentra en el sistema');
            }
            return true;
        }),

        check('correo').notEmpty().withMessage('El corre es obligatorio'),
        check('correo').isEmail().withMessage('Correo no víalido'),
        check('correo').isLength({ max: 100, min: 5 }).withMessage('El correo debe contener entre 5 y 100 caracteres'),
        check('correo').customSanitizer(value => {
            return value.trim();
        }),
        check('correo').custom(async (value) => {
            const usuario = await Usuario.findOne({ where: { correo: value } });
            if (usuario) {
                throw new Error('El correo ya se encuentra registrado en el sistema');
            }
            return true;
        }),

        check('user').notEmpty().withMessage('El usuario es obligatorio'),
        check('user').matches(/^[a-zA-Z0-9_]+$/).withMessage('El usuario solo puede contener letras, números y guiones bajos'),
        check('user').isLength({ max: 30, min: 3 }).withMessage('El usuario puede contener entre 3 y 30 caracteres'),
        check('user').customSanitizer(value => {
            return value.trim();
        }),
        check('user').custom(async (value) => {
            const usuario = await Usuario.findOne({ where: { user: value } });
            if (usuario) {
                throw new Error('El usuario ya se encuentra registrado en el sistema');
            }
            return true;
        }),

        // check('password').isLength({ max: 100, min: 8 }).withMessage('La contraseña debe tener mas 8 caracteres'),
        check('id_rol').custom(async (value) => {
            const rol = await Rol.findByPk(value);
            if (!rol) {
                throw new Error('El rol no existe');
            }
            return true;
        })
    ];
    await Promise.all(validaciones.map(validation => validation.run(request)));
    const errores = validationResult(request);
    if (!errores.isEmpty()) {
        const respuesta = { status: "error", message: "Errores de validacion", hasErrors: true, errors: errores.array() }
        return response.status(400).json(respuesta);
    }
    next();
}


usuario.editarUsuario = async (request, response, next) => {
    const validaciones = [
        param('id').isInt().withMessage('El ID debe ser un número entero.'),
        check('nombres').notEmpty().withMessage('El nombre es requerido'),
        check('nombres').custom((value, { request }) => {
            if (value.trim().length === 0) {
                throw new Error('El nombre no puede ser una cadena vacía o de solo espacios');
            }
            return true;
        }),
        check('nombres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios'),
        check('nombres').isLength({ max: 150, min: 2 }).withMessage('Entrada inválida'),
        check('nombres').customSanitizer(value => {
            return value.trim().replace(/\s+/g, ' ');
        }),


        check('apellidos').notEmpty().withMessage('El apellido es requerido'),
        check('apellidos').custom((value, { request }) => {
            if (value.trim().length === 0) {
                throw new Error('El apellido no puede ser una cadena vacía o de solo espacios');
            }
            return true;
        }),
        check('apellidos').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Solo se permiten letras y espacios'),
        check('apellidos').isLength({ max: 150, min: 2 }).withMessage('Entrada inválida'),
        check('apellidos').customSanitizer(value => {
            return value.trim().replace(/\s+/g, ' ');
        }),

        check('cedula').notEmpty().withMessage('La cedula es obligatoria'),
        check('cedula').matches(/^\d+$/).withMessage('Entrada invalida'),
        check('cedula').isLength({ max: 10, min: 7 }).withMessage('La cedula debe contener entre 7 y 10 numeros'),
        check('cedula').custom(async (value) => {
            const usuarioExistente = await Usuario.findOne({ where: { cedula: value } });
            if (usuarioExistente && usuarioExistente.id != request.params.id) {
                throw new Error('El numero de cedula ya se encuentra en el sistema');
            }
            return true;
        }),

        check('correo').notEmpty().withMessage('El corre es obligatorio'),
        check('correo').isEmail().withMessage('Correo no víalido'),
        check('correo').isLength({ max: 100, min: 5 }).withMessage('El correo debe contener entre 5 y 100 caracteres'),
        check('correo').customSanitizer(value => {
            return value.trim();
        }),
        check('correo').custom(async (value) => {
            const usuarioExistente = await Usuario.findOne({ where: { correo: value } });
            if (usuarioExistente && usuarioExistente.id != request.params.id) {
                throw new Error('El correo ya se encuentra registrado en el sistema');
            }
            return true;
        }),

        check('user').notEmpty().withMessage('El usuario es obligatorio'),
        check('user').matches(/^[a-zA-Z0-9_]+$/).withMessage('El usuario solo puede contener letras, números y guiones bajos'),
        check('user').isLength({ max: 30, min: 3 }).withMessage('El usuario puede contener entre 3 y 30 caracteres'),
        check('user').customSanitizer(value => {
            return value.trim();
        }),
        check('user').custom(async (value) => {
            const usuarioExistente = await Usuario.findOne({ where: { user: value } });
            if (usuarioExistente && usuarioExistente.id != request.params.id) {
                throw new Error('El usuario ya se encuentra registrado en el sistema');
            }
            return true;
        }),

        // check('password').isLength({ max: 100, min: 8 }).withMessage('La contraseña debe tener mas 8 caracteres'),
        check('id_rol').custom(async (value) => {
            const rol = await Rol.findByPk(value);
            if (!rol) {
                throw new Error('El rol no existe');
            }
            return true;
        })
    ];
    await Promise.all(validaciones.map(validation => validation.run(request)));
    const errores = validationResult(request);
    if (!errores.isEmpty()) {
        const respuesta = { status: "error", message: "Errores de validacion", hasErrors: true, errors: errores.array() }
        return response.status(400).json(respuesta);
    }
    next();
}

module.exports = usuario;
