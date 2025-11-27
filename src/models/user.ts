import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD: PEPPER = '', SALT_ROUNDS = '10' } = process.env;

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    password?: string;
};

const salt = parseInt(SALT_ROUNDS);

export class UserStore {
    async index(): Promise<User[]> {
        const conn = await client.connect();
        try {
            const result = await conn.query(
                'SELECT id, firstname, lastname, username FROM users'
            );
            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<User> {
        const conn = await client.connect();
        try {
            const result = await conn.query(
                'SELECT id, firstname, lastname, username FROM users WHERE id=$1',
                [id]
            );
            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(u: User): Promise<User> {
        const conn = await client.connect();
        try {
            const hash = bcrypt.hashSync(u.password + PEPPER, salt);

            const result = await conn.query(
                `INSERT INTO users (firstname, lastname, username, password_digest)
         VALUES ($1, $2, $3, $4)
         RETURNING id, firstname, lastname, username`,
                [u.firstname, u.lastname, u.username, hash]
            );

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect();
        try {
            const result = await conn.query(
                `SELECT * FROM users WHERE username=$1`,
                [username]
            );

            if (result.rows.length) {
                const user = result.rows[0];

                if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
                    delete user.password_digest;
                    return user;
                }
            }
            return null;
        } finally {
            conn.release();
        }
    }
}
