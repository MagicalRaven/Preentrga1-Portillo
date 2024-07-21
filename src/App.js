import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import './app.css';

const App = () => {
  const [products] = useState([
    { id: 1, name: 'Frijoles enlatados', description: 'Frijoles en lata de alta calidad', price: 1.5 },
    { id: 2, name: 'Atún enlatado', description: 'Atún en lata con aceite de oliva', price: 2.0 },
    { id: 3, name: 'Maíz enlatado', description: 'Maíz dulce en lata', price: 1.2 },
    { id: 4, name: 'Tomates enlatados', description: 'Tomates pelados en lata', price: 1.8 },
    { id: 5, name: 'Chícharos enlatados', description: 'Chícharos en lata', price: 1.1 },
    { id: 6, name: 'Alcachofas enlatadas', description: 'Alcachofas en lata', price: 2.5 },
    { id: 7, name: 'Espárragos enlatados', description: 'Espárragos en lata', price: 2.2 },
    { id: 8, name: 'Pimientos enlatados', description: 'Pimientos rojos en lata', price: 1.9 },
    { id: 9, name: 'Garbanzos enlatados', description: 'Garbanzos en lata', price: 1.6 },
    { id: 10, name: 'Lentejas enlatadas', description: 'Lentejas en lata', price: 1.4 },
    { id: 11, name: 'Zanahorias', description: 'Zanahorias frescas', price: 0.8 },
    { id: 12, name: 'Espinacas', description: 'Espinacas frescas', price: 1.0 },
    { id: 13, name: 'Lechuga', description: 'Lechuga romana', price: 0.9 },
    { id: 14, name: 'Tomates', description: 'Tomates frescos', price: 1.2 },
    { id: 15, name: 'Pepinos', description: 'Pepinos frescos', price: 0.7 },
    { id: 16, name: 'Pimientos', description: 'Pimientos verdes', price: 1.1 },
    { id: 17, name: 'Cebollas', description: 'Cebollas frescas', price: 0.6 },
    { id: 18, name: 'Ajo', description: 'Ajo fresco', price: 0.5 },
    { id: 19, name: 'Calabacín', description: 'Calabacín fresco', price: 0.9 },
    { id: 20, name: 'Brócoli', description: 'Brócoli fresco', price: 1.3 },
    { id: 21, name: 'Pollo', description: 'Pechuga de pollo', price: 3.5 },
    { id: 22, name: 'Res', description: 'Carne de res', price: 4.0 },
    { id: 23, name: 'Cerdo', description: 'Carne de cerdo', price: 3.8 },
    { id: 24, name: 'Pavo', description: 'Carne de pavo', price: 4.2 },
    { id: 25, name: 'Espaguetis', description: 'Pasta espaguetis', price: 1.0 },
    { id: 26, name: 'Macarrones', description: 'Pasta macarrones', price: 1.1 },
    { id: 27, name: 'Fideos', description: 'Pasta fideos', price: 1.2 },
    { id: 28, name: 'Aceite de oliva', description: 'Aceite de oliva virgen extra', price: 5.0 },
    { id: 29, name: 'Aceite de girasol', description: 'Aceite de girasol', price: 3.5 },
    { id: 30, name: 'Arroz', description: 'Arroz blanco', price: 2.0 }
  ]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = product => {
    setCart([...cart, product]);
  };

  const selectProduct = product => {
    setSelectedProduct(product);
  };

  return (
    <div className="App">
      <h1>Supermercado</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} />
      <ProductDetail product={selectedProduct} />
    </div>
  );
};

export default App;
