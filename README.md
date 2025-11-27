# Storefront Backend API
Node.js + Express REST API for a simple storefront. Provides user auth (JWT), product management, and orders backed by Postgres.

## Tech Stack
- Node.js 18+, TypeScript, Express
- Postgres 14 (via Docker)
- db-migrate for schema migrations
- bcrypt + jsonwebtoken for auth
- Jasmine + Supertest for tests

## Ports
- API server: `3000`
- Postgres: `5433` (mapped to container `5432`)

## Environment Variables
Create a `.env` in the project root. Example:
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5433
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=store_user
POSTGRES_PASSWORD=store_password
ENV=dev

BCRYPT_PASSWORD=some_pepper_string
SALT_ROUNDS=10
TOKEN_SECRET=supersecretjwtkey
PORT=3000
```

## Setup
1) Install dependencies  
`npm install`

2) Start Postgres (Docker)  
`docker compose up -d postgres`

3) Create databases (dev + test)  
`npx db-migrate db:create store_dev --env dev`  
`npx db-migrate db:create store_test --env test`

4) Run migrations  
`npx db-migrate up --env dev`

## Running
- Build and start: `npm run build && node dist/server.js`
- Dev watch: `npm run watch` (compiles to `dist` then runs)
- Tests: `npm test` (uses `ENV=test` and test DB)

## Endpoints (see REQUIREMENTS.md for full detail)
- Users: `POST /users`, `POST /users/auth`, `GET /users`, `GET /users/:id` (GET routes require Bearer token)
- Products: `GET /products`, `GET /products/:id`, `POST /products` (token)
- Orders: `POST /orders`, `GET /orders/:id`, `POST /orders/:id/products` (token)

## Notes
- Passwords are hashed with bcrypt; only digests are stored.
- JWTs use `TOKEN_SECRET`; send `Authorization: Bearer <token>` for protected routes.
- Update `database.json` if you change ports or credentials so migrations match your env.
