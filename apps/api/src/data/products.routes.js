import { Router } from 'express';
import { products } from '../data/products.js';

export const productsRouter = Router();

productsRouter.get('/', (req, res) => {
    res.status(200).json({
        data: products,
        total: products.length,
    });
});

productsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(400).json({
            error: {
                code: 'PRODUCT_NOT_FOUND',
                message: 'Producto no encontrado',
            },
        });
    }

    return res.status(200).json({
        data: product,
    });
});