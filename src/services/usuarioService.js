const { Usuario } = require('../database/models');
const bcrypt = require('bcryptjs');
const apiResponse = require('../utils/apiResponse');
const { Op } = require('sequelize');

const getUsuarios = async () => {
    const usuarios = await Usuario.findAll({
        where: {
            is_deleted: 0
        },
        order: [
            ['id', 'DESC']
        ],
        include: 'rol'
    });
    return new apiResponse('success', 'OK', usuarios);
}
const getAcompaniantes = async () => {
    const usuarios = await Usuario.findAll({
        where: {
            is_deleted: 0
        },
        order: [
            ['id', 'DESC']
        ],
        include: {
            model: Rol,
            as: 'rol',
            where: {
                nombre: 'ACOMPANIANTE'
            }
        }
    });
    return new apiResponse('success', 'OK', usuarios);
}

const crearUsuario = async (usuario) => {
    const password = await bcrypt.hash(usuario.cedula, 10);
    const nuevo = await Usuario.create({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        cedula: usuario.cedula,
        correo: usuario.correo,
        celular: usuario.celular,
        user: usuario.user,
        password: password,
        id_rol: usuario.id_rol,
        estado: usuario.estado
    });
    return new apiResponse('success', 'usuario creado correctamente', nuevo);
}

const editarUsuario = async (id, usuario) => {
    const usuario_actu = await Usuario.findByPk(id);

    if (usuario_actu) {
        await usuario_actu.update({
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            cedula: usuario.cedula,
            correo: usuario.correo,
            celular: usuario.celular,
            user: usuario.user,
            id_rol: usuario.id_rol,
            estado: usuario.estado
        });
        return new apiResponse('success', 'Usuario actualizado correctamente', null);
    } else {
        return new apiResponse('error', 'El usuario no existe', null);

    }
}

const filtroUsuarios = async (entrada) => {
    let condiciones = {};

    if (entrada) {
        condiciones = {
            [Op.or]: [
                { nombres: { [Op.like]: `%${entrada}%` } },
                { apellidos: { [Op.like]: `%${entrada}%` } },
                { cedula: { [Op.like]: `%${entrada}%` } },
                { correo: { [Op.like]: `%${entrada}%` } },
                { celular: { [Op.like]: `%${entrada}%` } },
                { user: { [Op.like]: `%${entrada}%` } }
            ]
        };
    }

    const usuarios = await Usuario.findAll({
        include: 'rol',
        order: [
            ['id', 'DESC']
        ],
        where: condiciones
    });

    return new apiResponse('success', 'OK', usuarios);
}

const buscarUsuarioPorId = async (id) => {
    const usuario = await Usuario.findByPk(id);
    return new apiResponse('success', 'OK', usuario);
}

const toggleEstado = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({ estado: !usuario.estado });
        return new apiResponse('success', 'Estado actulizado con exito!', usuario);
    } else {
        return new apiResponse('error', 'El usuario no existe', null);
    }
}

const eliminarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({
            is_deleted: 1,
            deleted_by: 1,
            deleted_at: new Date()
        });
        return new apiResponse('success', 'Usuario eliminar con exito!', null);
    } else {
        return new apiResponse('error', 'El usuario no existe', null);
    }
}

const restablecerContrasenia = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        const password = await bcrypt.hash(usuario.cedula, 10);
        await usuario.update({ password: password });
        return new apiResponse('success', 'Contraseña restablecida con exito!', usuario);
    } else {
        return new apiResponse('error', 'El usuario no existe', null);
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    editarUsuario,
    filtroUsuarios,
    buscarUsuarioPorId,
    toggleEstado,
    eliminarUsuario,
    restablecerContrasenia
}