const express = require('express');
const router = express.Router();

const redPrimariaController = require('../controllers/redPrimariaController');
const acompananteController = require('../controllers/acompananteController');
const antecentePerinatologicoController = require('../controllers/antecentePerinatologicoController');
const estadoHBSController = require('../controllers/estadoHBSController');
const enfermedadCronicaController = require('../controllers/enfermedadCronicaController');
const vacunaController = require('../controllers/vacunaController');
const esquemaVacunacionController = require('../controllers/esquemaVacunacionController');
const primeraConsultaController = require('../controllers/primeraConsultaController');

const redPrimariaValidador = require('../middlewares/validations/redPrimariaValidate');
const acompananteValidator = require('../middlewares/validations/acompananteValidate');
const antecentePerinatologicoValidate = require('../middlewares/validations/antecentePerinatologicoValidate');
const estadoHBSValidate = require('../middlewares/validations/estadoHBSValidate');
const enfermedadCronicaValidator = require('../middlewares/validations/enfermedadCronicaValidator');

const esquemaVacunacionValidator = require('../middlewares/validations/esquemaVacunacionValidator');

//rutas para red primaria
router.post(`/redPrimaria`, redPrimariaValidador.crearRedPrimaria, redPrimariaController.createRedPrimaria);
router.get(`/redPrimaria/:hospital`, redPrimariaValidador.validarBusquedaPorHospital, redPrimariaController.getRedPrimariaPorHospital);
//rutas para acompanante
router.post(`/acompanante`, acompananteValidator.crearAcompanante, acompananteController.crearAcompanante);
router.get(`/acompanante/:identificacion`, acompananteValidator.validarBusquedaPorIdentificacion, acompananteController.getAcompanante);
// Rutas para antecedentes perinatológicos
router.post(`/antecedente-perinatologico`, antecentePerinatologicoValidate.crearAntecedentePerinatologico, antecentePerinatologicoController.createAntecedentePerinatologico);
router.get(`/antecedente-perinatologico/:id_paciente`, antecentePerinatologicoController.getAntecedentesPerinatologicos);
// Rutas para antecedentes famililares
router.post(`/estado-hbs`, estadoHBSValidate.crearEstadoHBS, estadoHBSController.createEstadoHBS);
router.get(`/estado-hbs/:id_paciente`, estadoHBSController.getEstadosHBS);
router.post(`/enfermedad-cronica`, enfermedadCronicaValidator.crearEnfermedadCronica, enfermedadCronicaController.createEnfermedadCronica);
router.get(`/enfermedad-cronica/:id_paciente`, enfermedadCronicaController.getEnfermedadesCronicas);
// Rutas para vacunas
router.get(`/vacunas`, vacunaController.getVacunas);
router.post(`/esquema-vacunacion`, esquemaVacunacionValidator.crearEsquemaVacunacion, esquemaVacunacionController.createEsquemaVacunacion);
router.get(`/esquema-vacunacion/:id_paciente`, esquemaVacunacionController.obtenerVacunasPorPaciente);
// Rutas para ingresos

router.post(`/ingreso`, primeraConsultaController.createPrimeraConsulta);
router.get(`/ingreso/:id_paciente`, primeraConsultaController.getPrimeraConsultaPorPaciente);
router.get(`/ingreso`, primeraConsultaController.getTodasLasPrimerasConsultas);

module.exports = router;
