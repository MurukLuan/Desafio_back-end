import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { logoutUsuario, isAuthenticated } = useAuth();

  return (
    
    <nav style={{ padding: '1rem', background: '#70aee1ff', maxWidth:'100%' }}>
      
      {isAuthenticated && (
        <>
          <Link to="/"><button style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', marginLeft: '1rem', color:'#fff', fontWeight:'bold'}}>Página inicial</button></Link>
          <Link to="/clientes"><button style={{ padding: '0.5rem 1rem', backgroundColor: 'lightblue', marginLeft: '1rem', color:'#fff', fontWeight:'bold'}}>Listar Clientes</button></Link>

          <button style={{ padding: '0.5rem 1rem', backgroundColor: 'red', marginLeft: '1rem', color:'#fff', fontWeight:'bold'}} onClick={logoutUsuario}>Sair</button>
        </>
      )}
    </nav>
    
  );
};

export default Navbar;
