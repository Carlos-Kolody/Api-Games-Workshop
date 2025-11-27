# API de Gerenciamento de Catálogo de Jogos
# Sobre o Projeto
Esta é uma API RESTful desenvolvida para a matéria de Backend. O projeto, que começou como uma aplicação monolítica, evoluiu para uma arquitetura de microsserviços com o objetivo de criar um sistema robusto para gerenciar jogos, usuários e seus catálogos pessoais.

A aplicação permite o gerenciamento completo de jogos, o cadastro de usuários e a funcionalidade para que cada usuário monte seu próprio catálogo de jogos a partir de uma lista mestra.

Enunciado Original do Projeto 9: Catálogo de Jogos (Video Game Catalog API)
Conforme sorteio feito em sala de aula, o projeto 9 ficou a cargo da equipe Amantes de Kwid:

Carlos Eduardo Corleto Kolody

Gabriel Augusto do Vale

João Victor Ferrari da Silva

Descrição: Uma API para um catálogo de jogos de videogame, incluindo informações sobre plataforma e ano de lançamento.

Recurso Principal: Jogo (com propriedades como id, titulo, plataforma, ano_lancamento, desenvolvedor).

Arquitetura de Microsserviços
O projeto é dividido em três serviços independentes, cada um com sua própria responsabilidade, executando em portas diferentes para garantir o desacoplamento.

Serviço de Games (Porta 3001): Responsável por gerenciar o catálogo mestre de todos os jogos disponíveis na plataforma.

Serviço de Usuários (Porta 3002): Responsável por todo o ciclo de vida dos usuários, como cadastro, consulta e remoção.

Serviço de Catálogo (Porta 3003): Serviço relacional que gerencia os catálogos pessoais, conectando usuários aos jogos que eles possuem.

Endpoints da API
A seguir estão os principais endpoints divididos por microsserviço.

Serviço de Games (Rodando na porta 3001)
GET /api/games: Lista todos os jogos do catálogo mestre.

GET /api/games/:id: Busca um jogo específico pelo seu ID.

POST /api/games: (A ser implementado) Adiciona um novo jogo ao catálogo mestre.

PUT /api/games/:id: (A ser implementado) Atualiza um jogo.

DELETE /api/games/:id: (A ser implementado) Remove um jogo.

Serviço de Usuários (Rodando na porta 3002)
POST /api/users: Cria um novo usuário.

GET /api/users: Lista todos os usuários cadastrados.

GET /api/users/:id: Busca um usuário específico pelo seu ID.

PUT /api/users/:id: Atualiza os dados de um usuário.

DELETE /api/users/:id: Remove um usuário.

Serviço de Catálogo (Rodando na porta 3003)
POST /api/users/:userId/catalog: Adiciona um jogo (pelo gameId no corpo da requisição) ao catálogo de um usuário específico.

GET /api/users/:userId/catalog: Exibe o catálogo de jogos de um usuário.

DELETE /api/users/:userId/catalog/:gameId: Remove um jogo específico do catálogo de um usuário.

Tecnologias Utilizadas
Linguagem: JavaScript

Ambiente de Execução: Node.js

Framework: Express.js

Arquitetura: Microsserviços

Banco de Dados: Banco de dados em memória (simulado com Arrays JS para fins de desenvolvimento)

Instalação e Execução
Para executar este projeto, você precisará iniciar cada microsserviço de forma independente.

Pré-requisitos:

Node.js (versão 14 ou superior)

Git

Passo a passo:

Clone o repositório:

git clone [https://github.com/seu-usuario/API-GAME-WORKSHOP.git](https://github.com/Carlos-Kolody/Api-Games-Workshop)

Acesse o diretório do projeto:

cd API-GAME-WORKSHOP

Instale as dependências e execute cada serviço:

Será necessário abrir 3 terminais diferentes, um para cada serviço.

Terminal 1 - Serviço de Games:

cd servico-games
npm install
node src/app.js 
# Servidor de Games iniciado na porta 3001

Terminal 2 - Serviço de Usuários:

cd servico-usuarios
npm install
node src/app.js
# Servidor de Usuários iniciado na porta 3002

Terminal 3 - Serviço de Catálogo:

cd servico-catalogo
npm install
node src/app.js
# Servidor de Catálogo iniciado na porta 3003

Ao final, você terá os três serviços rodando simultaneamente em seu ambiente local.

Como Usar a API
Você pode interagir com os microsserviços utilizando ferramentas como Postman, Insomnia ou curl. Lembre-se de apontar para a porta correta de cada serviço.

Exemplo 1: Criar um novo usuário

curl -X POST http://localhost:3002/api/users \
-H "Content-Type: application/json" \
-d '{ "nome": "Joao", "email": "joao@email.com" }'

Exemplo 2: Adicionar o jogo de ID 3 ao catálogo do usuário de ID 1

curl -X POST http://localhost:3003/api/users/1/catalog \
-H "Content-Type: application/json" \
-d '{ "gameId": 3 }'

Exemplo 3: Visualizar o catálogo do usuário de ID 1

curl -X GET http://localhost:3003/api/users/1/catalog
