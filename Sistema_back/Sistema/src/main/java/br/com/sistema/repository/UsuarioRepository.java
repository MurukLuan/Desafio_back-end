package br.com.sistema.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sistema.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByLogin(String login);
}

