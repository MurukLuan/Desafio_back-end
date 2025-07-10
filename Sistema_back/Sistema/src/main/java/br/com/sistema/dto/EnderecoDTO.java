package br.com.sistema.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import br.com.sistema.entity.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnderecoDTO {

    @NotBlank
    @Size(min = 8, max = 8, message = "CEP deve conter 8 dígitos")
    private String cep;

    private String logradouro;
    private String complemento;
    private String bairro;
    private String cidade;

    @Size(min = 2, max = 2, message = "UF deve conter 2 letras")
    private String uf;

    public static EnderecoDTO fromEntity(Endereco endereco) {
        return EnderecoDTO.builder()
                .cep(endereco.getCep())
                .logradouro(endereco.getLogradouro())
                .complemento(endereco.getComplemento())
                .bairro(endereco.getBairro())
                .cidade(endereco.getCidade())
                .uf(endereco.getUf())
                .build();
    }

    public static Endereco toEntity(EnderecoDTO dto) {
        return Endereco.builder()
                .cep(dto.getCep())
                .logradouro(dto.getLogradouro())
                .complemento(dto.getComplemento())
                .bairro(dto.getBairro())
                .cidade(dto.getCidade())
                .uf(dto.getUf())
                .build();
    }
}


