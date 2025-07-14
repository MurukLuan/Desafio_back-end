package br.com.sistema.controller;

import br.com.sistema.dto.ClienteRequest;
import br.com.sistema.dto.ClienteResponse;
import br.com.sistema.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Cliente", description = "Operações relacionadas a clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @Operation(
        summary = "Criar novo cliente",
        description = "Cria um novo cliente. Acesso restrito a usuários com papel ADMIN.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Cliente criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "403", description = "Acesso negado")
        }
    )
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClienteResponse> criar(@Valid @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.criarCliente(request);
        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Atualizar cliente existente",
        description = "Atualiza os dados de um cliente. Acesso restrito a ADMIN.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado"),
            @ApiResponse(responseCode = "403", description = "Acesso negado")
        }
    )
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClienteResponse> atualizar(@PathVariable Long id,
                                                     @Valid @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.atualizarCliente(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Buscar cliente por ID",
        description = "Retorna os dados de um cliente pelo ID. Disponível para ADMIN e PADRAO.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado"),
            @ApiResponse(responseCode = "403", description = "Acesso negado")
        }
    )
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PADRAO')")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id) {
        ClienteResponse response = clienteService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Listar todos os clientes",
        description = "Lista todos os clientes. Disponível para ADMIN e PADRAO.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
            @ApiResponse(responseCode = "403", description = "Acesso negado")
        }
    )
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PADRAO')")
    public ResponseEntity<List<ClienteResponse>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @Operation(
        summary = "Deletar cliente",
        description = "Exclui um cliente pelo ID. Apenas ADMIN tem acesso.",
        responses = {
            @ApiResponse(responseCode = "204", description = "Cliente deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado"),
            @ApiResponse(responseCode = "403", description = "Acesso negado")
        }
    )
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
