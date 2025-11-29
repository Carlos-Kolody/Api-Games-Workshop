const express = require('express');
const router = express.Router();
// Importa o controller (Verifica se o caminho '../controllers/catalogController' está correto)
const catalogController = require('../controllers/catalogController'); 
const verifyToken = require('../middlewares/authMiddleware');

// Rotas de Games (Públicas)
router.get('/games', catalogController.listGames);

// Rotas de Catálogo (Protegidas)
// O erro "undefined" acontecia porque 'catalogController.getCatalog' (ou outro) não existia no export
router.get('/users/:userId/catalog', verifyToken, catalogController.getCatalog);
router.post('/users/:userId/catalog', verifyToken, catalogController.addGameToCatalog);
router.delete('/users/:userId/catalog/:gameId', verifyToken, catalogController.removeGameFromCatalog);

module.exports = router;