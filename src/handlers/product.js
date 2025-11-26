"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = await store.create(req.body);
    res.json(product);
};
const update = async (req, res) => {
    const product = await store.update(req.params.id, req.body);
    res.json(product);
};
const destroy = async (req, res) => {
    const product = await store.delete(req.params.id);
    res.json(product);
};
const productRoutes = (app) => {
    app.get('/products', index); // public
    app.get('/products/:id', show); // public
    app.post('/products', verifyAuthToken_1.default, create); // protected
    app.put('/products/:id', verifyAuthToken_1.default, update); // protected
    app.delete('/products/:id', verifyAuthToken_1.default, destroy); // protected
};
exports.default = productRoutes;
