const vacunaService = require('../services/vacunaService');

const getVacunas = async (request, response) => {
    try {
        // Llama al servicio para obtener las vacunas
        const result = await vacunaService.obtenerVacunas();
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Ha ocurrido un error: ' + error.message,
        });
    }
};

module.exports = {
    getVacunas,
};
