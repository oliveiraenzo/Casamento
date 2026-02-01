require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONEXÃO MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

// --- ROTAS DA API ---
try {
    app.use('/api', require('./routes/api'));
} catch (error) {
    console.warn('⚠️ Aviso: Arquivo de rotas ./routes/api não encontrado ou com erro.');
}

// --- CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS (FRONTEND) ---

// 1. Define a pasta 'client/public' como a raiz do site
// Isso fará o servidor achar index.html, dresscode.css, etc.
app.use(express.static(path.join(__dirname, '../client/public')));

// 2. Rota específica para Assets
// Como sua pasta 'assets' está dentro de 'public', isso garante o acesso correto
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

// 3. Rota "Catch-All"
// Qualquer rota que não for API manda o index.html da pasta public
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// --- INICIALIZAÇÃO ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});