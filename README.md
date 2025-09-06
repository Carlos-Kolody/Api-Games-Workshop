# API de Gerenciamento de Jogos

## 📖 Sobre o Projeto

Esta é uma API RESTful desenvolvida para a matéria de Backend, com o objetivo de criar um sistema para gerenciar uma coleção de jogos eletrônicos. A aplicação permite aos usuários cadastrar, visualizar, atualizar e deletar jogos, além de organizá-los em listas personalizadas.

![Badge de Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

---

## 🚀 Funcionalidades Principais

- **🎮 Gerenciamento de Jogos:**
    - `POST /games`: Adiciona um novo jogo ao catálogo.
    - `GET /games`: Lista todos os jogos disponíveis.
    - `GET /games/{id}`: Busca um jogo específico pelo seu ID.
    - `PUT /games/{id}`: Atualiza as informações de um jogo existente.
    - `DELETE /games/{id}`: Remove um jogo do catálogo.

- **📜 Gerenciamento de Listas de Jogos:**
    - `POST /lists`: Cria uma nova lista de jogos.
    - `GET /lists`: Exibe todas as listas de jogos criadas.
    - `GET /lists/{id}/games`: Exibe todos os jogos de uma lista específica.
    - `POST /lists/{id}/games`: Adiciona um jogo a uma lista específica.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Linguagem:** [Inserir a linguagem de programação, ex: Java, Python, JavaScript]
* **Framework:** [Inserir o framework, ex: Spring Boot, Django, Node.js com Express]
* **Banco de Dados:** [Inserir o banco de dados, ex: PostgreSQL, MySQL, MongoDB]
* **Autenticação:** [Se aplicável, ex: JWT (JSON Web Token)]
* **Outras Ferramentas:** [Se aplicável, ex: Docker, Maven, etc.]

---

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos:**

* [Listar pré-requisitos, ex: Java 11+, Node.js 14+, Docker]
* [Outro pré-requisito, ex: Maven 3.6+]

**Passo a passo:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd seu-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    # Exemplo para projetos Java com Maven
    mvn install

    # Exemplo para projetos Node.js
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    * Renomeie o arquivo `.env.example` para `.env`.
    * Preencha as variáveis de ambiente necessárias, como as credenciais do banco de dados.

5.  **Execute a aplicação:**
    ```bash
    # Exemplo para projetos Spring Boot
    mvn spring-boot:run

    # Exemplo para projetos Node.js
    npm start
    ```

Após a execução, a API estará disponível em `http://localhost:8080` (ou a porta que você configurou).

---

## 🕹️ Como Usar a API

Você pode interagir com a API utilizando ferramentas como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou `curl`.

**Exemplo de requisição para listar todos os jogos:**

```bash
curl -X GET http://localhost:8080/games
