package br.com.sistema.enums;


import org.springframework.security.core.GrantedAuthority;

public enum NivelAcesso implements GrantedAuthority {
    ADMIN("admin"),
    PADRAO("padrao");

    private final String role;

    NivelAcesso(String role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return this.role;
    }
}

