import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token = '';

describe('Product API Endpoints', () => {
    beforeAll(async () => {
        const user = await request.post('/users').send({
            first_name: 'Test',
            last_name: 'User',
            username: 'product_user',
            password: '12345'
        });
        token = user.body.token;
    });

    it('POST /products should create product', async () => {
        const res = await request
            .post('/products')
            .send({
                name: 'Phone',
                price: 500,
                category: 'tech'
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Phone');
    });

    it('GET /products returns list', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });
});
