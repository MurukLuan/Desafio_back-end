package br.com.sistema.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import br.com.sistema.entity.EmailCliente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailClienteDTO {

    @NotBlank
    @Email(message = "Formato de e-mail inválido")
    private String email;

    public static EmailClienteDTO fromEntity(EmailCliente email) {
        return EmailClienteDTO.builder()
                .email(email.getEmail())
                .build();
    }

    public static EmailCliente toEntity(EmailClienteDTO dto) {
        return EmailCliente.builder()
                .email(dto.getEmail())
                .build();
    }
}

