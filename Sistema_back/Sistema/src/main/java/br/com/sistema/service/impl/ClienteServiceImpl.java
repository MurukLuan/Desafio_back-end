package br.com.sistema.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sistema.dto.ClienteRequest;
import br.com.sistema.dto.ClienteResponse;
import br.com.sistema.entity.Cliente;
import br.com.sistema.repository.ClienteRepository;
import br.com.sistema.service.ClienteService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    @Override
    @Transactional
    public ClienteResponse criarCliente(ClienteRequest dto) {
        Cliente cliente = ClienteRequest.toEntity(dto);
        cliente = clienteRepository.save(cliente);
        return ClienteResponse.fromEntity(cliente);
    }

    @Override
    @Transactional
    public ClienteResponse atualizarCliente(Long id, ClienteRequest dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(dto.getNome());
        cliente.setCpf(dto.getCpf());
        cliente.setDados(dto.getDados());

        cliente = clienteRepository.save(cliente);
        return ClienteResponse.fromEntity(cliente);
    }

    @Override
    public ClienteResponse buscarPorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return ClienteResponse.fromEntity(cliente);
    }

    @Override
    public List<ClienteResponse> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void deletarCliente(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }
}
