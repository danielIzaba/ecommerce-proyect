import express from 'express';


const app = express();
const port = 3001;

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