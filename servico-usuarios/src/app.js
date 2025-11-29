require('dotenv').config();
const express = require('express');
const sequelize = require('./database');

const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');

const app = express();

app.use(express.json());

app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api', authRoutes);
app.use('/api', catalogRoutes);

(async () => {
    try {
        await sequelize.sync();
        console.log('Base de dados sincronizada (via app.js).');
    } catch (error) {
        console.error('Erro ao sincronizar base de dados:', error);
    }
})();

module.exports = app;