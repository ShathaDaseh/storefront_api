import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      return result.rows;
    } finally {
      conn.release();
    }
  }

  async show(id: string): Promise<Order | undefined> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } finally {
      conn.release();
    }
  }

  async create(o: Order): Promise<Order> {
    const conn = await client.connect();
    try {
      const sql = `
        INSERT INTO orders (user_id, status)
        VALUES ($1, $2)
        RETURNING *
      `;
      const result = await conn.query(sql, [o.user_id, o.status]);
      return result.rows[0];
    } finally {
      conn.release();
    }
  }

  async updateStatus(id: string, status: string): Promise<Order | undefined> {
    const conn = await client.connect();
    try {
      const sql = `
        UPDATE orders
        SET status=$1
        WHERE id=$2
        RETURNING *
      `;
      const result = await conn.query(sql, [status, id]);
      return result.rows[0];
    } finally {
      conn.release();
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<OrderProduct> {
    const conn = await client.connect();
    try {
      const sql = `
        INSERT INTO order_products (quantity, order_id, product_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const result = await conn.query(sql, [quantity, orderId, productId]);
      return result.rows[0];
    } finally {
      conn.release();
    }
  }

  async getProducts(orderId: string): Promise<OrderProduct[]> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM order_products WHERE order_id=$1';
      const result = await conn.query(sql, [orderId]);
      return result.rows;
    } finally {
      conn.release();
    }
  }
}
