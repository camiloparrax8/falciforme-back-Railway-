'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AntecedentePerinatologico extends Model {
        static associate(models) {
            AntecedentePerinatologico.associate = (models) => {
                this.belongsTo(models.Paciente, {
                    foreignKey: 'id_paciente',
                    as: 'paciente',
                });
            };
        }
    }

    AntecedentePerinatologico.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            peso_al_nacer: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            talla_al_nacer: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            nota: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            condicion_al_nacer: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            cuidado_neonatal: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            etirico_neonatal: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            id_paciente: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Paciente',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            modelName: 'AntecedentePerinatologico',
            tableName: 'antecedentes_perinatologicos',
            timestamps: true,
            paranoid: true, // Habilita el borrado lógico
            underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
        }
    );

    return AntecedentePerinatologico;
};
