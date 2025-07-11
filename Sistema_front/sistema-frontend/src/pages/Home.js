import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Sistema</h1>
      <p>Você está logado com sucesso!</p>

      <div style={{ marginTop: '2rem' }}>
        <h3>Opções:</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/clientes">
            <button style={{ padding: '0.5rem 1rem' }}>📋 Listar Clientes</button>
          </Link>
          <Link to="/clientes/novo">
            <button style={{ padding: '0.5rem 1rem' }}>➕ Cadastrar Novo Cliente</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
