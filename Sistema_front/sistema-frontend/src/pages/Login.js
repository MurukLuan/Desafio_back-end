import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const { loginUsuario } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        login: usuario,
        senha,
      });

      const token = response.data.token;
      loginUsuario(token);
      navigate('/home');
    } catch (err) {
      setErro('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 5 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Login:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        {erro && <div style={{ color: 'red', marginBottom: 10 }}>{erro}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
