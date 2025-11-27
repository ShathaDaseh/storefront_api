import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token = '';
let userId = 0;
let productId = 0;
let orderId = 0;
const unique = Date.now();

describe('Order API Endpoints', () => {
    beforeAll(async () => {
        const user = await request.post('/users').send({
            firstname: 'Order',
            lastname: 'User',
            username: `order_user_api_${unique}`,
            password: '9999'
        });

        token = user.body.token;
        userId = user.body.user.id;

        const product = await request
            .post('/products')
            .send({
                name: 'Phone',
                price: 500,
                category: 'tech'
            })
            .set('Authorization', `Bearer ${token}`);

        productId = product.body.id;

        const createdOrder = await request
            .post('/orders')
            .send({
                user_id: userId,
                status: 'active'
            })
            .set('Authorization', `Bearer ${token}`);

        orderId = createdOrder.body.id;
    });

    it('POST /orders should create an order', async () => {
        const res = await request
            .post('/orders')
            .send({
                user_id: userId,
                status: 'active'
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.user_id).toBe(userId);
        expect(res.body.status).toBe('active');
    });

    it('GET /orders/:id should return an order', async () => {
        const res = await request
            .get(`/orders/${orderId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(orderId);
        expect(res.body.user_id).toBe(userId);
    });

    it('POST /orders/:id/products should add product to order', async () => {
        const res = await request
            .post(`/orders/${orderId}/products`)
            .send({
                product_id: productId,
                quantity: 2
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.product_id).toBe(productId);
        expect(res.body.order_id).toBe(orderId);
        expect(res.body.quantity).toBe(2);
    });
});
