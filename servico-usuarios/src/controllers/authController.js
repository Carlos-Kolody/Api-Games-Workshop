const User = require('../models/User'); // Importa o Modelo do Banco
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // 1. Validação básica
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
        }

        // 2. Verifica se o usuário já existe no SQLite
        const usuarioExistente = await User.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ message: "Este email já está em uso." });
        }

        // 3. Cria o usuário no Banco
        // (A senha será criptografada automaticamente pelo Hook no Model User.js)
        const user = await User.create({ nome, email, senha });

        // 4. Retorna sucesso (sem mandar a senha de volta)
        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Erro no Register:", error); // Mostra o erro no terminal
        return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Busca o usuário no Banco pelo email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Compara a senha enviada com a senha criptografada do banco
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Gera o Token JWT
        const token = jwt.sign(
            { id: user.id, nome: user.nome }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        // 4. Retorna o token
        return res.status(200).json({ message: "Login bem-sucedido!", token });

    } catch (error) {
        console.error("Erro no Login:", error); // Mostra o erro no terminal
        return res.status(500).json({ error: 'Erro interno ao fazer login.' });
    }
};