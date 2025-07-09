# Projeto Sistema (Beck end) - Sistema de Gerenciamento

Este projeto foi desenvolvido como parte de um desafio técnico para vaga **Sênior Backend**, com foco em boas práticas, segurança e arquitetura limpa. 
Utiliza **Java 8**, **Spring Boot**, **Spring Security**, **JWT** e **MySQL**.

---

## Tecnologias Utilizadas
- Java 8
- Spring Boot 2.7.4
- Spring Security
- JWT (JSON Web Token)
- Spring Data JPA / Hibernate
- Lombok
- MySQL
- Maven

## Banco de Dados

- O projeto utiliza **MySQL** como banco de dados.
- O **script completo de criação do banco** está localizado na **raiz do projeto**, na **branch `backend`**.
- Todas as tabelas, chaves estrangeiras, constraints e validações estão prontas para uso.

---

## Execução do Projeto

Para executar o projeto corretamente, é necessário configurar **variáveis de ambiente** com os dados de acesso ao banco de dados.

### Exemplo no `cmd` (Windows):

```cmd
set DB_USERNAME=seu_usuario
set DB_PASSWORD=sua_senha

