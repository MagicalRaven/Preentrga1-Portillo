import React from 'react';

const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
