import api from './config'; // configuração com interceptor

export const listarClientes = () => api.get('/api/clientes');

export const buscarClientePorId = (id) => api.get(`/api/clientes/${id}`);

export const criarCliente = (dados) => api.post('/api/clientes', dados);

export const atualizarCliente = (id, dados) => api.put(`/api/clientes/${id}`, dados);

export const deletarCliente = (id) => api.delete(`/api/clientes/${id}`);
