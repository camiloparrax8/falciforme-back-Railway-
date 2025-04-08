const express = require('express');
const app = express();
const dotenv = require('dotenv');
const listEndpoints = require("express-list-routes");
dotenv.config();

const bodyParser = require('body-parser');
const db = require('./config/database');
const cors = require('cors');

const login = require('./src/routes/login.js');
const usuario = require('./src/routes/usuario.js');
const paciente = require('./src/routes/paciente.js');
const registro = require('./src/routes/registro.js');
const hc = require('./src/routes/hc.js');

const PORT = 3001;

// Configuración del body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));

app.use('/api', login);
app.use('/api/usuario', usuario);
app.use('/api/paciente', paciente);
app.use('/api', registro);
app.use('/api/historia-clinica', hc);

app.get("/routes", (req, res) => {
    const routes = [];
    
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push({
                method: Object.keys(middleware.route.methods).join(", ").toUpperCase(),
                path: middleware.route.path,
            });
        } else if (middleware.name === "router") {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        method: Object.keys(handler.route.methods).join(", ").toUpperCase(),
                        path: handler.route.path,
                    });
                }
            });
        }
    });
    
    res.json(routes);
});

listEndpoints(app);

db.authenticate()
    .then(() => {
        console.log('✅ Conexión a la base de datos establecida.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error al conectar a la base de datos:', error);
    });