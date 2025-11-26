import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/orders';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get('/', (_req, res) => {
    res.send('Storefront API running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
