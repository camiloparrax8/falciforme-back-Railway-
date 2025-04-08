"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
      // Relación 1:N - Un paciente puede tener muchos registros en EsquemaVacunacion
      this.hasMany(models.EsquemaVacunacion, {
        foreignKey: "id_paciente",
        as: "esquemaVacunacion",
      });

      // Relación N:M - Un paciente puede recibir muchas vacunas a través del EsquemaVacunacion
      this.belongsToMany(models.Vacuna, {
        through: models.EsquemaVacunacion, // Tabla intermedia
        foreignKey: "id_paciente",
        otherKey: "id_vacunacion",
        as: "vacunas",
      });

      // Relación 1:1 - Un paciente tiene un solo acompañante
      this.belongsTo(models.Acompanante, {
        foreignKey: "id_acompaniante",
        as: "acompaniante",
      });

      // Relación 1:1 - Un paciente pertenece a una Red Primaria
      this.belongsTo(models.RedPrimaria, {
        foreignKey: "id_red_primaria",
        as: "redPrimaria",
      });
    }
  }

  Paciente.init(
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
      fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      id_acompaniante: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_red_primaria: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      identidad_genero: { type: DataTypes.STRING(50), allowNull: true },
      identidad_sexual: { type: DataTypes.STRING(50), allowNull: true },
      estrato: { type: DataTypes.STRING(20), allowNull: true },
      ocupacion: { type: DataTypes.STRING(150), allowNull: true },
      residente: { type: DataTypes.STRING(150), allowNull: true },
      direccion: { type: DataTypes.STRING(255), allowNull: true },
      procedente: { type: DataTypes.STRING(150), allowNull: true },
      regimen: { type: DataTypes.STRING(100), allowNull: true },
      celular: { type: DataTypes.STRING(15), allowNull: true },
      correo: { type: DataTypes.STRING(150), allowNull: true },
      municipio: { type: DataTypes.STRING(15), allowNull: true },
      departamento: { type: DataTypes.STRING(15), allowNull: true },

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
      modelName: "Paciente",
      tableName: "paciente",
      timestamps: true,
      paranoid: true, // Habilita el borrado lógico
      underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
    }
  );

  return Paciente;
};
