# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Environment and Ports
- API server runs on port `3000`.
- Postgres runs on port `5433` (host) -> `5432` (container).
- Required env vars: `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_TEST_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `ENV`, `BCRYPT_PASSWORD`, `SALT_ROUNDS`, `TOKEN_SECRET`, `PORT`.

## API Endpoints
All routes use JSON bodies and responses.

### Users
- `POST /users` - create user (public) returns JWT and user payload.
- `POST /users/auth` - authenticate (public) returns JWT and user payload.
- `GET /users` - list users (token required).
- `GET /users/:id` - show user by id (token required).

### Products
- `GET /products` - list products (public).
- `GET /products/:id` - show product by id (public).
- `POST /products` - create product (token required).
- `[not implemented]` Top 5 most popular products.
- `[not implemented]` Products by category.

### Orders
- `POST /orders` - create order (token required).
- `GET /orders/:id` - fetch order by id (token required).
- `POST /orders/:id/products` - add product to order (token required).

## Database Schema
### users
- `id` SERIAL PRIMARY KEY
- `firstname` VARCHAR(100)
- `lastname` VARCHAR(100)
- `username` VARCHAR(150) UNIQUE NOT NULL
- `password_digest` VARCHAR(255) NOT NULL

### products
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(150) NOT NULL
- `price` INTEGER NOT NULL
- `category` VARCHAR(150)

### orders
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES users(id)
- `status` VARCHAR(50) NOT NULL

### order_products
- `id` SERIAL PRIMARY KEY
- `order_id` INTEGER REFERENCES orders(id) ON DELETE CASCADE
- `product_id` INTEGER REFERENCES products(id) ON DELETE CASCADE
- `quantity` INTEGER NOT NULL

## Data Shapes
These align to the tables above.

### Product
- id
- name
- price
- category

### User
- id
- firstname
- lastname
- username
- password (only accepted on create/auth; stored as password_digest)

### Order
- id
- user_id
- status
- products: array of `{ product_id, quantity }` (via order_products)

## Setup Summary
- Install dependencies: `npm install`.
- Start Postgres: `docker compose up -d postgres`.
- Create DBs: `npx db-migrate db:create store_dev --env dev` and `npx db-migrate db:create store_test --env test`.
- Run migrations: `npx db-migrate up --env dev`.
- Start API: `npm run build && node dist/server.js` (or `npm run watch`).
