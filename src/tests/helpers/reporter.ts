/// <reference path="../../types/dotenv.d.ts" />
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use test DB when ENV is test; fall back to the primary DB if a test DB name is not provided.
const databaseName =
    (process.env.ENV === 'test' && process.env.POSTGRES_TEST_DB) ||
    process.env.POSTGRES_TEST_DB ||
    process.env.POSTGRES_DB;

const client = new Client({
    host: process.env.POSTGRES_HOST,
    database: databaseName,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

// Allow a bit more time for DB setup on slow machines.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

beforeAll(async () => {
    await client.connect();

    // Ensure tables exist even if migrations were not run before tests.
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(100),
            lastname VARCHAR(100),
            username VARCHAR(150) UNIQUE NOT NULL,
            password_digest VARCHAR(255) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            price INTEGER NOT NULL,
            category VARCHAR(150)
        );
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            status VARCHAR(50) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS order_products (
            id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL
        );

        -- Normalize column names in case an older schema used snake_case.
        DO $$
        BEGIN
            IF EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'users' AND column_name = 'first_name'
            ) THEN
                ALTER TABLE users RENAME COLUMN first_name TO firstname;
            END IF;
            IF EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'users' AND column_name = 'last_name'
            ) THEN
                ALTER TABLE users RENAME COLUMN last_name TO lastname;
            END IF;
        END$$;
    `);

    await client.query(
        'TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE'
    );
});

afterAll(async () => {
    await client.query(
        'TRUNCATE order_products, orders, products, users RESTART IDENTITY CASCADE'
    );
    await client.end();
});
