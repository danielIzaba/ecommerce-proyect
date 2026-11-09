import { pool } from '../db/pool.js';

export async function findProductById(id) {
    const result = await pool.query(
        `
         SELECT
            id,
            name,
            description,
            category_id AS category,
            price_in_cents AS "priceInCents",
            currency,
            stock
         FROM
            products
         WHERE
            id = $1;
        `,
        [id]
    );
    return result.rows[0] ?? null;
}