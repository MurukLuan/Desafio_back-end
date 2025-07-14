package br.com.sistema.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.sistema.dto.ClienteRequest;
import br.com.sistema.dto.ClienteResponse;
import br.com.sistema.entity.Cliente;
import br.com.sistema.repository.ClienteRepository;
import br.com.sistema.repository.EmailClienteRepository;

class ClienteServiceImplTest {

    @InjectMocks
    private ClienteServiceImpl clienteService;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private EmailClienteRepository emailClienteRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveCriarCliente() {
        ClienteRequest dto = new ClienteRequest();
        dto.setNome("Teste");
        dto.setCpf("12345678900");
        dto.setDados("Cliente Teste");

        Cliente cliente = ClienteRequest.toEntity(dto);

        when(clienteRepository.save(any())).thenReturn(cliente);

        ClienteResponse response = clienteService.criarCliente(dto);

        assertEquals("Teste", response.getNome());
        verify(clienteRepository).save(any());
    }

    @Test
    void deveBuscarClientePorId() {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(1L);
        cliente.setNome("Fulano");
        cliente.setCpf("11111111111");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        ClienteResponse response = clienteService.buscarPorId(1L);

        assertEquals("Fulano", response.getNome());
        assertEquals("11111111111", response.getCpf());
    }

    @Test
    void deveLancarExcecaoQuandoClienteNaoEncontradoAoBuscarPorId() {
        when(clienteRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            clienteService.buscarPorId(1L);
        });

        assertEquals("Cliente não encontrado", exception.getMessage());
    }

    @Test
    void deveListarTodosClientes() {
        Cliente cliente = new Cliente();
        cliente.setNome("Teste");
        when(clienteRepository.findAll()).thenReturn(java.util.Arrays.asList(cliente));


        List<ClienteResponse> lista = clienteService.listarTodos();

        assertEquals(1, lista.size());
        assertEquals("Teste", lista.get(0).getNome());
    }

    @Test
    void deveDeletarCliente() {
        when(clienteRepository.existsById(1L)).thenReturn(true);

        clienteService.deletarCliente(1L);

        verify(clienteRepository).deleteById(1L);
    }

    @Test
    void deveLancarExcecaoAoDeletarClienteInexistente() {
        when(clienteRepository.existsById(1L)).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            clienteService.deletarCliente(1L);
        });

        assertEquals("Cliente não encontrado", exception.getMessage());
    }
}
