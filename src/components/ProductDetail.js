import React from 'react';

const ProductDetail = ({ product }) => {
  if (!product) return <div>Seleccione un producto para ver los detalles.</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductDetail;
