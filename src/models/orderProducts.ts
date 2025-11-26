import client from '../database';

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

export class OrderProductStore {
    async addProduct(op: OrderProduct): Promise<OrderProduct> {
        const conn = await client.connect();
        try {
            const result = await conn.query(
                `INSERT INTO order_products (order_id, product_id, quantity)
         VALUES ($1, $2, $3)
         RETURNING *`,
                [op.order_id, op.product_id, op.quantity]
            );
            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}
