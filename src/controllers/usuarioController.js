const usuarioService = require('../services/usuarioService');

const getUsuarios = async (request, response, next) => {
    try {
        const usuarios = await usuarioService.getUsuarios();
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
}
const getAcompaniantes = async (request, response, next) => {
    try {
        const usuarios = await usuarioService.getAcompaniantes();
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
}

const createUsuario = async (request, response, next) => {
    try {
        const usuarios = await usuarioService.crearUsuario(request.body);
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
}

const editarUsuario = async (request, response, next) => {
    try {
        const { id } = request.params;
        const usuarios = await usuarioService.editarUsuario(id, request.body);
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
}

const filtroUsuarios = async (request, response, next) => {
    try {
        const usuarios = await usuarioService.filtroUsuarios(request.body.busqueda);
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
}

const buscarUsuarioPorId = async (request, response, next) => {
    try {
        const { id } = request.params;
        const usuario = await usuarioService.buscarUsuarioPorId(id);
        response.status(200).json(usuario);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);

    }
};

const toggleEstado = async (request, response, next) => {
    try {
        const { id } = request.params;
        const usuario = await usuarioService.toggleEstado(id);
        response.status(200).json(usuario);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);

    }
};

const eliminarUsuario = async (request, response, next) => {
    try {
        const { id } = request.params;
        const usuario = await usuarioService.eliminarUsuario(id);
        response.status(200).json(usuario);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);

    }
};

const restablecerContrasenia = async (request, response, next) => {
    try {
        const { id } = request.params;
        const usuario = await usuarioService.restablecerContrasenia(id);
        response.status(200).json(usuario);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
};

module.exports = {
    getUsuarios,
    createUsuario,
    editarUsuario,
    filtroUsuarios,
    buscarUsuarioPorId,
    toggleEstado,
    eliminarUsuario,
    restablecerContrasenia
}

