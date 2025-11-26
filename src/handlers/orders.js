"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const create = async (req, res) => {
    const order = await store.create(req.body);
    res.json(order);
};
const updateStatus = async (req, res) => {
    const order = await store.updateStatus(req.params.id, req.body.status);
    res.json(order);
};
const addProduct = async (req, res) => {
    const { quantity, product_id } = req.body;
    const orderProduct = await store.addProduct(parseInt(quantity, 10), parseInt(req.params.id, 10), parseInt(product_id, 10));
    res.json(orderProduct);
};
const getProducts = async (req, res) => {
    const items = await store.getProducts(req.params.id);
    res.json(items);
};
const orderRoutes = (app) => {
    app.get('/orders', verifyAuthToken_1.default, index);
    app.get('/orders/:id', verifyAuthToken_1.default, show);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.put('/orders/:id', verifyAuthToken_1.default, updateStatus);
    app.post('/orders/:id/products', verifyAuthToken_1.default, addProduct);
    app.get('/orders/:id/products', verifyAuthToken_1.default, getProducts);
};
exports.default = orderRoutes;
