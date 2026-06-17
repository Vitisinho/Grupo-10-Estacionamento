const estacionamentoService = require('../services/estacionamentoService');
const db = require('../data/db');

exports.entrada = (req, res) => {
    try {
        const { placa, tipo } = req.body;
        const ticket = estacionamentoService.registrarEntrada(placa, tipo);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.saida = (req, res) => {
    try {
        const { placa } = req.params;
        const ticket = estacionamentoService.registrarSaida(placa);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

exports.listarTickets = (req, res) => res.json(db.tickets);

exports.listarAbertos = (req, res) => res.json(db.tickets.filter(t => !t.pago));

exports.buscarTicket = (req, res) => {
    const ticket = db.tickets.find(t => t.id == req.params.id);
    ticket ? res.json(ticket) : res.status(404).json({ erro: "Ticket não encontrado." });
};

// Endpoint obrigatório de Mensageria (Webhooks)
exports.eventoSaida = (req, res) => {
    const { placa } = req.body;
    res.status(202).json({
        status: "aceito",
        mensagem: `Saida de ${placa} registrada`
    });
};