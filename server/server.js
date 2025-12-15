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

// Adicione estas novas configurações
app.use(express.static(path.join(__dirname, '../client/src/screens/index')));
app.use('/assets', express.static(path.join(__dirname, '../client/src/assets')));
app.use('/padrinhos', express.static(path.join(__dirname, '../client/src/screens/padrinhos')));
app.use('/lista-presentes', express.static(path.join(__dirname, '../client/src/screens/lista-presentes')));


// Configurar rota específica para as imagens
const assetsPath = path.join(__dirname, '../client/src/assets');
console.log('Pasta de assets:', assetsPath);
app.use('/assets', express.static(assetsPath));

// Middleware para logar requisições de imagens
app.use((req, res, next) => {
    if (req.url.includes('/assets/images')) {
        console.log('Requisição de imagem:', req.url);
        console.log('Caminho completo:', path.join(assetsPath, req.url.replace('/assets', '')));
    }
    next();
});

// Rota catch-all para o frontend (deve ser a última)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/screens/index/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
