import { pool } from './pool.js';

try {
    const result = await pool.query(`
        SELECT
            id,
            name,
            category_id,
            price_in_cents,
            currency,
            stock
        FROM products
        ORDER BY id;`
    );

    console.table(result.rows);
    console.log(`Conexion correcta. Productos: ${result.rowCount}`);
} catch (error) {
    console.error('No se pudo consultar PostgreSQL:', error.message);
    process.exitCode = 1;
} finally {
    await pool.end();
}