import { pool } from './pool.js';
import { findProductById } from '../repositories/products.repository.js';

const id = process.argv[2] ?? 'desk-lamp';

try {
    const product = await findProductById(id);

    if (product === null) {
        console.log(`Producto no encontrado: ${id}`);
    } else {
        console.log(product);
    }
} catch (error) {
    console.error('Error consultando el producto:', error.message);
    process.exitCode = 1;
} finally {
    await pool.end();
}