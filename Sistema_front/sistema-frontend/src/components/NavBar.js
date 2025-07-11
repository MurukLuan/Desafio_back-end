import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { logoutUsuario, isAuthenticated } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#f2f2f2' }}>
      <Link to="/">Home</Link>
      {isAuthenticated && (
        <>
          {' | '}
          <Link to="/clientes">Clientes</Link>
          {' | '}
          <button onClick={logoutUsuario}>Sair</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
