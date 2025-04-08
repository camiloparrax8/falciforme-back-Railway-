const express = require('express');
const router = express.Router();

const PREFIX = '/api';

//controladores
const authController = require('./src/controllers/authController');
const rolController = require('./src/controllers/rolController');
// const usuarioController = require('./src/controllers/usuarioController');
// const pacienteController = require('./src/controllers/pacienteController');
// const redPrimariaController = require('./src/controllers/redPrimariaController');
// const acompananteController = require('./src/controllers/acompananteController');
// const antecentePerinatologicoController = require('./src/controllers/antecentePerinatologicoController');
// const estadoHBSController  = require('./src/controllers/estadoHBSController');
// const enfermedadCronicaController   = require('./src/controllers/enfermedadCronicaController');
// const vacunaController   = require('./src/controllers/vacunaController');
// const esquemaVacunacionController = require('./src/controllers/esquemaVacunacionController');
// const primeraConsultaController = require('./src/controllers/primeraConsultaController');
// const historiaClinicaController = require('./src/controllers/historiaClinicaController');
// const examenesFisicosController = require('./src/controllers/examenesFisicosController');
// const complicacionesAgudasController = require('./src/controllers/complicacionesAgudasController');
// const complicacionesCronicasController = require('./src/controllers/complicacionesCronicasController');
// const trasplantesProgenitoresController = require('./src/controllers/trasplantesProgenitoresController');
// const laboratoriosController = require('./src/controllers/LaboratoriosController');
// const imagenesDiagnosticasController = require('./src/controllers/imagenesDiagnosticasController');
// const soportesTransfusionalesController = require('./src/controllers/soportesTransfusionalesController');
// const vacunasController = require('./src/controllers/vacunasController');
// const tratamientosController = require('./src/controllers/tartamientosController');

//validadores
// const usuarioValidador = require('./src/middlewares/validations/usuarioValidate');
// const pacienteValidador = require('./src/middlewares/validations/pacienteValidate');
// const redPrimariaValidador = require('./src/middlewares/validations/redPrimariaValidate');
// const acompananteValidator = require('./src/middlewares/validations/acompananteValidate');
// const antecentePerinatologicoValidate = require('./src/middlewares/validations/antecentePerinatologicoValidate');
// const estadoHBSValidate  = require('./src/middlewares/validations/estadoHBSValidate');
// const enfermedadCronicaValidator   = require('./src/middlewares/validations/enfermedadCronicaValidator');

// const esquemaVacunacionValidator   = require('./src/middlewares/validations/esquemaVacunacionValidator');
//login
router.post(`${PREFIX}/login`, authController.login);

// Middleware global: Protege las rutas que vienen después de esta línea
// TEMPORAL: Comentado para pruebas locales, habilitar antes de producción.
router.use(authController.verificarToken);

//rutas para roles
router.get(`${PREFIX}/rol`, rolController.getRoles);

// //rutas para usuarios
// router.get(`${PREFIX}/usuario`, usuarioController.getUsuarios);
// router.get(`${PREFIX}/acompaniantes`, usuarioController.getUsuarios);
// router.post(`${PREFIX}/usuario`, usuarioValidador.crearUsuario, usuarioController.createUsuario);
// router.put(`${PREFIX}/usuario/:id`, usuarioValidador.editarUsuario, usuarioController.editarUsuario);
// router.post(`${PREFIX}/usuario/filtro`, usuarioController.filtroUsuarios);
// router.get(`${PREFIX}/usuario/:id`, usuarioController.buscarUsuarioPorId);
// router.get(`${PREFIX}/usuario/estado/:id`, usuarioController.toggleEstado);
// router.delete(`${PREFIX}/usuario/:id`, usuarioController.eliminarUsuario);
// router.put(`${PREFIX}/usuario/contrasenia/:id`, usuarioController.restablecerContrasenia);

// //rutas para pacientes
// router.post(`${PREFIX}/paciente`, pacienteValidador.crearPaciente, pacienteController.createPaciente);
// router.put(`${PREFIX}/paciente/redPrimaria`, pacienteValidador.actualizarRedPrimaria, pacienteController.ActualizarRedPrimaria);
// router.put(`${PREFIX}/paciente/acompanante`, pacienteValidador.actualizarAcompanante, pacienteController.ActualizarAcompanante);
// router.get(`${PREFIX}/paciente/:identificacion`, pacienteController.getPacientesId);
// router.get(`${PREFIX}/paciente/red/:idpaciente`, pacienteController.getRedPrimariaIdPaciente);

// //rutas para red primaria
// router.post(`${PREFIX}/redPrimaria`, redPrimariaValidador.crearRedPrimaria, redPrimariaController.createRedPrimaria);
// router.get(`${PREFIX}/redPrimaria/:hospital`, redPrimariaValidador.validarBusquedaPorHospital, redPrimariaController.getRedPrimariaPorHospital);
// //rutas para acompanante
// router.post(`${PREFIX}/acompanante`, acompananteValidator.crearAcompanante, acompananteController.crearAcompanante);
// router.get(`${PREFIX}/acompanante/:identificacion`, acompananteValidator.validarBusquedaPorIdentificacion, acompananteController.getAcompanante);
// // Rutas para antecedentes perinatológicos
// router.post(`${PREFIX}/antecedente-perinatologico`, antecentePerinatologicoValidate.crearAntecedentePerinatologico, antecentePerinatologicoController.createAntecedentePerinatologico);
// router.get(`${PREFIX}/antecedente-perinatologico/:id_paciente`, antecentePerinatologicoController.getAntecedentesPerinatologicos);
// // Rutas para antecedentes famililares
// router.post( `${PREFIX}/estado-hbs`, estadoHBSValidate.crearEstadoHBS,estadoHBSController.createEstadoHBS);
// router.get(`${PREFIX}/estado-hbs/:id_paciente`,estadoHBSController.getEstadosHBS);
// router.post(`${PREFIX}/enfermedad-cronica`, enfermedadCronicaValidator.crearEnfermedadCronica, enfermedadCronicaController.createEnfermedadCronica);
// router.get(`${PREFIX}/enfermedad-cronica/:id_paciente`, enfermedadCronicaController.getEnfermedadesCronicas);
// // Rutas para vacunas
// router.get(`${PREFIX}/vacunas`, vacunaController.getVacunas);
// router.post( `${PREFIX}/esquema-vacunacion`,esquemaVacunacionValidator.crearEsquemaVacunacion, esquemaVacunacionController.createEsquemaVacunacion);
// router.get(`${PREFIX}/esquema-vacunacion/:id_paciente`, esquemaVacunacionController.obtenerVacunasPorPaciente);
// // Rutas para ingresos

// router.post( `${PREFIX}/ingreso`, primeraConsultaController.createPrimeraConsulta);
// router.get(`${PREFIX}/ingreso/:id_paciente`, primeraConsultaController.getPrimeraConsultaPorPaciente);
// router.get(`${PREFIX}/ingreso`, primeraConsultaController.getTodasLasPrimerasConsultas);

// // Rutas para HC
// router.get(`${PREFIX}/paciente/:id_paciente/historia-clinica`, historiaClinicaController.buscarHcByIdPaciente);
// // Examenes Fisicos
// router.post(`${PREFIX}/historia-clinica/examenes-fisicos`, examenesFisicosController.createExamenesFisicos);
// // Complicacions Agudas
// router.post(`${PREFIX}/historia-clinica/complicaciones-agudas`, complicacionesAgudasController.createComplicacionesAgudas);
// // Complicaciones Crónicas
// router.post(`${PREFIX}/historia-clinica/complicaciones-cronicas`, complicacionesCronicasController.createComplicacionesCronicas);
// // Trasplantes Progenitores
// router.post(`${PREFIX}/historia-clinica/trasplantes-progenitores`, trasplantesProgenitoresController.crearTransplanteProgenitores);
// // Laboratorios
// router.post(`${PREFIX}/historia-clinica/laboratorios`, laboratoriosController.createLaboratorio);
// // Imagenes Diagnosticas
// router.post(`${PREFIX}/historia-clinica/imagenes-diagnosticas`, imagenesDiagnosticasController.createImagenDiagnostica);
// // Soportes Transfusionales
// router.post(`${PREFIX}/historia-clinica/soportes-transfusionales`, soportesTransfusionalesController.createSoportesTransfusionales);
// // Vacunas
// router.post(`${PREFIX}/historia-clinica/vacunas`, vacunasController.createVacuna);
// // Tratamientos
// router.post(`${PREFIX}/historia-clinica/tratamientos`, tratamientosController.createTratamiento);

module.exports = router;
