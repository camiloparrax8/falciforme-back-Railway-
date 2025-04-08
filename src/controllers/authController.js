// const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../database/models');


// Funciones para generar y verificar tokens JWT
const generateToken = (user) => {
    const expiresIn = 3600; // 1 hora en segundos
    const payload = { usuario: user }; // Cambiado de username a usuario
    const token = jwt.sign(payload, '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z', { expiresIn });

    return { token, expiresIn }; // Retornamos el token y el tiempo de expiración
};

// Controlador para iniciar sesión
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { user: email } });
        if (!user) {
            return res.status(401).json({ message: 'El usuarios no existe' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const { token, expiresIn } = generateToken(user);
        res.json({ data: user, token: token, expiresIn: expiresIn });
    } catch (err) {
        console.log('############## error', JSON.stringify(err))
        next(err);
    }
};

const verificarToken = (request, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = request.header('Authorization');

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z');
        request.usuario = decoded.usuario; // Cambiado de username a usuario
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido.' });
    }
};

module.exports = {
    login,
    verificarToken
};
