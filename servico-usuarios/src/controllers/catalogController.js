// DADOS EM MEMÓRIA (Simulação para não quebrar a lógica antiga)
const games = [
    { id: 1, titulo: "The Witcher 3: Wild Hunt", genero: "RPG", classificacao: "16+", anoLancamento: 2015 },
    { id: 2, titulo: "Stardew Valley", genero: "Simulação", classificacao: "Livre", anoLancamento: 2016 },
    { id: 3, titulo: "Red Dead Redemption 2", genero: "Ação-Aventura", classificacao: "18+", anoLancamento: 2018 },
];

let userCatalogs = [];
let nextCatalogId = 1;

// Exportação das funções (Nota os nomes exatos!)
exports.listGames = (req, res) => {
    res.status(200).json(games);
};

exports.getCatalog = (req, res) => {
    const { userId } = req.params;

    if (req.usuario.id !== Number(userId)) {
        return res.status(403).json({ message: "Proibido. Você só pode visualizar seu próprio catálogo." });
    }

    const catalogoDoUsuario = userCatalogs.filter(item => item.usuarioId === Number(userId));
    const catalogoDetalhado = catalogoDoUsuario.map(item => {
        return games.find(game => game.id === item.gameId);
    });

    res.status(200).json(catalogoDetalhado);
};

exports.addGameToCatalog = (req, res) => { // Atenção a este nome
    const { userId } = req.params;
    const { gameId } = req.body;

    if (req.usuario.id !== Number(userId)) {
        return res.status(403).json({ message: "Proibido. Você só pode adicionar jogos ao seu próprio catálogo." });
    }

    const novaEntrada = {
        id: nextCatalogId++,
        usuarioId: Number(userId),
        gameId: Number(gameId),
    };
    userCatalogs.push(novaEntrada);
    res.status(201).json({ message: "Game adicionado ao catálogo com sucesso!", entrada: novaEntrada });
};

exports.removeGameFromCatalog = (req, res) => { // Atenção a este nome
    const { userId, gameId } = req.params;

    if (req.usuario.id !== Number(userId)) {
        return res.status(403).json({ message: "Proibido. Você só pode remover jogos do seu próprio catálogo." });
    }

    const index = userCatalogs.findIndex(
        (item) => item.usuarioId === Number(userId) && item.gameId === Number(gameId)
    );
    if (index === -1) {
        return res.status(404).json({ message: "Game não encontrado no catálogo deste usuário." });
    }

    userCatalogs.splice(index, 1);
    res.status(200).send("Game removido do catálogo com sucesso.");
};