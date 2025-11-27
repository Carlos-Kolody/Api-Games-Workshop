require('dotenv').config()
const express = require('express')
const sequelize = require('../database') // Importa conexão
const authRoutes = require('./routes/authRoutes') // Importa rotas

const app = express()
app.use(express.json())

// Rotas
app.use('/api', authRoutes)

// Sincroniza o banco e inicia o servidor
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.')
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'))
})