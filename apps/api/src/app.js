import express from 'express';
import { productsRouter } from './routes/products.routes.js';

export const app = express();

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'ecommerce-api',
        version: '0.1.0',
    });
});

app.use('/api/products', productsRouter);
