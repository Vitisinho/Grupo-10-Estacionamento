const { registrarEntrada } = require('../services/estacionamentoService');
const db = require('../data/db');

describe('Entrada duplicada', () => {

    beforeEach(() => {
        db.tickets = [];
    });

    test('Não deve permitir veículo já estacionado', () => {

        registrarEntrada('ABC-9999', 'carro');

        expect(() => {
            registrarEntrada('ABC-9999', 'carro');
        }).toThrow('Veículo já se encontra no estacionamento.');

    });

});