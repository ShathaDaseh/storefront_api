CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(150) UNIQUE NOT NULL,
    password_digest VARCHAR(255) NOT NULL
);
