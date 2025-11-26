"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Endpoints', () => {
    let token = '';
    it('Creates a user', async () => {
        const res = await request.post('/users').send({
            first_name: 'Shatha',
            last_name: 'Daseh',
            username: 'shatha1',
            password: '1234'
        });
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        token = res.body;
    });
    it('Gets users (requires auth)', async () => {
        const res = await request.get('/users').set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    });
});
