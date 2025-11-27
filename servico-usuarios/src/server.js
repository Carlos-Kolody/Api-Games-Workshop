const app = require('./app');

// Define a porta (3002 é a porta que definimos para usuários no README)
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Servidor de Usuários rodando em http://localhost:${PORT}`);
});