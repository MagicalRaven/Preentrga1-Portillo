import React from 'react';

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Añadir al carrito</button>
    </div>
  );
};

export default Product;
