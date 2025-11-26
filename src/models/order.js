"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM orders WHERE id=$1';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(o) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
        INSERT INTO orders (user_id, status)
        VALUES ($1, $2)
        RETURNING *
      `;
            const result = await conn.query(sql, [o.user_id, o.status]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async updateStatus(id, status) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
        UPDATE orders
        SET status=$1
        WHERE id=$2
        RETURNING *
      `;
            const result = await conn.query(sql, [status, id]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async addProduct(quantity, orderId, productId) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
        INSERT INTO order_products (quantity, order_id, product_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
            const result = await conn.query(sql, [quantity, orderId, productId]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async getProducts(orderId) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=$1';
            const result = await conn.query(sql, [orderId]);
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
}
exports.OrderStore = OrderStore;
