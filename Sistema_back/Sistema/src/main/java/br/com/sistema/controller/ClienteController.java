package br.com.sistema.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ClienteController {
	
	@GetMapping("/cliente")
	public String teste() {
		return "Funcionando";
	}

}
