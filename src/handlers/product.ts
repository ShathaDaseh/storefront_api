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
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(500).json('Failed to fetch products');
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json('Failed to fetch product');
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product = await store.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json('Failed to create product');
    }
};
