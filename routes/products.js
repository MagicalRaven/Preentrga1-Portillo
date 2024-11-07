// routes/products.js
const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

const PRODUCTS_FILE = './data/productos.json';

// Función para leer productos
const readProducts = async () => {
  const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Función para escribir productos
const writeProducts = async (products) => {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

// Generar un ID único
const generateId = (products) => {
  const lastProduct = products[products.length - 1];
  return lastProduct ? lastProduct.id + 1 : 1;
};

// Ruta GET / - Listar productos
router.get('/', async (req, res) => {
  const { limit } = req.query;
  const products = await readProducts();
  res.json(limit ? products.slice(0, limit) : products);
});

// Ruta GET /:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
  const products = await readProducts();
  const product = products.find((p) => p.id === parseInt(req.params.pid));
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

// Ruta POST / - Agregar nuevo producto
router.post('/', async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails = [], status = true } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
  }

  const products = await readProducts();
  const newProduct = {
    id: generateId(products),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  products.push(newProduct);
  await writeProducts(products);
  res.status(201).json(newProduct);
});

// Ruta PUT /:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === parseInt(req.params.pid));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const { title, description, code, price, stock, category, thumbnails, status } = req.body;
  products[index] = {
    ...products[index],
    ...(title && { title }),
    ...(description && { description }),
    ...(code && { code }),
    ...(price && { price }),
    ...(status !== undefined && { status }),
    ...(stock && { stock }),
    ...(category && { category }),
    ...(thumbnails && { thumbnails }),
  };
  await writeProducts(products);
  res.json(products[index]);
});

// Ruta DELETE /:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
  const products = await readProducts();
  const newProducts = products.filter((p) => p.id !== parseInt(req.params.pid));
  if (newProducts.length === products.length) return res.status(404).json({ error: 'Producto no encontrado' });

  await writeProducts(newProducts);
  res.status(204).end();
});

module.exports = router;
