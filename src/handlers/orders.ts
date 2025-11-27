import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { OrderStore } from '../models/order';
import { OrderProductStore } from '../models/orderProducts';

const store = new OrderStore();
const opStore = new OrderProductStore();

export const ordersRoutes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, createOrder);
    app.get('/orders/:id', verifyAuthToken, getOrder);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.create(req.body);
        res.json(order);
    } catch (err) {
        res.status(500).json('Failed to create order');
    }
};

const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(500).json('Failed to retrieve order');
    }
};

const addProduct = async (req: Request, res: Response) => {
    const op = {
        order_id: Number(req.params.id),
        product_id: req.body.product_id,
        quantity: req.body.quantity,
    };
    try {
        const orderProduct = await opStore.addProduct(op);
        res.json(orderProduct);
    } catch (err) {
        res.status(500).json('Failed to add product to order');
    }
};
