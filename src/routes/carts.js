const express = require('express');
const router = express.Router();

let latestCartId = 0;
const carts = [];

class Cart {
  constructor() {
    this.id = ++latestCartId;
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }
}

// Ruta para obtener todos los carritos
router.get('/', (req, res) => {
  res.json(carts);
});

// Ruta para obtener un carrito específico por ID
router.get('/:id', (req, res) => {
  const cart = carts.find(c => c.id === parseInt(req.params.id));
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = new Cart();
  carts.push(newCart);
  res.status(201).json(newCart);
});

// Ruta para agregar un producto a un carrito
router.post('/:cartId/products', (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  const cart = carts.find(c => c.id === parseInt(cartId));
  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  // Aquí suponemos que los productos están disponibles globalmente o importados de alguna forma
  const { products } = require('./products'); // Esta línea necesita una implementación adecuada según tu estructura
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  cart.addProduct(product);
  res.status(201).json(cart);
});

// Ruta para actualizar un carrito específico por ID
router.put('/:id', (req, res) => {
  const cart = carts.find(c => c.id === parseInt(req.params.id));
  if (cart) {
    const { products } = req.body;
    cart.products = products;
    res.json(cart);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

// Ruta para eliminar un carrito específico por ID
router.delete('/:id', (req, res) => {
  const cartIndex = carts.findIndex(c => c.id === parseInt(req.params.id));
  if (cartIndex !== -1) {
    carts.splice(cartIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

module.exports = router;
