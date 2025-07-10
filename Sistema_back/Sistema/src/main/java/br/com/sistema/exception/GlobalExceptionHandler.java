package br.com.sistema.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AcessoNegadoException.class)
    public ResponseEntity<?> handleAcessoNegado(AcessoNegadoException ex) {
        Map<String, Object> erro = new HashMap<>();
        erro.put("timestamp", LocalDateTime.now());
        erro.put("status", HttpStatus.FORBIDDEN.value());
        erro.put("erro", "Acesso negado");
        erro.put("mensagem", ex.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }

}
