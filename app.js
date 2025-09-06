const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let games = [
  { id: 1, titulo: 'The Witcher 3: Wild Hunt', genero: 'RPG', classificacao: '16+', anoLancamento: 2015 },
  { id: 2, titulo: 'Stardew Valley', genero: 'Simulação', classificacao: 'Livre', anoLancamento: 2016 },
  { id: 3, titulo: 'Red Dead Redemption 2', genero: 'Ação-Aventura', classificacao: '18+', anoLancamento: 2018 },
]; 

let nextId = 4;

app.get('/', (req, res) => {
  res.send('API de Gerenciamento de Games no ar!');
});

app.get('/sobre', (req, res) => {
  res.send("Este é um projeto de API para gerenciar uma coleção de games.");
});


app.get('/api/games', (req, res) => {
  res.json(games);
});

app.post('/api/games', (req, res) => {

  const { titulo, genero, classificacao, anoLancamento } = req.body;

  if (!titulo || !genero || !classificacao || anoLancamento === undefined) {
    return res.status(400).json({ message: 'Os campos titulo, genero, classificacao e anoLancamento são obrigatórios.' });
  }

  const novoGame = { 
    id: nextId++, 
    titulo, 
    genero, 
    classificacao, 
    anoLancamento 
  };
    
  games.push(novoGame);
 
  res.status(201).json(novoGame);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Para parar o servidor, pressione Ctrl + C no terminal`);
});