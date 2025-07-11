import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Sistema</h1>
      <p>Você está logado com sucesso!</p>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Opções:</h3>
        <ul>
          <li>
            <Link to="/clientes">Listar Clientes</Link>
          </li>
          <li>
            <Link to="/clientes/novo">Cadastrar Novo Cliente</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
