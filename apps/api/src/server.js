import express from 'express';


const app = express();
const port = 3001;

const products = [
    {
        id: 'desk-lamp',
        name: 'Lámpara de escritorio',
        description: 'Lámpara LeD con intensidad ajsutable.',
        priceInCents: 2999,
        currency: 'USD',
        stock: 12,
    },
    {
        id: 'laptop-stand',
        name: 'Soporte para laptop',
        description: 'Soporte de aluminio para escritorio.',
        currency: 'USD',
        stock: 8,
    },
    {
        id: 'desktop-chair',
        name: 'Silla de escritorio',
        description: 'Silla de oficina para escritorio',
        currency: 'USD',
        stock: 2,
    },
];

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'ecommerce-api',
        version: '0.1.0',
    });
});

app.listen(port, '127.0.0.1', () => {
    console.log(`API disponible en http://localhost:${port}`);
});

app.get('/api/products', (req, res) => {
    res.status(200).json({
        data: products,
        total: products.length,
    });
});
