const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

// Usar las rutas
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
