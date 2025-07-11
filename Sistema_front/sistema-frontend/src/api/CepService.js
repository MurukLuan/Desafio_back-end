import axios from 'axios';

export const buscarEnderecoPorCep = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');
  const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  return response.data;
};
