const express = require('express');
const router = express.Router();
const controller = require('../controllers/mensalistaController');

router.post('/mensalistas', controller.cadastrarMensalista);
router.get('/mensalistas', controller.listarMensalistas);
router.get('/cep/:cep', controller.buscarCep);


module.exports = router;