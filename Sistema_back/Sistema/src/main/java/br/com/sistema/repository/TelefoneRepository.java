package br.com.sistema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sistema.entity.Telefone;

public interface TelefoneRepository extends JpaRepository<Telefone, Long> {
    List<Telefone> findByClienteIdCliente(Long clienteId);
}
