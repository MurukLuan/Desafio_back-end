package br.com.sistema.enums;


import org.springframework.security.core.GrantedAuthority;

public enum NivelAcesso implements GrantedAuthority {
    admin("admin"),
    padrao("padrao");

    private final String role;

    NivelAcesso(String role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + this.role;
    }
}


