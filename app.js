// app.js
const express = require('express');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
