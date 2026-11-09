import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from '../src/app.js';

test('busca por nombre ignorando mayusculas y tildes', async () => {
    const response = await request(app)
        .get('/api/products')
        .query({
            category: 'furniture',
            q: 'silla',
            page: 1,
            limit: 1,
        })
        .expect(200);

    assert.equal(response.body.total, 1);
    assert.equal(response.body.data[0].id, 'desktop-chair');
});

test('pagina el catalogo de cuatro productos de demostracion', async () => {
    const response = await request(app)
        .get('/api/products')
        .query({ page: 1, limit: 2 })
        .expect(200);

    assert.equal(response.body.data.length, 2);
    assert.equal(response.body.total, 4);
    assert.equal(response.body.totalPages, 2);
});

for (const query of [
    { page: '0' },
    { page: 'abc' },
    { limit: '101' },
]) {
    test(`rechaza paginacion invalida: ${JSON.stringify(query)}`, async () => {
        const response = await request(app)
            .get('/api/products')
            .query(query)
            .expect(400);

        assert.equal(
            response.body.error.code,
            'INVALID_PAGINATION'
        );
    });
}

test('devuelve 404 cuando el producto no existe', async () => {
    const response = await request(app)
        .get('/api/products/no-existe')
        .expect(404);

    assert.equal(
        response.body.error.code,
        'PRODUCT_NOT_FOUND'
    );

    test('filtra antes de aplicar la paginacion', async () => {
        const response = await request(app)
            .get('/api/products')
            .query({
                category: 'furniture',
                q: 'silla',
                page: 1,
                limit: 1,
            })
            .expect(200);

        assert.equal(response.body.total, 1);
        assert.equal(response.body.data.length, 1);
        assert.equal(response.body.data[0].id, 'desktop-chair');
    });
});