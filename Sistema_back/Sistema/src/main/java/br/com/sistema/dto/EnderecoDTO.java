package br.com.sistema.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
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
}

