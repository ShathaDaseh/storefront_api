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

const devConfig = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port,
};

const testConfig = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port,
};

const client = new Pool(ENV === 'test' ? testConfig : devConfig);

export default client;
