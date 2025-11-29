const app = require('./app');


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Servidor de Usuários rodando em http://localhost:${PORT}`);
});