const IngresosComplicacionesAgudasService = require("../services/ingresosComplicacionesAgudasService");

const createIngresoComplicacionAguda = async (request, response, next) => {
    try {
        const resultado = await IngresosComplicacionesAgudasService.crearIngresoComplicacionAguda(request.body);
        if (resultado.status === "error") {
            return response.status(400).json(resultado);
        }
        return response.status(201).json(resultado);
    } catch (error) {
        return response.status(500).json({ status: "error", message: error.message });
    }
};

const getIngresoPorComplicacion = async (request, response, next) => {
    try {
        const { id_complicacion } = request.params;
        const resultado = await IngresosComplicacionesAgudasService.buscarIngresoPorIdComplicacion(id_complicacion);
        if (resultado.status === "error") {
            return response.status(404).json(resultado);
        }
        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = {
    createIngresoComplicacionAguda,
    getIngresoPorComplicacion,
};