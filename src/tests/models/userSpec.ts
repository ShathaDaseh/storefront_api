import { UserStore } from '../../../models/user';

const store = new UserStore();

describe('User Model Tests', () => {
    const user = {
        first_name: 'Shatha',
        last_name: 'Daseh',
        username: 'shatha_user',
        password: '12345'
    };

    let createdUserId: number;

    it('should create a user', async () => {
        const result = await store.create(user);
        createdUserId = result.id as number;
        expect(result.username).toBe('shatha_user');
    });

    it('should list users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should show a user', async () => {
        const result = await store.show(`${createdUserId}`);
        expect(result.id).toBe(createdUserId);
    });

    it('should authenticate a user', async () => {
        const result = await store.authenticate('shatha_user', '12345');
        expect(result).toBeTruthy();
        expect(result?.username).toBe('shatha_user');
    });

    it('should NOT authenticate with wrong password', async () => {
        const result = await store.authenticate('shatha_user', 'wrong');
        expect(result).toBeNull();
    });
});
