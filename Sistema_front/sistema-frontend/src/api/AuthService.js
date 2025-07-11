import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const login = async (login, senha) => {
  // O objeto que será enviado como corpo da requisição
  const payload = {
    login,
    senha,
  };

  // O terceiro argumento do axios.post é o objeto de configuração,
  // onde podemos definir os cabeçalhos (headers).
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Enviamos a requisição com o payload e a configuração.
  return axios.post(`${API_URL}/login`, payload, config);
};
