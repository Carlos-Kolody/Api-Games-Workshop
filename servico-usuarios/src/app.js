const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let games = [
  { id: 1, titulo: 'The Witcher 3: Wild Hunt', genero: 'RPG', classificacao: '16+', anoLancamento: 2015 },
  { id: 2, titulo: 'Stardew Valley', genero: 'Simulação', classificacao: 'Livre', anoLancamento: 2016 },
  { id: 3, titulo: 'Red Dead Redemption 2', genero: 'Ação-Aventura', classificacao: '18+', anoLancamento: 2018 },
]; 
let nextGameId = 4;


let users = [
    { id: 1, nome: 'Alice', email: 'alice@email.com', senha: '123' },
    { id: 2, nome: 'Bob', email: 'bob@email.com', senha: '456' }
];
let nextUserId = 3;


let userCatalogs = [
    { id: 1, usuarioId: 1, gameId: 1 }, 
    { id: 2, usuarioId: 1, gameId: 3 }, 
    { id: 3, usuarioId: 2, gameId: 2 } 
];
let nextCatalogId = 4;

function buscaGame(id) {
  return games.findIndex(game => game.id === Number(id));
};

function buscaUsuario(id) {
  return users.findIndex(user => user.id === Number(id));
};

app.get('/', (req, res) => {
  res.status(200).send('API de Gerenciamento de Games no ar!');
});

app.get('/api/games', (req, res) => res.status(200).json(games));

app.post('/api/users', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Os campos nome, email e senha são obrigatórios." });
    }

    if (users.some(user => user.email === email)) {
        return res.status(409).json({ message: "Este email já está em uso." });
    }

    const novoUsuario = { id: nextUserId++, nome, email, senha };
    users.push(novoUsuario);
    res.status(201).json({ message: "Usuário criado com sucesso", user: novoUsuario });
});

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
    const index = buscaUsuario(req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(users[index]);
});

app.put('/api/users/:id', (req, res) => {
    const index = buscaUsuario(req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }

    users[index].nome = req.body.nome || users[index].nome;
    users[index].email = req.body.email || users[index].email;
    users[index].senha = req.body.senha || users[index].senha;

    res.status(200).json({ message: "Usuário atualizado com sucesso", user: users[index] });
});

app.delete('/api/users/:id', (req, res) => {
    const index = buscaUsuario(req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    users.splice(index, 1);
    res.status(200).send("Usuário removido com sucesso.");
});