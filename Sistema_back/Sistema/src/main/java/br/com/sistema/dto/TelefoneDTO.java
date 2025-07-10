package br.com.sistema.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.sistema.entity.Telefone;
import br.com.sistema.enums.TipoTelefone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TelefoneDTO {

    @NotNull
    private TipoTelefone tipo;

    @NotBlank
    @Size(min = 10, max = 11, message = "Telefone deve ter entre 10 e 11 dígitos")
    private String numero;

    public static TelefoneDTO fromEntity(Telefone telefone) {
        return TelefoneDTO.builder()
                .tipo(telefone.getTipo())
                .numero(telefone.getNumero())
                .build();
    }

    public static Telefone toEntity(TelefoneDTO dto) {
        return Telefone.builder()
                .tipo(dto.getTipo())
                .numero(dto.getNumero())
                .build();
    }
}

