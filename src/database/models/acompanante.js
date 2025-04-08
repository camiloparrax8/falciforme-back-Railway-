'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Acompanante extends Model {
        static associate(models) {
            // Relación 1:N - Un acompañante puede estar asociado a varios pacientes
            this.hasMany(models.Paciente, {
                foreignKey: 'id_acompaniante',
                as: 'pacientes',
            });
        }
    }

    Acompanante.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            nombre: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            apellido: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            tipo_identificacion: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            identificacion: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            celular: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            correo: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            municipio: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            departamento: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            direccion: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            ocupacion: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            tipo_vivienda: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            nivel_ingreso: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            nivel_academico: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            tipo_vehiculo: {
                type: DataTypes.STRING(150),
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
            modelName: 'Acompanante',
            tableName: 'acompanantes',
            timestamps: true,
            paranoid: true, // Habilita el borrado lógico
            underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
        }
    );

    return Acompanante;
};
