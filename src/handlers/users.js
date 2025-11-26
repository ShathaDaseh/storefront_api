"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
dotenv_1.default.config();
const { TOKEN_SECRET = '' } = process.env;
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const user = await store.create({ first_name, last_name, username, password });
    const token = jsonwebtoken_1.default.sign({ user }, TOKEN_SECRET);
    res.json(token);
};
const authenticate = async (req, res) => {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    if (!user) {
        res.status(401).json('Invalid credentials');
        return;
    }
    const token = jsonwebtoken_1.default.sign({ user }, TOKEN_SECRET);
    res.json(token);
};
const userRoutes = (app) => {
    app.post('/users', create); // signup
    app.post('/users/authenticate', authenticate); // login
    app.get('/users', verifyAuthToken_1.default, index); // protected
    app.get('/users/:id', verifyAuthToken_1.default, show); // protected
};
exports.default = userRoutes;
