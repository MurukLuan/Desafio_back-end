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
- Spring Validation
- Lombok
- MySQL
- Maven

## Banco de Dados

- O projeto utiliza **MySQL** como banco de dados.
- O **script completo de criação do banco** está localizado na **raiz do projeto**, na **branch `backend`**.
- Todas as tabelas, chaves estrangeiras, constraints e validações estão prontas para uso, incluindo também o insert com um hash válido 
para as senhas e usuários solicitados ("admin: 123qwe!@#", "padrao: 123qwe").

---

## Execução do Projeto

Para executar o projeto corretamente, é necessário configurar **variáveis de ambiente** com os dados de acesso ao banco de dados,
e também a chave secreta do JWT (você pode criar uma).

### Exemplo no `cmd` (Windows):

```cmd
set DB_USERNAME=seu_usuario
set DB_PASSWORD=sua_senha
set JWT_SECRET=sua_chave_secreta
```
Estas variáveis ficarão disponíveis apenas durante a sessão do terminal. Ao fechar, será necessário defini-las novamente, ou adicioná-las ao sistema.

### Como configurar variáveis no Eclipse (Windows/Linux)

Clique com o botão direito no seu projeto → Run As > Run Configurations...

Selecione a opção Java Application (ou Spring Boot App, se tiver).

Vá até a aba Environment.

Clique em New... e adicione:

Name: DB_USERNAME / DB_PASSWORD / JWT_SECRET

Value: seu valor correspondente

Clique em Apply e depois em Run.

## Instalação do Lombok
O projeto utiliza Lombok para reduzir código boilerplate (como getters/setters, builders, etc).

Como instalar o Lombok no Eclipse
Baixe o jar do Lombok no site oficial: https://projectlombok.org/download

Execute com java -jar lombok.jar

Escolha a instalação do Eclipse correspondente e clique em Install/Update

Reinicie o Eclipse

Certifique-se de que o plugin do Lombok também está configurado no pom.xml, como já está neste projeto.
Para verificar se o lombok foi instalado corretamente vá em HELP > About Eclipse, lá terá a informação da versão do lombok.

## Como Rodar o Projeto
Clone o repositório

Crie o banco de dados MySQL com o script fornecido

Configure as variáveis de ambiente

No Eclipse ou IntelliJ, execute a classe SistemaApplication.java

O projeto rodará em: http://localhost:8080

## Segurança e Autenticação
O sistema utiliza Spring Security com JWT para autenticação.

Existem dois perfis de usuário: ADMIN e PADRAO

Apenas ADMIN pode criar, editar e deletar clientes.

As rotas protegidas exigem um token JWT no cabeçalho Authorization: Bearer <token>

## Testando a API com Postman
Como a aplicação roda em localhost:8080 coloque depois disso a rota a ser testada, como login, clientes...
Para criar o Json vá em Body > selecione RAW e troque TEXT por JSON.

1. Autenticação (Login)
Endpoint: POST /auth/login
Body (JSON):
```Json
{
  "login": "admin",
  "senha": "123qwe!@#"
}
 ou
{
  "login": "padrao",
  "senha": "123qwe"
}
```

O que se espera:

```Json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

Copie o token retornado. Ele será necessário para autenticar as próximas requisições protegidas.

2. Inserir Token nas Requisições Protegidas (essa config servira para todos os endpoints)
Em qualquer requisição (exceto o login), vá até a aba header:
key: Authorization
Value: Bearer <Token>(copiado do login)

key: Content-Type
value: application/json

3. Criar um Cliente (apenas usuário ADMIN)
Endpoint: POST /api/clientes
Método: POST
Body (JSON):

```Json
{
  "nome": "Tony Stark",
  "cpf": "98765432100",
  "dados": "Filantropo e inventor",
  "endereco": {
    "cep": "11222333",
    "logradouro": "Rua das Indústrias Stark",
    "complemento": "Torre Stark",
    "bairro": "Manhattan",
    "cidade": "Nova York",
    "uf": "NY"
  },
  "emails": [
    { "email": "tony@starkindustries.com" }
  ],
  "telefones": [
    { "tipo": "CELULAR", "numero": "11999999999" }
  ]
}
```

4. Listar Todos os Clientes
Endpoint: GET /api/clientes
Método: GET
Headers:
Authorization: Bearer <token>

5. Buscar Cliente por ID
Endpoint: GET /api/clientes/{id}
Exemplo: GET /api/clientes/1
Método: GET

6. Atualizar Cliente
Endpoint: PUT /api/clientes/{id}
Exemplo: PUT /api/clientes/1
Body (JSON):
```json
{
  "nome": "Tony Stark Atualizado",
  "cpf": "98765432100",
  "dados": "Filantropo, inventor e Vingador"
}
```

7. Deletar Cliente
Endpoint: DELETE /api/clientes/{id}
Exemplo: DELETE /api/clientes/1


Espero que tenha conseguido executar a API e testar. Qualquer dúvida poderá me contactar:
murukluan@gmail.com