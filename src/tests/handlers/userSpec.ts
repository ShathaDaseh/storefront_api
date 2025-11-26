import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('User Endpoints', () => {
    let token = '';

    it('Creates a user', async () => {
        const res = await request.post('/users').send({
            first_name: 'Shatha',
            last_name: 'Daseh',
            username: 'shatha1',
            password: '1234'
        });

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();

        token = res.body;
    });

    it('Gets users (requires auth)', async () => {
        const res = await request.get('/users').set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    });
});
