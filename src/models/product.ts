import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const result = await conn.query('SELECT * FROM products');
            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<Product> {
        const conn = await client.connect();
        try {
            const result = await conn.query('SELECT * FROM products WHERE id=$1', [
                id,
            ]);
            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(p: Product): Promise<Product> {
        const conn = await client.connect();
        try {
            const result = await conn.query(
                `INSERT INTO products (name, price, category)
         VALUES ($1, $2, $3)
         RETURNING *`,
                [p.name, p.price, p.category]
            );
            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}
