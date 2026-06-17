const express = require('express');
const app = express();
const estacionamentoRotas = require('./routes/estacionamentoRoutes');
const mensalistaRotas = require('./routes/mensalistaRoutes');

app.use(express.json());

// Registra as duas rotas no sistema
app.use('/', estacionamentoRotas);
app.use('/', mensalistaRotas);

module.exports = app;