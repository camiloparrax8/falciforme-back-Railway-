'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RedPrimaria extends Model {
        static associate(models) {
            RedPrimaria.associate = (models) => {
                this.hasMany(models.Paciente, {
                    foreignKey: 'id_red_primaria',
                    as: 'pacientes',
                });
            };
         
        }
    }

    RedPrimaria.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            hospital: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            correo: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            telefono: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            telefono_urgencias: {
                type: DataTypes.STRING(15),
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
            modelName: 'RedPrimaria',
            tableName: 'red_primaria',
            timestamps: true,
            paranoid: true, // Habilita el borrado lógico
            underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
        }
    );

    return RedPrimaria;
};
