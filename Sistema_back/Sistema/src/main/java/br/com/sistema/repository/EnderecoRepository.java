package br.com.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.sistema.entity.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
}
