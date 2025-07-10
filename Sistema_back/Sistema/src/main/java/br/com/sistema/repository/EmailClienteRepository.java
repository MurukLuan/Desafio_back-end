package br.com.sistema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sistema.entity.EmailCliente;

public interface EmailClienteRepository extends JpaRepository<EmailCliente, Long> {
    List<EmailCliente> findByClienteIdCliente(Long clienteId);
}
