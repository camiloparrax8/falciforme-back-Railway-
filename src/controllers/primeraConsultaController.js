const primeraConsultaService = require('../services/primeraConsultaService');

//  Crear una nueva primera consulta
const createPrimeraConsulta = async (request, response, next) => {
    
     const primeraConsulta = request.body;
    

    try {
        const consulta = await primeraConsultaService.crearPrimeraConsulta(primeraConsulta);
        
        response.status(200).json(consulta);
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Ha ocurrido un error: ' + error.message,
        });
    }
};

// Consultar la primera consulta por ID de paciente
const getPrimeraConsultaPorPaciente = async (request, response, next) => {
    try {
        const id_paciente = request.params.id_paciente; // Capturar el ID del paciente desde la URL
        if (!id_paciente) {
            return response.status(400).json({
                status: 'error',
                message: 'El ID del paciente es obligatorio',
            });
        }
        const consulta = await primeraConsultaService.obtenerPrimeraConsultaPorPaciente(id_paciente);
        response.status(200).json(consulta);
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Ha ocurrido un error: ' + error.message,
        });
    }
};

const getTodasLasPrimerasConsultas = async (request, response, next) => {
    try {
        const consultas = await primeraConsultaService.obtenerTodasLasPrimerasConsultas();
        response.status(200).json(consultas);
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Ha ocurrido un error al obtener todas las primeras consultas: ' + error.message,
        });
    }
};

module.exports = {
    createPrimeraConsulta,
    getPrimeraConsultaPorPaciente,
    getTodasLasPrimerasConsultas
};
