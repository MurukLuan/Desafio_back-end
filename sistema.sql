CREATE DATABASE IF NOT EXISTS sistema;
USE sistema;

CREATE TABLE usuario (
    id_usuario BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    login VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso ENUM('admin', 'padrao') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cliente (
    id_cliente BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    dados TEXT,
    CONSTRAINT chk_nome_length CHECK (LENGTH(nome) >= 3),
    CONSTRAINT chk_nome_valid CHECK (nome REGEXP '^[[:alpha:]0-9 ]{3,100}$'),
     CONSTRAINT chk_cpf_length CHECK (LENGTH(cpf) = 11),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE email (
    id_email BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cliente_id BIGINT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente) ON DELETE CASCADE,
    CONSTRAINT chk_email_format CHECK (email REGEXP '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
);

CREATE TABLE endereco (
    id_endereco BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cliente_id BIGINT UNIQUE NOT NULL,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(100),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf VARCHAR(2),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente) ON DELETE CASCADE,
    CONSTRAINT chk_cep_length CHECK (LENGTH(cep) = 8)
);

CREATE TABLE telefone (
    id_telefone BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cliente_id BIGINT NOT NULL,
    tipo ENUM('CELULAR', 'FIXO', 'COMERCIAL') NOT NULL,
    numero VARCHAR(11) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente) ON DELETE CASCADE,
    CONSTRAINT chk_numero_length CHECK (LENGTH(numero) >= 10 AND LENGTH(numero) <= 11)
);

/*INSERT INTO cliente(nome, cpf, dados) VALUES("kk", "kk@gmail", "12345678910", "kk é apelido de kaká") ;
teste para confirmar se dar erro*/

INSERT INTO cliente(nome, cpf, dados) VALUES("kaká", "12345678910", "primeiro cliente criado"),
("Vegeta", "12345678911", "Princípe dos Saiyajins.");
SELECT * FROM cliente;

INSERT INTO usuario (login, senha, nivel_acesso)
VALUES (
  'admin',
  '$2a$10$dEHbEVFRbdiF5ahPU4E4WOdwCvXmK9UAlh4V4P2H3uviY9syvTYaC',
  'ADMIN'
);

INSERT INTO usuario (login, senha, nivel_acesso)
VALUES (
  'padrao',
  '$2a$10$6/Wmv5ToWGW8oh/mi1nh0OQVPoaps8NRvDl7H6ZlKGNBM3GmeJptq',
  'PADRAO'
);

select * from usuario;

select * from cliente;
select * from endereco;
select * from telefone;
select * from email;

