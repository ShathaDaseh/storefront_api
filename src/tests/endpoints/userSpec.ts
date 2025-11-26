import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token = '';
const unique = Date.now();

describe('User API Endpoints', () => {

    it('POST /users should create user and return token', async () => {
        const res = await request.post('/users').send({
            first_name: 'Shatha',
            last_name: 'Daseh',
            username: `shatha_api_${unique}`,
            password: 'pass123'
        });

        expect(res.status).toBe(200);
        token = res.body.token;
        expect(token).toBeDefined();
    });

    it('GET /users requires token', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

});
