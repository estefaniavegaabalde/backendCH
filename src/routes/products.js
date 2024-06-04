const express = require('express');
const router = express.Router();

let latestProductId = 0;
const products = [];

class Product {
  constructor(title, description, code, price, status, stock, category, thumbnails) {
    this.id = ++latestProductId;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
  }
}

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

// Ruta para obtener un producto específico por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const newProduct = new Product(title, description, code, price, status, stock, category, thumbnails);
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
