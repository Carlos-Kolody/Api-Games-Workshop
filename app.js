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

/**
 * Função para encontrar o índice de um game no array pelo seu ID.
 * @param {string | number} id - O ID do game a ser buscado.
 * @returns {number} 
 */
function buscaGame(id) {
  return games.findIndex(game => {
    return game.id === Number(id);
  });
};


app.get('/', (req, res) => {
  res.status(200).send('API de Gerenciamento de Games no ar!');
});

app.get('/sobre', (req, res) => {
  res.status(200).send("Este é um projeto de API para gerenciar uma coleção de games.");
});


app.get('/api/games', (req, res) => {
  res.status(200).json(games);
});

app.get('/api/games/:id', (req, res) => {
  const index = buscaGame(req.params.id);
  
  if (index === -1) {
    return res.status(404).send("Game não encontrado.");
  }

  res.status(200).json(games[index]);
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
 
  res.status(201).json({ message: "Game adicionado com sucesso", game: novoGame });
});

app.put("/api/games/:id", (req, res) => {
    const index = buscaGame(req.params.id);

    if (index === -1) {
      return res.status(404).send("Game não encontrado para atualização.");
    }
    
    games[index].titulo = req.body.titulo;
    games[index].genero = req.body.genero;
    games[index].classificacao = req.body.classificacao;
    games[index].anoLancamento = req.body.anoLancamento;
    
    res.status(200).json({ message: "Game atualizado com sucesso", game: games[index]});
});

app.delete("/api/games/:id", (req, res) => {
    const index = buscaGame(req.params.id);

    if (index === -1) {
      return res.status(404).send("Game não encontrado para remoção.");
    }
    
    games.splice(index, 1);
    
    res.status(200).send("Game removido com sucesso");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Para parar o servidor, pressione Ctrl + C no terminal`);
});
