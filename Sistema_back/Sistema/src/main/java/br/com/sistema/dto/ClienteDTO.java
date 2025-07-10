package br.com.sistema.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class ClienteDTO {

    @NotBlank
    @Size(min = 3, max = 100)
    @Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Nome deve conter apenas letras, números e espaços")
    private String nome;

    @NotBlank
    @Size(min = 11, max = 11, message = "CPF deve conter exatamente 11 dígitos")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter apenas números")
    private String cpf;

    private String dados;

    private EnderecoDTO endereco;

    private List<EmailClienteDTO> emails;

    private List<TelefoneDTO> telefones;
}

