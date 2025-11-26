import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    const conn = await client.connect();
    try {
      const result = await conn.query('SELECT * FROM orders');
      return result.rows;
    } finally {
      conn.release();
    }
  }

  async show(id: string): Promise<Order> {
    const conn = await client.connect();
    try {
      const result = await conn.query('SELECT * FROM orders WHERE id=$1', [id]);
      return result.rows[0];
    } finally {
      conn.release();
    }
  }

  async create(o: Order): Promise<Order> {
    const conn = await client.connect();
    try {
      const result = await conn.query(
        `INSERT INTO orders (user_id, status)
         VALUES ($1, $2)
         RETURNING *`,
        [o.user_id, o.status]
      );
      return result.rows[0];
    } finally {
      conn.release();
    }
  }
}
