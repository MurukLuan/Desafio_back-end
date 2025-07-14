package br.com.sistema.controller;

import br.com.sistema.dto.ClienteRequest;
import br.com.sistema.dto.ClienteResponse;
import br.com.sistema.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@Validated
public class ClienteController {

    private final ClienteService clienteService;

    // Criar cliente - ADMIN
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClienteResponse> criar(@Valid @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.criarCliente(request);
        return ResponseEntity.ok(response);
    }

    // Atualizar cliente - ADMIN
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClienteResponse> atualizar(@PathVariable Long id,
                                                     @Valid @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.atualizarCliente(id, request);
        return ResponseEntity.ok(response);
    }

    // Buscar por ID - ADMIN ou PADRAO
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PADRAO')")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id) {
        ClienteResponse response = clienteService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    // Listar todos - ADMIN ou PADRAO
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PADRAO')")
    public ResponseEntity<List<ClienteResponse>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    // Deletar - ADMIN
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
