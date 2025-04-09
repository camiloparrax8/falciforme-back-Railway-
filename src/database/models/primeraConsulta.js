'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PrimeraConsulta extends Model {}

    PrimeraConsulta.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            fecha_hematologica: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            edad_consulta: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            fecha_inicio_sintoma: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            id_paciente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'paciente',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            parentescos_multiples: {
                type: DataTypes.JSON, 
                allowNull: true,
            },
            id_user_create: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id_user_update: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id_user_delete: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'PrimeraConsulta',
            tableName: 'Primera_Consulta',
            timestamps: true,
            paranoid: true, // Habilita el borrado lógico
            underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
        }
    );

    return PrimeraConsulta;
};
