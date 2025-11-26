import { ProductStore } from '../../../models/product';

const store = new ProductStore();

describe('Product Model Tests', () => {
    const product = {
        name: 'Laptop',
        price: 2000,
        category: 'Electronics'
    };

    let createdId: number;

    it('should create a product', async () => {
        const result = await store.create(product);
        createdId = result.id as number;
        expect(result.name).toBe('Laptop');
    });

    it('should list products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should show a product', async () => {
        const result = await store.show(`${createdId}`);
        expect(result.id).toBe(createdId);
    });
});
