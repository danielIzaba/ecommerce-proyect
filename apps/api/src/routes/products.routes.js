import { Router } from 'express';
import { products } from '../data/products.js';

function normalizeText(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

export const productsRouter = Router();

productsRouter.get('/', (req, res) => {
    const { q, category, page = '1', limit = '10' } = req.query;

    if (q !== undefined && typeof q !== 'string') {
        return res.status(400).json({
            error: {
                code: 'INVALID_SEARCH_QUERY',
                message: 'El parametro q deber ser un unico texto.',
            },
        });
    }

    if (
        category != undefined &&
        (typeof category !== 'string' || category.trim() === '')
    ) {
        return res.status(400).json({
            error: {
                code: 'INVALID_CATEGORY',
                message: 'category debe ser un unico texto no vacio.',
            },
        });
    }

    const selectedCategory = category?.trim().toLowerCase();

    const isPositiveInteger = (value) =>
        typeof value === 'string' &&
        /^[1-9]\d*$/.test(value) &&
        Number.isSafeInteger(Number(value));

    if (
        !isPositiveInteger(page) ||
        !isPositiveInteger(limit) ||
        Number(limit) > 100
    ) {
        return res.status(400).json({
            error: {
                code: 'INVALID_PAGINATION',
                message:
                    'page y limit deben ser enteros positivos; limit no puede superar 100.',
            },
        });
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);
    const search = normalizeText(q ?? '');

    const filteredProducts = products.filter((product) => {
        const text = normalizeText(
            `${product.name} ${product.description}`
        );

        const matchesSearch = text.includes(search);

        const matchesCategory =
            selectedCategory === undefined ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const total = filteredProducts.length;
    const start = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
        start,
        start + pageSize
    );

    return res.status(200).json({
        data: paginatedProducts,
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
    });
});

productsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
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