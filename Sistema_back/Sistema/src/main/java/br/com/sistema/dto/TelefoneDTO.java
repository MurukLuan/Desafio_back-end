package br.com.sistema.dto;

import br.com.sistema.enums.TipoTelefone;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class TelefoneDTO {

    @NotNull
    private TipoTelefone tipo;

    @NotBlank
    @Size(min = 10, max = 11, message = "Telefone deve ter entre 10 e 11 dígitos")
    private String numero;
}
