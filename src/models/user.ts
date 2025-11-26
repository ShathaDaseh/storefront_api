import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD: PEPPER = '', SALT_ROUNDS = '10' } = process.env;

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    username: string;
    password?: string;
};

const HASH_SALT = parseInt(SALT_ROUNDS, 10);

export class UserStore {
    async index(): Promise<User[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT id, first_name, last_name, username FROM users';
            const result = await conn.query(sql);
            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<User | undefined> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT id, first_name, last_name, username FROM users WHERE id=$1';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(u: User): Promise<User> {
        const conn = await client.connect();
        try {
            const sql = `
        INSERT INTO users (first_name, last_name, username, password_digest)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, username
      `;
            const hash = bcrypt.hashSync(`${u.password}${PEPPER}`, HASH_SALT);

            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.username,
                hash
            ]);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect();
        try {
            const sql =
                'SELECT id, first_name, last_name, username, password_digest FROM users WHERE username=$1';

            const result = await conn.query(sql, [username]);
            const user = result.rows[0];

            if (user && bcrypt.compareSync(`${password}${PEPPER}`, user.password_digest)) {
                const { password_digest, ...safeUser } = user;
                return safeUser;
            }
            return null;
        } finally {
            conn.release();
        }
    }
}
