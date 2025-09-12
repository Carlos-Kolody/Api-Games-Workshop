const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let jogos = [
  { id: 1, titulo: 'The Legend of Zelda: Breath of the Wild', plataforma: 'Nintendo Switch', ano_lancamento: 2017, desenvolvedor: 'Nintendo' },
  { id: 2, titulo: 'Red Dead Redemption 2', plataforma: 'PlayStation 4', ano_lancamento: 2018, desenvolvedor: 'Rockstar Games' },
  { id: 3, titulo: 'Cyberpunk 2077', plataforma: 'PC', ano_lancamento: 2020, desenvolvedor: 'CD Projekt Red' }
];
let nextId = 4; 

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Jogos!');
});


app.get('/api/jogos', (req, res) => {
  res.json(jogos);
});

app.get('/api/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = jogos.find(j => j.id === id);

  if (jogo) {
    res.json(jogo);
  } else {
    res.status(404).json({ message: 'Jogo não encontrado.' });
  }
});

app.post('/api/jogos', (req, res) => {
 
  const { titulo, plataforma, ano_lancamento, desenvolvedor } = req.body;

  if (!titulo || !plataforma || !ano_lancamento || !desenvolvedor) {
    return res.status(400).json({ message: 'Todos os campos (titulo, plataforma, ano_lancamento, desenvolvedor) são obrigatórios.' });
  }

  const novoJogo = {
    id: nextId++,
    titulo,
    plataforma,
    ano_lancamento,
    desenvolvedor
  };

  jogos.push(novoJogo);
  res.status(201).json(novoJogo); 
});

app.put('/api/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jogoIndex = jogos.findIndex(j => j.id === id);

  if (jogoIndex !== -1) {
    const { titulo, plataforma, ano_lancamento, desenvolvedor } = req.body;

    if (!titulo && !plataforma && !ano_lancamento && !desenvolvedor) {
      return res.status(400).json({ message: 'Pelo menos um campo deve ser fornecido para atualização.' });
    }

    const jogoAtualizado = {
      ...jogos[jogoIndex], 
      titulo: titulo || jogos[jogoIndex].titulo, 
      plataforma: plataforma || jogos[jogoIndex].plataforma,
      ano_lancamento: ano_lancamento || jogos[jogoIndex].ano_lancamento,
      desenvolvedor: desenvolvedor || jogos[jogoIndex].desenvolvedor
    };

    jogos[jogoIndex] = jogoAtualizado;
    res.json(jogoAtualizado);
  } else {
    res.status(404).json({ message: 'Jogo não encontrado para atualização.' });
  }
});


app.delete('/api/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tamanhoInicial = jogos.length;

  jogos = jogos.filter(j => j.id !== id);

  if (jogos.length < tamanhoInicial) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Jogo não encontrado para exclusão.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Para parar o servidor, pressione Ctrl+C no terminal.');
});