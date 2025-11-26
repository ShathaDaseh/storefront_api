import express from 'express';
import dotenv from 'dotenv';
import { usersRoutes } from './handlers/users';
import { productsRoutes } from './handlers/product';
import { ordersRoutes } from './handlers/orders';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
