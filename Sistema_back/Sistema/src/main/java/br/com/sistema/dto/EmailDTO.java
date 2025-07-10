package br.com.sistema.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class EmailDTO {

    @NotBlank
    @Email(message = "Formato de e-mail inválido")
    private String email;
}
