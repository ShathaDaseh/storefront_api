import { OrderStore } from '../../../models/order';

const store = new OrderStore();

describe('Order Model Tests', () => {
    const order = {
        user_id: 1,
        status: 'active'
    };

    let createdOrder: any;

    it('should create an order', async () => {
        const result = await store.create(order);
        createdOrder = result;
        expect(result.status).toBe('active');
    });

    it('should list orders', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should show order by ID', async () => {
        const result = await store.show(`${createdOrder.id}`);
        expect(result.id).toBe(createdOrder.id);
    });
});
