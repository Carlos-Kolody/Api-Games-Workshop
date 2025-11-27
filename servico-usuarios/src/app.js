npmrequire("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use(express.json());

let games = [
  {
    id: 1,
    titulo: "The Witcher 3: Wild Hunt",
    genero: "RPG",
    classificacao: "16+",
    anoLancamento: 2015,
  },
  {
    id: 2,
    titulo: "Stardew Valley",
    genero: "Simulação",
    classificacao: "Livre",
    anoLancamento: 2016,
  },
  {
    id: 3,
    titulo: "Red Dead Redemption 2",
    genero: "Ação-Aventura",
    classificacao: "18+",
    anoLancamento: 2018,
  },
];
let nextGameId = 4;

let users = [];
let nextUserId = 1;

let userCatalogs = [];
let nextCatalogId = 1;

function buscaUsuarioPorId(id) {
  return users.findIndex((user) => user.id === Number(id));
}

app.get("/", (req, res) => {
  res.status(200).send("API de Gerenciamento de Games no ar!");
});

app.get("/api/games", (req, res) => res.status(200).json(games));

app.post("/api/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }
    if (users.some((user) => user.email === email)) {
      return res.status(409).json({ message: "Este email já está em uso." });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = { id: nextUserId++, nome, email, senha: senhaHash };
    users.push(novoUsuario);

    const usuarioParaRetorno = {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    };
    res
      .status(201)
      .json({
        message: "Usuário criado com sucesso",
        user: usuarioParaRetorno,
      });
  } catch (error) {
    res.status(500).send("Erro no servidor ao registrar usuário.");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = users.find((user) => user.email === email);
    if (!usuario) {
      return res.status(400).json({ message: "Email ou senha inválidos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: "Email ou senha inválidos." });
    }

    const payload = { id: usuario.id, nome: usuario.nome };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login bem-sucedido!", token: token });
  } catch (error) {
    res.status(500).send("Erro no servidor ao fazer login.");
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Token inválido." });
  }
};

app.get("/api/users/:userId/catalog", verifyToken, (req, res) => {
  const { userId } = req.params;

  if (req.usuario.id !== Number(userId)) {
    return res
      .status(403)
      .json({
        message: "Proibido. Você só pode visualizar seu próprio catálogo.",
      });
  }

  const catalogoDoUsuario = userCatalogs.filter(
    (item) => item.usuarioId === Number(userId)
  );
  const catalogoDetalhado = catalogoDoUsuario.map((item) => {
    const gameInfo = games.find((game) => game.id === item.gameId);
    return gameInfo;
  });

  res.status(200).json(catalogoDetalhado);
});

app.post("/api/users/:userId/catalog", verifyToken, (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  if (req.usuario.id !== Number(userId)) {
    return res
      .status(403)
      .json({
        message:
          "Proibido. Você só pode adicionar jogos ao seu próprio catálogo.",
      });
  }

  const novaEntrada = {
    id: nextCatalogId++,
    usuarioId: Number(userId),
    gameId: Number(gameId),
  };
  userCatalogs.push(novaEntrada);
  res
    .status(201)
    .json({
      message: "Game adicionado ao catálogo com sucesso!",
      entrada: novaEntrada,
    });
});

app.delete("/api/users/:userId/catalog/:gameId", verifyToken, (req, res) => {
  const { userId, gameId } = req.params;

  if (req.usuario.id !== Number(userId)) {
    return res
      .status(403)
      .json({
        message:
          "Proibido. Você só pode remover jogos do seu próprio catálogo.",
      });
  }

  const index = userCatalogs.findIndex(
    (item) =>
      item.usuarioId === Number(userId) && item.gameId === Number(gameId)
  );
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "Game não encontrado no catálogo deste usuário." });
  }

  userCatalogs.splice(index, 1);
  res.status(200).send("Game removido do catálogo com sucesso.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
