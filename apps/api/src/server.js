import { app } from './app.js';

const port = 3001;

app.listen(port, '127.0.0.1', () => {
    console.log(`API disponible en http://localhost:${port}`);
});

