package br.com.sistema.dto;

import br.com.sistema.entity.Cliente;
import br.com.sistema.entity.Endereco;
import br.com.sistema.entity.EmailCliente;
import br.com.sistema.entity.Telefone;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteRequest {

    @NotBlank
    @Size(min = 3, max = 100)
    private String nome;

    @NotBlank
    @Size(min = 11, max = 11)
    private String cpf;

    private String dados;

    private EnderecoDTO endereco;
    private List<EmailClienteDTO> emails;
    private List<TelefoneDTO> telefones;

    public static Cliente toEntity(ClienteRequest dto) {
        Cliente cliente = Cliente.builder()
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .dados(dto.getDados())
                .build();

        // Relacionamentos (com cliente vinculado)
        if (dto.getEndereco() != null) {
            Endereco enderecoEntity = EnderecoDTO.toEntity(dto.getEndereco());
            enderecoEntity.setCliente(cliente);
            cliente.setEndereco(enderecoEntity);
        }

        if (dto.getEmails() != null) {
            List<EmailCliente> emailEntities = dto.getEmails().stream()
                    .map(emailDTO -> {
                        EmailCliente email = EmailClienteDTO.toEntity(emailDTO);
                        email.setCliente(cliente);
                        return email;
                    }).collect(Collectors.toList());
            cliente.setEmails(emailEntities);
        }

        if (dto.getTelefones() != null) {
            List<Telefone> telefoneEntities = dto.getTelefones().stream()
                    .map(telDTO -> {
                        Telefone tel = TelefoneDTO.toEntity(telDTO);
                        tel.setCliente(cliente);
                        return tel;
                    }).collect(Collectors.toList());
            cliente.setTelefones(telefoneEntities);
        }

        return cliente;
    }
}
