/// <reference path="../../types/dotenv.d.ts" />
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

beforeAll(async () => {
    await client.connect();
    await client.query('TRUNCATE users, products, orders, order_products RESTART IDENTITY CASCADE');
});

afterAll(async () => {
    await client.query('TRUNCATE users, products, orders, order_products RESTART IDENTITY CASCADE');
    await client.end();
});
