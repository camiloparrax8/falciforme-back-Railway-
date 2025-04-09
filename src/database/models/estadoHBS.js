'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstadoHBS extends Model {
    static associate(models) {
      EstadoHBS.associate = (models) => {
        this.belongsTo(models.Paciente, {
          foreignKey: 'id_paciente',
          as: 'paciente',
        });
      };
    }
  }

  EstadoHBS.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      parentesco: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      linea_parentesco: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
      modelName: 'EstadoHBS',
      tableName: 'Estado_HBS',
      timestamps: true,
      paranoid: true, // Habilita el borrado lógico
      underscored: true, // Usa snake_case para las columnas en la base de datos
    }
  );

  return EstadoHBS;
};
