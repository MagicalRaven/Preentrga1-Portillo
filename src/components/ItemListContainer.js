import React, { useEffect, useState } from 'react';

const ItemListContainer = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [category]);

  return (
    <div className="item-list-container">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;
