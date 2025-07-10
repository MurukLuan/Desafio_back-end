package br.com.sistema.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.com.sistema.entity.Cliente;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClienteResponse {

    private Long idCliente;
    private String nome;
    private String cpf;
    private String dados;

    private EnderecoDTO endereco;
    private List<EmailClienteDTO> emails;
    private List<TelefoneDTO> telefones;

    public static ClienteResponse fromEntity(Cliente cliente) {
        return ClienteResponse.builder()
                .idCliente(cliente.getIdCliente())
                .nome(cliente.getNome())
                .cpf(cliente.getCpf())
                .dados(cliente.getDados())
                .endereco(cliente.getEndereco() != null ? EnderecoDTO.fromEntity(cliente.getEndereco()) : null)
                .emails(cliente.getEmails() != null
                        ? cliente.getEmails().stream().map(EmailClienteDTO::fromEntity).collect(Collectors.toList())
                        : null)
                .telefones(cliente.getTelefones() != null
                        ? cliente.getTelefones().stream().map(TelefoneDTO::fromEntity).collect(Collectors.toList())
                        : null)
                .build();
    }
}
