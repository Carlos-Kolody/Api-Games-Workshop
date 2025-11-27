const request = require('supertest');
const app = require('../src/app');

describe('API Health Check', () => {
    it('Deve retornar status 200 e mensagem "ok" na rota GET /api/health-check', async () => {
        const response = await request(app)
            .get('/api/health-check')
            .expect(200);

        expect(response.body).toEqual({ status: 'ok' });
    });
});