require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const APP_PORT = process.env.APP_PORT;

// Middlewares
app.use(express.json());
app.use(morgan('dev')); // Logging de solicitudes HTTP
app.use(cors()); // Habilita CORS para todas las rutas

// Rutas
app.use('/api', userRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(APP_PORT, () => {
    console.log(`API corriendo en http://localhost:${APP_PORT}`);
});