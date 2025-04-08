const { IngresoComplicacionesAgudas, ComplicacionesAgudas } = require("../database/models");
const apiResponse = require("../utils/apiResponse");

const crearIngresoComplicacionAguda = async (data) => {
    try {
        // Verificar que la complicación aguda existe y está activa
        const complicacionAguda = await ComplicacionesAgudas.findOne({
            where: {
                id: data.id_complicacion_aguda,
                estado: true,
                is_deleted: false
            }
        });

        if (!complicacionAguda) {
            return new apiResponse(
                "error",
                "La complicación aguda no existe o no está activa",
                null
            );
        }

        // Crear el nuevo ingreso
        const nuevoIngreso = await IngresoComplicacionesAgudas.create({
            id_complicacion_aguda: data.id_complicacion_aguda,
            tipo_ingreso: data.tipo_ingreso,
            fecha_ingreso: data.fecha_ingreso,
            duracion_ingreso: data.duracion_ingreso,
            motivo_ingreso: data.motivo_ingreso,
            created_at: new Date(),
            updated_at: new Date()
        });

        if (!nuevoIngreso) {
            return new apiResponse(
                "error",
                "Error al crear el ingreso de complicación aguda",
                null
            );
        }

        return new apiResponse(
            "success",
            "Ingreso de complicación aguda creado correctamente",
            nuevoIngreso
        );
    } catch (error) {
        console.error("Error en crearIngresoComplicacionAguda:", error);
        return new apiResponse(
            "error",
            `Error al crear ingreso de complicación aguda: ${error.message}`,
            null
        );
    }
};

const buscarIngresoPorIdComplicacion = async (idComplicacion) => {
    try {
        // Verificar que la complicación existe
        const complicacionAguda = await ComplicacionesAgudas.findOne({
            where: {
                id: idComplicacion,
                estado: true,
                is_deleted: false
            }
        });

        if (!complicacionAguda) {
            return new apiResponse(
                "error",
                "La complicación aguda no existe o no está activa",
                null
            );
        }

        // Buscar TODOS los ingresos para esta complicación (no solo uno)
        const ingresos = await IngresoComplicacionesAgudas.findAll({
            where: { id_complicacion_aguda: idComplicacion },
            include: [{
                model: ComplicacionesAgudas,
                as: 'complicacionAguda',
                attributes: ['fecha', 'dias_crisis', 'intensidad']
            }],
            order: [['fecha_ingreso', 'DESC']] // Ordenar por fecha de ingreso descendente
        });

        if (!ingresos || ingresos.length === 0) {
            return new apiResponse(
                "error",
                "No se encontraron ingresos para esta complicación aguda",
                null
            );
        }

        return new apiResponse(
            "success",
            "Ingresos de complicación aguda encontrados",
            ingresos
        );
    } catch (error) {
        console.error("Error en buscarIngresoPorIdComplicacion:", error);
        return new apiResponse(
            "error",
            `Error al buscar ingresos de complicación aguda: ${error.message}`,
            null
        );
    }
};

module.exports = {
    crearIngresoComplicacionAguda,
    buscarIngresoPorIdComplicacion,
};