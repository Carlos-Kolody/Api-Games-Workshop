const { DataTypes } = require('sequelize')
const sequelize = require('../database')
const bcrypt = require('bcryptjs')

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.senha) {
        user.senha = await bcrypt.hash(user.senha, 10)
      }
    }
  }
})

module.exports = User