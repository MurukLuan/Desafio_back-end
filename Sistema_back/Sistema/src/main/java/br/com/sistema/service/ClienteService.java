package br.com.sistema.service;

import br.com.sistema.dto.ClienteRequest;
import br.com.sistema.dto.ClienteResponse;

import java.util.List;

public interface ClienteService {

    ClienteResponse criarCliente(ClienteRequest clienteDTO);

    ClienteResponse atualizarCliente(Long id, ClienteRequest clienteDTO);

    ClienteResponse buscarPorId(Long id);

    List<ClienteResponse> listarTodos();

    void deletarCliente(Long id);
}
