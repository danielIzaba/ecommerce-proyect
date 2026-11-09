BEGIN;

INSERT INTO categories (id, name)
VALUES
    ('lighting', 'Iluminacion'),
    ('accesories', 'Accesorios'),
    ('furniture', 'Muebles'),
    ('electronics', 'Electronica');

INSERT INTO products (
    id,
    name,
    description,
    category_id,
    price_in_cents,
    currency,
    stock
)
VALUES
    (
        'desk-lamp',
        'Lampara de escritorio',
        'Lampara LED con intensidad ajustable.',
        'lighting',
        2999,
        'USD',
        12
    ),
    (
        'laptop-stand',
        'Soporte para laptop',
        'Soporte de aluminio para escritorio.',
        'accesories',
        4500,
        'USD',
        8
    ),
    (
        'desktop-chair',
        'Silla de escritorio',
        'Silla de oficina para escritorio.',
        'furniture',
        12999,
        'USD',
        2
    ),
    (
        'speakers-desktop-computer',
        'Altavoces para computadora de escritrio',
        'Altavoces para computadora de escritorio.',
        'electronics',
        3999,
        'USD',
        10
    );

COMMIT;