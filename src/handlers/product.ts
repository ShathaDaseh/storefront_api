import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const store = new ProductStore();

export const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};

const index = async (_req: Request, res: Response) => {
    res.json(await store.index());
};

const show = async (req: Request, res: Response) => {
    res.json(await store.show(req.params.id));
};

const create = async (req: Request, res: Response) => {
    res.json(await store.create(req.body));
};
