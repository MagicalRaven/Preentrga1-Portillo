import React from 'react';
import CartWidget from './CartWidget';
import './NavBar.css'; // Asegúrate de crear este archivo para estilos específicos

const NavBar = ({ Bienvenido }) => {
  return (
    <nav className="navbar">
      <div className="navbar-branding">
        <h1>Supermercado</h1>
      </div>
      <div className="navbar-categories">
        <button>Alimentos enlatados</button>
        <button>Verduras</button>
      </div>
      <CartWidget />
      <div className="navbar-greeting">
        <p>{Bienvenido}</p>
      </div>
    </nav>
  );
};

export default NavBar;
