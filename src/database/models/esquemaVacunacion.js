'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EsquemaVacunacion extends Model {
        static associate(models) {
            this.belongsTo(models.Vacuna, {
                foreignKey: 'id_vacunacion',
                as: 'vacuna',
            });

            this.belongsTo(models.Paciente, {
                foreignKey: 'id_paciente',
                as: 'paciente',
            });
        }
    }

    EsquemaVacunacion.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            id_paciente: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_vacunacion: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            fecha_vacunacion: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            dosis: {
                type: DataTypes.INTEGER,
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
            modelName: 'EsquemaVacunacion',
            tableName: 'Esquema_Vacunacion',
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return EsquemaVacunacion;
};
