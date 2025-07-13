package br.com.sistema.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sistema.dto.ClienteRequest;
import br.com.sistema.dto.ClienteResponse;
import br.com.sistema.dto.EmailClienteDTO;
import br.com.sistema.dto.EnderecoDTO;
import br.com.sistema.dto.TelefoneDTO;
import br.com.sistema.entity.Cliente;
import br.com.sistema.repository.ClienteRepository;
import br.com.sistema.repository.EmailClienteRepository;
import br.com.sistema.service.ClienteService;
import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

	private final ClienteRepository clienteRepository;
	private final EmailClienteRepository emailClienteRepository;

	@Override
	@Transactional
	public ClienteResponse criarCliente(ClienteRequest dto) {
		Cliente cliente = ClienteRequest.toEntity(dto);
		cliente = clienteRepository.save(cliente);
		return ClienteResponse.fromEntity(cliente);
	}

	@Override
	@Transactional
	public ClienteResponse atualizarCliente(Long id, ClienteRequest dto) {
	    Cliente cliente = clienteRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

	    
	    cliente.setNome(dto.getNome());
	    cliente.setCpf(dto.getCpf());
	    cliente.setDados(dto.getDados());

	    
	    if (dto.getEndereco() != null) {
	        if (cliente.getEndereco() != null) {
	            var endereco = cliente.getEndereco();
	            var dtoEndereco = dto.getEndereco();
	            endereco.setCep(dtoEndereco.getCep());
	            endereco.setLogradouro(dtoEndereco.getLogradouro());
	            endereco.setComplemento(dtoEndereco.getComplemento());
	            endereco.setBairro(dtoEndereco.getBairro());
	            endereco.setCidade(dtoEndereco.getCidade());
	            endereco.setUf(dtoEndereco.getUf());
	        } else {
	            var endereco = EnderecoDTO.toEntity(dto.getEndereco());
	            endereco.setCliente(cliente);
	            cliente.setEndereco(endereco);
	        }
	    }

	    
	 
	    emailClienteRepository.deleteByCliente(cliente);

	    if (cliente.getEmails() == null) {
	        cliente.setEmails(new ArrayList<>());
	    } else {
	        cliente.getEmails().clear();
	    }

	    if (dto.getEmails() != null) {
	        for (EmailClienteDTO emailDTO : dto.getEmails()) {
	            var email = EmailClienteDTO.toEntity(emailDTO);
	            email.setCliente(cliente);
	            cliente.getEmails().add(email);
	        }
	    }



	   
	    if (cliente.getTelefones() == null) {
	        cliente.setTelefones(new ArrayList<>());
	    } else {
	        cliente.getTelefones().clear();
	    }

	    if (dto.getTelefones() != null) {
	        for (TelefoneDTO telDTO : dto.getTelefones()) {
	            var tel = TelefoneDTO.toEntity(telDTO);
	            tel.setCliente(cliente);
	            cliente.getTelefones().add(tel);
	        }
	    }

	    cliente = clienteRepository.save(cliente);
	    return ClienteResponse.fromEntity(cliente);
	}


	@Override
	public ClienteResponse buscarPorId(Long id) {
		Cliente cliente = clienteRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
		return ClienteResponse.fromEntity(cliente);
	}

	@Override
	public List<ClienteResponse> listarTodos() {
		return clienteRepository.findAll().stream().map(ClienteResponse::fromEntity).collect(Collectors.toList());
	}

	@Override
	public void deletarCliente(Long id) {
		if (!clienteRepository.existsById(id)) {
			throw new RuntimeException("Cliente não encontrado");
		}
		clienteRepository.deleteById(id);
	}
}
