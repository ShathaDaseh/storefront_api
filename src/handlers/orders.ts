import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.id);
    res.json(order);
};

const create = async (req: Request, res: Response) => {
    const order = await store.create(req.body);
    res.json(order);
};

const updateStatus = async (req: Request, res: Response) => {
    const order = await store.updateStatus(req.params.id, req.body.status);
    res.json(order);
};

const addProduct = async (req: Request, res: Response) => {
    const { quantity, product_id } = req.body;
    const orderProduct = await store.addProduct(
        parseInt(quantity, 10),
        parseInt(req.params.id, 10),
        parseInt(product_id, 10)
    );
    res.json(orderProduct);
};

const getProducts = async (req: Request, res: Response) => {
    const items = await store.getProducts(req.params.id);
    res.json(items);
};

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken, updateStatus);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
    app.get('/orders/:id/products', verifyAuthToken, getProducts);
};

export default orderRoutes;
