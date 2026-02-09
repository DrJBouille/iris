CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE IF NOT EXISTS friend_status AS ENUM ('PENDING','APPROVED','REJECTED','CANCELLED');

CREATE TABLE IF NOT EXISTS iris_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keycloak_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(24) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friend_request (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES iris_user(id),
    receiver_id UUID REFERENCES iris_user(id),
    status friend_status DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friendship (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES iris_user(id),
    receiver_id UUID REFERENCES iris_user(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);