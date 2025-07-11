import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const login = async (login, senha) => {
  return axios.post(`${API_URL}/login`, { login, senha });
};
