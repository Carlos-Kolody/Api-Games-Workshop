const express = require('express')
const router = express.Router()
const catalogController = require('../controllers/catalogController')
const verifyToken = require('../middlewares/authMiddleware') // <-- Importa o guardião

// Aplica o middleware em todas as rotas de catálogo!
router.get('/users/:userId/catalog', verifyToken, catalogController.getCatalog)
router.post('/users/:userId/catalog', verifyToken, catalogController.addGameToCatalog)
router.delete('/users/:userId/catalog/:gameId', verifyToken, catalogController.removeGameFromCatalog)

module.exports = router