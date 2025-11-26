import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { OrderStore } from '../models/order';
import { OrderProductStore } from '../models/orderProduct';

const store = new OrderStore();
const opStore = new OrderProductStore();

export const ordersRoutes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, createOrder);
    app.get('/orders/:id', verifyAuthToken, getOrder);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

const createOrder = async (req: Request, res: Response) => {
    res.json(await store.create(req.body));
};

const getOrder = async (req: Request, res: Response) => {
    res.json(await store.show(req.params.id));
};

const addProduct = async (req: Request, res: Response) => {
    const op = {
        order_id: Number(req.params.id),
        product_id: req.body.product_id,
        quantity: req.body.quantity,
    };
    res.json(await opStore.addProduct(op));
};
