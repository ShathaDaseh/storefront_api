import { OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';

const store = new OrderStore();
const userStore = new UserStore();

describe('Order Model Tests', () => {
    let userId: number;
    let createdOrder: any;

    beforeAll(async () => {
        const user = await userStore.create({
            first_name: 'Order',
            last_name: 'Tester',
            username: `order_model_user_${Date.now()}`,
            password: 'test123'
        });
        userId = user.id as number;
    });

    it('should create an order', async () => {
        const result = await store.create({
            user_id: userId,
            status: 'active'
        });
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
