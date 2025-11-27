import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;

const port = parseInt(POSTGRES_PORT || '5432', 10);

// Use test database when ENV=test, but fall back to the primary DB if a test DB name is not provided.
const resolvedDatabase =
    ENV === 'test' ? POSTGRES_TEST_DB || POSTGRES_DB : POSTGRES_DB;

const devConfig = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port,
    connectionTimeoutMillis: 5000,
};

const testConfig = {
    host: POSTGRES_HOST,
    database: resolvedDatabase,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port,
    connectionTimeoutMillis: 5000,
};

const client = new Pool(ENV === 'test' ? testConfig : devConfig);

export default client;
