require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar:', err));

// Rotas da API (devem vir ANTES das rotas estáticas)
app.use('/api', require('./routes/api'));

// --- CONFIGURAÇÃO CORRIGIDA DOS ARQUIVOS ---

// 1. Define a pasta 'screens' como a raiz do site
// Isso faz com que 'index.html', 'dresscode.html', etc. fiquem acessíveis
app.use(express.static(path.join(__dirname, '../client/src/screens')));

// 2. Configura a rota para as imagens (Assets)
const assetsPath = path.join(__dirname, '../client/src/assets');
app.use('/assets', express.static(assetsPath));

// Middleware para logar requisições de imagens (útil para ver se está carregando)
app.use((req, res, next) => {
    if (req.url.includes('/assets/images')) {
        console.log('Tentando carregar imagem:', req.url);
    }
    next();
});

// 3. Rota catch-all (Onde estava o erro ENOENT)
// Se o usuário entrar e não especificar arquivo, manda o index.html que agora está na raiz de screens
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/screens/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});