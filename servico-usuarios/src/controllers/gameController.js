// DADOS EM MEMÓRIA
// (Num cenário ideal, isto viria do microsserviço 'servico-games' ou de uma tabela 'games')
const games = [
    { id: 1, titulo: "The Witcher 3: Wild Hunt", genero: "RPG", classificacao: "16+", anoLancamento: 2015 },
    { id: 2, titulo: "Stardew Valley", genero: "Simulação", classificacao: "Livre", anoLancamento: 2016 },
    { id: 3, titulo: "Red Dead Redemption 2", genero: "Ação-Aventura", classificacao: "18+", anoLancamento: 2018 },
];

// Função para listar todos os jogos
exports.listGames = (req, res) => {
    res.status(200).json(games);
};

// Função para buscar um jogo específico (Opcional, mas útil)
exports.getGameById = (req, res) => {
    const { id } = req.params;
    const game = games.find(g => g.id === Number(id));

    if (!game) {
        return res.status(404).json({ message: "Game não encontrado." });
    }

    res.status(200).json(game);
};