const { Sequelize } = require('sequelize');
const path = require('path');

const migrationsPath = path.resolve(__dirname, 'scr/migrations');
const modelsPath = path.resolve(__dirname, 'scr/models');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    migrations: {
        path: migrationsPath,
        // Otros ajustes de migraciones según sea necesario
    },
    models: modelsPath,
});

module.exports = sequelize;


