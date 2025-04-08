const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/pacienteController');
const pacienteValidador = require('../middlewares/validations/pacienteValidate');

router.post(`/`, pacienteValidador.crearPaciente, pacienteController.createPaciente);
router.put(`/redPrimaria`, pacienteValidador.actualizarRedPrimaria, pacienteController.ActualizarRedPrimaria);
router.put(`/acompanante`, pacienteValidador.actualizarAcompanante, pacienteController.ActualizarAcompanante);
router.get(`/:identificacion`, pacienteController.getPacientesId);
router.get(`/buscar/:id`, pacienteController.getPacientesId2);
router.get(`/red/:idpaciente`, pacienteController.getRedPrimariaIdPaciente);

module.exports = router;
