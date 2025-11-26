import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id);
    res.json(product);
};

const create = async (req: Request, res: Response) => {
    const product = await store.create(req.body);
    res.json(product);
};

const update = async (req: Request, res: Response) => {
    const product = await store.update(req.params.id, req.body);
    res.json(product);
};

const destroy = async (req: Request, res: Response) => {
    const product = await store.delete(req.params.id);
    res.json(product);
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);                          // public
    app.get('/products/:id', show);                       // public
    app.post('/products', verifyAuthToken, create);       // protected
    app.put('/products/:id', verifyAuthToken, update);    // protected
    app.delete('/products/:id', verifyAuthToken, destroy);// protected
};

export default productRoutes;
