-- Keycloak DB
CREATE DATABASE keycloak;

-- Iris DB
CREATE DATABASE iris;

-- Backend user
CREATE USER admin_user WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE iris TO admin_user;
GRANT ALL ON SCHEMA public TO admin_user;
ALTER SCHEMA public OWNER TO admin_user;
ALTER DATABASE iris OWNER TO admin_user;
