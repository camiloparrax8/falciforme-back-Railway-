const { Vacuna } = require('../database/models');
const apiResponse = require('../utils/apiResponse');

const obtenerVacunas = async () => {
    try {
        // Obtener todas las vacunas
        const vacunas = await Vacuna.findAll({
            attributes: ['id', 'nombre'], // Seleccionar solo los campos necesarios
        });

        // Transformar los registros al formato requerido
        const optionsVacunas = vacunas.map(vacuna => ({
            value: vacuna.id.toString(),
            label: vacuna.nombre,
        }));

        return new apiResponse('200', 'Vacunas obtenidas correctamente', optionsVacunas);
    } catch (error) {
        console.error(error);
        return new apiResponse('400', 'Error al obtener las vacunas', error.message);
    }
};

module.exports = {
    obtenerVacunas,
};
