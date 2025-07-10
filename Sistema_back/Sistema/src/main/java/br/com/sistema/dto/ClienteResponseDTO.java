package br.com.sistema.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClienteResponseDTO {

    private Long idCliente;

    private String nome;

    private String cpf;

    private String dados;

    private EnderecoDTO endereco;

    private List<EmailDTO> emails;

    private List<TelefoneDTO> telefones;
}
