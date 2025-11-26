import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const store = new UserStore();

export const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/auth', auth);
};

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const newUser = await store.create(req.body);
  const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);
  res.json(token);
};

const auth = async (req: Request, res: Response) => {
  const user = await store.authenticate(req.body.username, req.body.password);
  if (!user) return res.status(401).json('Invalid credentials');

  const token = jwt.sign(user, process.env.TOKEN_SECRET as string);
  res.json(token);
};
