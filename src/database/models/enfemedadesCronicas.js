'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EnfermedadCronica extends Model {
        static associate(models) {
            EnfermedadCronica.associate = (models) => {
                this.belongsTo(models.Paciente, {
                    foreignKey: 'id_paciente',
                    as: 'paciente',
                });
            };
        }

    }

    EnfermedadCronica.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            id_paciente: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'paciente',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            enfermedad: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            enfermedad_especifica: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            portador: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            linea_parentesco_portador: {
                type: DataTypes.STRING(100),
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
            modelName: 'EnfermedadCronica',
            tableName: 'enfermedades_cronicas',
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return EnfermedadCronica;
};
