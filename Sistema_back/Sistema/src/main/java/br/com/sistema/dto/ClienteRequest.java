package br.com.sistema.dto;

import br.com.sistema.entity.Cliente;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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

    public static Cliente toEntity(ClienteRequest dto) {
        return Cliente.builder()
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .dados(dto.getDados())
                .build();
    }
}
