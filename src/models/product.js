"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM products';
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
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(p) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
        INSERT INTO products (name, price, category)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.category ?? null
            ]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async update(id, p) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
        UPDATE products
        SET name=$1, price=$2, category=$3
        WHERE id=$4
        RETURNING *
      `;
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.category ?? null,
                id
            ]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.ProductStore = ProductStore;
