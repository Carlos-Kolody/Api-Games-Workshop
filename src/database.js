const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // O arquivo será criado na raiz
  logging: false
})

module.exports = sequelize