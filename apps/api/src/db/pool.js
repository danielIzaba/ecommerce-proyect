import pg from 'pg';

const { Pool } = pg;

for (const name of [
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
]) {
    if (!process.env[name]) {
        throw new Error(`Falta la variable de entorno ${name}`);
    }
}

export const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    connectionTimeoutMillis: 5000,
});