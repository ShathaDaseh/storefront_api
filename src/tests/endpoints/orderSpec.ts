import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token = '';
let userId = 0;
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
    });
});
