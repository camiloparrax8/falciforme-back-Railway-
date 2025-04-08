const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const usuarioValidador = require('../middlewares/validations/usuarioValidate');
const rolController = require('../controllers/rolController');


router.get(`/`, usuarioController.getUsuarios);
router.get(`/acompaniantes`, usuarioController.getUsuarios);
router.post(`/`, usuarioValidador.crearUsuario, usuarioController.createUsuario);
router.put(`/:id`, usuarioValidador.editarUsuario, usuarioController.editarUsuario);
router.post(`/filtro`, usuarioController.filtroUsuarios);
router.get(`/:id`, usuarioController.buscarUsuarioPorId);
router.get(`/estado/:id`, usuarioController.toggleEstado);
router.delete(`/:id`, usuarioController.eliminarUsuario);
router.put(`/contrasenia/:id`, usuarioController.restablecerContrasenia);
router.get(`/rol`, rolController.getRoles);


module.exports = router;