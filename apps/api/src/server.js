import express from 'express';
import { productsRouter } from './routes/products.routes.js';

const app = express();
const port = 3001;

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'ecommerce-api',
        version: '0.1.0',
    });
});

app.use('/api/products', productsRouter);

app.listen(port, '127.0.0.1', () => {
    console.log(`API disponible en http://localhost:${port}`);
});

app.get('/api/products', (req, res) => {
    res.status(200).json({
        data: products,
        total: products.length,
    });
});
