const { calcularValor } = require('../services/estacionamentoService');

describe('Regras de Negócio - Valores', () => {
    test('Deve retornar 0 para permanência de até 15 minutos (Tolerância gratuita)', () => {
        const valor = calcularValor('carro', 14, false);
        expect(valor).toBe(0.00);
    });

    test('Deve aplicar desconto de 40% para veículo mensalista', () => {
        const valor = calcularValor('carro', 60, true);
        expect(valor).toBe(3.00);
    });
});