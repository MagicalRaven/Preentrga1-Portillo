// routes/carts.js
const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

const CARTS_FILE = './data/carrito.json';

// Funciones para leer o escribir en el archivo
const readCarts = async () => {
    try {
      const data = await fs.readFile(CARTS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Si el archivo no existe, regresa un array vacío
        await writeCarts([]); // Crear el archivo vacío
        return [];
      } else {
        throw error; // Si hay otro error, lánzalo
      }
    }
  };
  

//Crear un nuevo carrito
router.post('/', async (req, res) => {
  const carts = await readCarts();
  const newCart = { id: generateId(carts), products: [] };
  carts.push(newCart);
  await writeCarts(carts);
  res.status(201).json(newCart);
});

//Obtener productos de un carrito
router.get('/:cid', async (req, res) => {
  const carts = await readCarts();
  const cart = carts.find((c) => c.id === parseInt(req.params.cid));
  cart ? res.json(cart.products) : res.status(404).json({ error: 'Carrito no encontrado' });
});

//Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const carts = await readCarts();
  const cartIndex = carts.findIndex((c) => c.id === parseInt(req.params.cid));
  if (cartIndex === -1) return res.status(404).json({ error: 'Carrito no encontrado' });

  const productId = parseInt(req.params.pid);
  const existingProduct = carts[cartIndex].products.find((p) => p.product === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    carts[cartIndex].products.push({ product: productId, quantity: 1 });
  }

  await writeCarts(carts);
  res.status(201).json(carts[cartIndex]);
});

module.exports = router;
