const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota principal - página web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para download da APK
app.get('/download/app.apk', (req, res) => {
  const apkPath = path.join(__dirname, 'apk', 'app.apk');
  
  // Verifica se o arquivo existe
  if (fs.existsSync(apkPath)) {
    res.download(apkPath, 'LembraPet.apk', (err) => {
      if (err) {
        console.error('Erro ao fazer download:', err);
        res.status(500).send('Erro ao baixar o arquivo');
      }
    });
  } else {
    res.status(404).send('APK não encontrado');
  }
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});