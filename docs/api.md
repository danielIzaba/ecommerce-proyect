# API del e-commerce

## Ejecucion local

Requiere la version de Node indicada en `.node-version`.

Desde `apps/api`:

    npm ci
    npm run dev

URL base: http://localhost:3001

Los productos se almacenan temporalmente en memoria.

## Endpoints

| Metodo | Ruta | Descripcion |
| ----- | ---- | ---- |
| GET | /api/health | Comprueba que el servidor responde |
| GET | /api/products | Consulta el catalogo |
| GET | /api/products/:id | Consulta un producto por identificador |

## Busqueda y paginacion

Parametros opcionales de GET /api/products:

| Parametro | Descripcion | Valor predeterminado |
| ---- | ---- | ---- |
| q | Busca en nombre y descripcion, ignorando mayusculas y tildes | texto vacio |
| page | Numero entero positivo de pagina | 1 |
| limit | Numero  entero positivo de productos por pagina, maximo 100 | 10 |

Ejemplo:

     GET /api?products?q=lampara&page=1&limit=2

La respuesta incluye:

- data: productos de la pagina solicitada.
- total: numero total de coincidencias.
- page: pagina solicitada.
- limit: tama;o de pagina.
- totalPages: numero total de paginas.

Una busqueda sin coincidencias o una pagina fuera del catalogo
devuelve 200 con data vacio.

## Errores

| Estado  | Codigo  | Motivo  |
| ----- | ----- | ---- |
| 400 | INVALID_SEARCH_QUERY |  q no es un unico texto |
| 400 | INVALID_PAGINATION | page o limit no cumplen las restricciones |
| 404 | PRODUCT_NOT_FOUND | El identificador solicitado no existe |

