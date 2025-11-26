import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';

dotenv.config();
const { TOKEN_SECRET = '' } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id);
    res.json(user);
};

const create = async (req: Request, res: Response) => {
    const { first_name, last_name, username, password } = req.body;
    const user = await store.create({ first_name, last_name, username, password });
    const token = jwt.sign({ user }, TOKEN_SECRET);
    res.json(token);
};

const authenticate = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    if (!user) {
        res.status(401).json('Invalid credentials');
        return;
    }
    const token = jwt.sign({ user }, TOKEN_SECRET);
    res.json(token);
};

const userRoutes = (app: express.Application) => {
    app.post('/users', create);                       // signup
    app.post('/users/authenticate', authenticate);    // login
    app.get('/users', verifyAuthToken, index);        // protected
    app.get('/users/:id', verifyAuthToken, show);     // protected
};

export default userRoutes;
