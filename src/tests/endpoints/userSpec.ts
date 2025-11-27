import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token = '';
let createdUserId = 0;
const unique = Date.now();
const creds = {
    username: `shatha_api_${unique}`,
    password: 'pass123'
};

describe('User API Endpoints', () => {

    it('POST /users should create user and return token', async () => {
        const res = await request.post('/users').send({
            firstname: 'Shatha',
            lastname: 'Daseh',
            username: creds.username,
            password: creds.password
        });

        expect(res.status).toBe(200);
        token = res.body.token;
        createdUserId = res.body.user.id;
        expect(token).toBeDefined();
    });

    it('GET /users requires token', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it('GET /users/:id returns a user', async () => {
        const res = await request
            .get(`/users/${createdUserId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.username).toBe(creds.username);
    });

    it('POST /users/auth authenticates and returns token', async () => {
        const res = await request.post('/users/auth').send({
            username: creds.username,
            password: creds.password
        });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

});
