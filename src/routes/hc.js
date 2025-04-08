const express = require('express');
const router = express.Router();

const historiaClinicaController = require('../controllers/historiaClinicaController');
const examenesFisicosController = require('../controllers/examenesFisicosController');
const complicacionesAgudasController = require('../controllers/complicacionesAgudasController');
const complicacionesCronicasController = require('../controllers/complicacionesCronicasController');
const trasplantesProgenitoresController = require('../controllers/trasplantesProgenitoresController');
const laboratoriosController = require('../controllers/LaboratoriosController');
const imagenesDiagnosticasController = require('../controllers/imagenesDiagnosticasController');
const soportesTransfusionalesController = require('../controllers/soportesTransfusionalesController');
const vacunasController = require('../controllers/vacunasController');
const tratamientosController = require('../controllers/tartamientosController');
const ingresosComplicacionesAgudasController = require('../controllers/ingresosComplicacionesAgudasController');

//Validaores
const examenFisicoValidate = require('../middlewares/validations/examenFisiscoValidate');
const complicacionAgudaValidate = require('../middlewares/validations/complicacionAgudaValidate');
const complicacionCronicaValidate = require('../middlewares/validations/complicacionCronicaValidate');
const trasplanteProgenitorValidate = require('../middlewares/validations/trasplanteProgenitorValidate');
const laboratorioValidate = require('../middlewares/validations/laboratorioValidate');
const imagenDiagnosticaValidate = require('../middlewares/validations/imagenDiagnosticaValidate');
const soporteTransfunsionalValidate = require('../middlewares/validations/soporteTransfunsionalValidate');
const vacunaHcValidate = require('../middlewares/validations/vacunaHcValidate');
const tratamientoValidate = require('../middlewares/validations/tratamientoValidate');

// Rutas para HC
router.get(`/paciente/:id_paciente`, historiaClinicaController.buscarHcByIdPaciente);

router.get(`/paciente/:id_paciente/abierta`, historiaClinicaController.getHcOpenById);
// Examenes Fisicos
router.post(`/examenes-fisicos/`, examenFisicoValidate.validacionCrearExamenFisicoe, examenesFisicosController.createExamenesFisicos);
router.put(`/examenes-fisicos/:id`, examenesFisicosController.updateExamenesFisicos);
router.get(`/examenes-fisicos/:id_paciente`, examenesFisicosController.getExamenFisicoPorPaciente);
// Complicacions Agudas
router.post(`/complicaciones-agudas`, complicacionAgudaValidate.validacionCrearComplicacionAguda, complicacionesAgudasController.createComplicacionesAgudas);
router.get(`/complicaciones-agudas/:id_paciente`, complicacionesAgudasController.obtenerComplicacionAgudaPorPaciente);
// Ingresos Complicaciones Agudas
router.post(`/ingresos-complicaciones-agudas`, ingresosComplicacionesAgudasController.createIngresoComplicacionAguda);
router.get(`/ingresos-complicaciones-agudas/:id_complicacion`, ingresosComplicacionesAgudasController.getIngresoPorComplicacion);
// Complicaciones Crónicas
router.post(`/complicaciones-cronicas`, complicacionCronicaValidate.validacionCrearComplicacionCronica, complicacionesCronicasController.createComplicacionesCronicas);
router.put(`/complicaciones-cronicas/:id`, complicacionesCronicasController.updateComplicacionesCronicas);
router.get(`/complicaciones-cronicas/:id_paciente`, complicacionesCronicasController.getComplicacionesCronicasPorPaciente);
// Trasplantes Progenitores
router.post(`/trasplantes-progenitores`, trasplanteProgenitorValidate.validacionCrearTrasplanteProgenitor, trasplantesProgenitoresController.crearTransplanteProgenitores);
router.get(`/trasplantes-progenitores/:id_paciente`, trasplantesProgenitoresController.getTransplantePorPaciente);

// Laboratorios
router.post(`/laboratorios`, laboratorioValidate.validacionCrearLaboratorio, laboratoriosController.createLaboratorio);
router.get(`/laboratorios/:id_paciente`, laboratoriosController.getLaboratoriosByPaciente);
router.put(`/laboratorios/:id`, laboratoriosController.updateLaboratorioEstado);
// Imagenes Diagnosticas
router.post(`/imagenes-diagnosticas`, imagenDiagnosticaValidate.validacionCrearImagenDiagnostica, imagenesDiagnosticasController.createImagenDiagnostica);
router.get(`/imagenes-diagnosticas/:id_paciente`, imagenDiagnosticaValidate.validacionObtenerImagenesDiagnosticas, imagenesDiagnosticasController.getImagenesDiagnosticasByPaciente);
router.put(`/imagenes-diagnosticas/:id_imagen_diagnostica`, imagenesDiagnosticasController.updateImagenDiagnosticaEstado);
// Soportes Transfusionales
router.post(`/soportes-transfusionales`, soporteTransfunsionalValidate.validacionCrearSoporteTransfunsional, soportesTransfusionalesController.createSoportesTransfusionales);
// Vacunas
router.post(`/vacunas`, vacunaHcValidate.validacionCrearVacunaHc, vacunasController.createVacuna);
// Tratamientos
router.post(`/tratamientos`, tratamientoValidate.validacionCrearTratamiento, tratamientosController.createTratamiento);

module.exports = router;
