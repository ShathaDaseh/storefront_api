import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token = '';
let productId = 0;
const unique = Date.now();

describe('Product API Endpoints', () => {
    beforeAll(async () => {
        const user = await request.post('/users').send({
            firstname: 'Test',
            lastname: 'User',
            username: `product_user_${unique}`,
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
        productId = res.body.id;
    });

    it('GET /products returns list', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });

    it('GET /products/:id returns a product', async () => {
        const res = await request.get(`/products/${productId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(productId);
    });
});
