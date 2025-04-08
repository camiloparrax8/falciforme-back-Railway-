const { RedPrimaria, Sequelize } = require('../database/models');

const validarHospitalUnico = async (hospital) => {
    try {
        console.log('En el validador');
        console.log('Valor recibido:', hospital);
        console.log('Modelo RedPrimaria:', RedPrimaria);

        // Normalizar el nombre del hospital
        const normalizedValue = hospital.trim().toLowerCase().replace(/\s+/g, ' ');

        // Buscar en la base de datos hospitales que coincidan
        const existingHospital = await RedPrimaria.findOne({
            where: Sequelize.where(
                Sequelize.fn(
                    'LOWER',
                    Sequelize.fn('TRIM', Sequelize.col('hospital'))
                ),
                normalizedValue
            ),
        });

        if (existingHospital) {
            // Este error será manejado por el validador
            throw new Error('Ya existe un hospital con el mismo nombre');
        }

        return true; // Si no existe, retorna `true`
    } catch (error) {
        console.error('Error en validarHospitalUnico:', error);

        // Propagar el error al cliente directamente
        throw error;
    }
};

module.exports = { validarHospitalUnico };
