const { PrimeraConsulta } = require('../database/models');
const apiResponse = require('../utils/apiResponse');

// Crear una nueva primera consulta
const crearPrimeraConsulta = async (primeraConsulta) => {
    
    try {

        const nuevaConsulta = await PrimeraConsulta.create({
            fecha_hematologica: primeraConsulta.fecha_hematologica,
            edad_consulta: primeraConsulta.edad_consulta,
            fecha_inicio_sintoma: primeraConsulta.fecha_inicio_sintoma,
            id_paciente: primeraConsulta.id_paciente,
            id_user_create: primeraConsulta.id_user_create,
            parentescos_multiples: primeraConsulta.parentescos_multiples, // Array de síntomas
        });

     
        

   

        return new apiResponse('success', 'Primera consulta creada correctamente', nuevaConsulta);
    } catch (error) {
        console.error(error);
        return new apiResponse('error', 'Error al crear la primera consulta', error.message);
    }
};

// Consultar la primera consulta por ID de paciente
const obtenerPrimeraConsultaPorPaciente = async (id_paciente) => {
    if (!id_paciente) {
        return new apiResponse('error', 'El ID del paciente es obligatorio', null);
    }

    try {
        const consulta = await PrimeraConsulta.findOne({
            where: {
                id_paciente: parseInt(id_paciente),
                is_deleted: false, // Filtrar solo registros no eliminados
            },
        });

        if (!consulta) {
            return new apiResponse('error', 'No se encontró la primera consulta para este paciente', null);
        }

        return new apiResponse('success', 'Primera consulta encontrada', consulta);
    } catch (error) {
        console.error(error);
        return new apiResponse('error', 'Error al obtener la primera consulta', error.message);
    }
};

const obtenerTodasLasPrimerasConsultas = async () => {
    try {
        const consultas = await PrimeraConsulta.findAll();

        if (!consultas.length) {
            return new apiResponse('error', 'No se encontraron registros de primera consulta', null);
        }

        return new apiResponse('success', 'Lista de primeras consultas obtenida con éxito', consultas);
    } catch (error) {
        console.error("Error en obtenerTodasLasPrimerasConsultas:", error);
        return new apiResponse('error', 'Error al obtener las primeras consultas', error.message);
    }
};


module.exports = {
    crearPrimeraConsulta,
    obtenerPrimeraConsultaPorPaciente,
    obtenerTodasLasPrimerasConsultas
};
