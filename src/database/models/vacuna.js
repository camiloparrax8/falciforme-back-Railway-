'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vacuna extends Model {
        static associate(models) {
            this.hasMany(models.EsquemaVacunacion, {
                foreignKey: 'id_vacunacion',
                as: 'esquemaVacunacion',
            });
            this.belongsToMany(models.Paciente, {
                through: models.EsquemaVacunacion,
                foreignKey: 'id_vacunacion',
                otherKey: 'id_paciente',
                as: 'pacientes',
            });
        }
        
    }

    Vacuna.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            nombre: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING(255),
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
            modelName: 'Vacuna',
            tableName: 'vacunas',
            timestamps: true,
            paranoid: true, // Habilita el borrado lógico
            underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
        }
    );

    return Vacuna;
};
