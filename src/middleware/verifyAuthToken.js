"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET = '' } = process.env;
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json('Missing authorization header');
            return;
        }
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401).json('Access denied, invalid token');
    }
};
exports.default = verifyAuthToken;
