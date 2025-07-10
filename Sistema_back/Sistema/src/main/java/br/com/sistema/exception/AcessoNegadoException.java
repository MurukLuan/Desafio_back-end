package br.com.sistema.exception;

import org.springframework.security.access.AccessDeniedException;

public class AcessoNegadoException extends AccessDeniedException {
    
	private static final long serialVersionUID = 1L;

	public AcessoNegadoException() {
        super("Usuário não possui permissão para realizar esta operação.");
    }
}
