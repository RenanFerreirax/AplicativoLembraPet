# 🐾 Lembra Pet - Guia de Setup e Deploy

## 📋 Estrutura do Projeto
```
projeto/
├── Aplicativo-LembraPet-main/    # Frontend React Native
│   ├── src/
│   ├── App.tsx
│   └── package.json
├── backend/                        # Backend Node.js
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── public/
│       └── index.html
├── apk/                           # APKs geradas
│   └── app.apk
├── Jenkinsfile
├── docker-compose.yml
└── build-apk.sh
```

## 🚀 Teste Rápido (Sem Jenkins)

### 1. Instalar dependências do backend
```bash
cd backend
npm install
```

### 2. Colocar uma APK de teste
```bash
# Copie qualquer APK para testar
cp ~/Downloads/alguma-app.apk apk/app.apk

# OU crie um arquivo de teste
echo "teste" > apk/app.apk
```

### 3. Iniciar o servidor
```bash
cd backend
npm start
```

### 4. Testar no navegador

Abra: `http://localhost:3000`

## 🐳 Teste com Docker
```bash
# Build da imagem
cd backend
docker build -t lembrapet-backend .

# Executar container
docker run -d \
  --name lembrapet-backend \
  -p 3000:3000 \
  -v $(pwd)/../apk:/app/apk \
  lembrapet-backend

# Verificar
docker ps
curl http://localhost:3000/health
```

## 🔧 Configurar Jenkins

### 1. Criar Job

1. Jenkins → New Item
2. Nome: `LembraPet-Deploy`
3. Tipo: Pipeline
4. OK

### 2. Configurar Pipeline

Em **Pipeline**:
- Definition: Pipeline script from SCM
- SCM: Git
- Repository URL: (seu repositório)
- Script Path: `Jenkinsfile`

### 3. Executar

Clique em "Build Now"

## 🔍 Verificação
```bash
# Testar página
curl http://localhost:3000/

# Testar download
curl -O http://localhost:3000/download/app.apk

# Testar health
curl http://localhost:3000/health
```

## 🐛 Troubleshooting

### Porta 3000 em uso
```bash
# Ver o que está usando a porta
lsof -i :3000

# Matar processo
kill -9 PID
```

### Container não inicia
```bash
# Ver logs
docker logs lembrapet-backend

# Entrar no container
docker exec -it lembrapet-backend sh
```

### APK não encontrada
```bash
# Verificar se existe
ls -lh apk/

# Copiar para o local correto
cp sua-app.apk apk/app.apk
```
```

---

## ✅ CHECKLIST FINAL

Depois de criar todos os arquivos, sua estrutura deve estar assim:
```
📁 seu-projeto/
├── 📁 Aplicativo-LembraPet-main/  ✅ (já existe)
├── 📁 backend/                     ✅ NOVA
│   ├── 📄 server.js               ✅ CRIAR
│   ├── 📄 package.json            ✅ CRIAR
│   ├── 📄 Dockerfile              ✅ CRIAR
│   └── 📁 public/                 ✅ CRIAR
│       └── 📄 index.html          ✅ CRIAR
├── 📁 apk/                        ✅ CRIAR (vazia)
├── 📄 Jenkinsfile                 ✅ CRIAR
├── 📄 docker-compose.yml          ✅ CRIAR
├── 📄 build-apk.sh                ✅ CRIAR
└── 📄 SETUP.md                    ✅ CRIAR