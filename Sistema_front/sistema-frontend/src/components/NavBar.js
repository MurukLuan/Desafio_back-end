import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated && (
        <>
          <Link to="/clientes">Clientes</Link>
          <button onClick={logout}>Sair</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
