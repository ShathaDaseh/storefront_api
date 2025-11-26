"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD: PEPPER = '', SALT_ROUNDS = '10' } = process.env;
const HASH_SALT = parseInt(SALT_ROUNDS, 10);
class UserStore {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT id, first_name, last_name, username FROM users';
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
            const sql = 'SELECT id, first_name, last_name, username FROM users WHERE id=$1';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(u) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
        INSERT INTO users (first_name, last_name, username, password_digest)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, username
      `;
            const hash = bcrypt_1.default.hashSync(`${u.password}${PEPPER}`, HASH_SALT);
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.username,
                hash
            ]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT id, first_name, last_name, username, password_digest FROM users WHERE username=$1';
            const result = await conn.query(sql, [username]);
            const user = result.rows[0];
            if (user && bcrypt_1.default.compareSync(`${password}${PEPPER}`, user.password_digest)) {
                const { password_digest, ...safeUser } = user;
                return safeUser;
            }
            return null;
        }
        finally {
            conn.release();
        }
    }
}
exports.UserStore = UserStore;
