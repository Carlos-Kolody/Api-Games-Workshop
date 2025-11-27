const express = require("express");
const app = express();
const PORT = 3000;
app.post("/api/users/:userId/catalog", (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  if (buscaUsuario(userId) === -1) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  if (buscaGame(gameId) === -1) {
    return res.status(404).json({ message: "Game não encontrado." });
  }
  const jaPossui = userCatalogs.some(
    (item) =>
      item.usuarioId === Number(userId) && item.gameId === Number(gameId)
  );
  if (jaPossui) {
    return res
      .status(409)
      .json({ message: "Este game já está no catálogo do usuário." });
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

app.get("/api/users/:userId/catalog", (req, res) => {
  const { userId } = req.params;

  if (buscaUsuario(userId) === -1) {
    return res.status(404).json({ message: "Usuário não encontrado." });
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

app.delete("/api/users/:userId/catalog/:gameId", (req, res) => {
  const { userId, gameId } = req.params;

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
