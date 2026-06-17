const request = require('supertest');
const app = require('../app');

describe('Integração API - Entrada', () => {
    test('POST /entrada deve retornar status 201 com o ticket criado', async () => {
        const response = await request(app)
            .post('/entrada')
            .send({ placa: 'XYZ-9999', tipo: 'moto' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.placa).toBe('XYZ-9999');
    });
});