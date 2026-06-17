const express = require('express');
const router = express.Router();
const controller = require('../controllers/estacionamentoController');

router.post('/entrada', controller.entrada);
router.put('/saida/:placa', controller.saida);
router.get('/tickets', controller.listarTickets);
router.get('/tickets/abertos', controller.listarAbertos);
router.get('/tickets/:id', controller.buscarTicket);
router.post('/eventos/veiculo-saiu', controller.eventoSaida);

module.exports = router;