const request = require('supertest');
const app = require('../app');

describe('Cadastro de mensalista', () => {

    test('CEP inválido deve retornar 400', async () => {

        const response = await request(app)
            .post('/mensalistas')
            .send({
                placa: 'AAA-1111',
                tipo: 'carro',
                proprietario: 'Vitor',
                cep: '00000000'
            });

        expect(response.status).toBe(400);

    });

});