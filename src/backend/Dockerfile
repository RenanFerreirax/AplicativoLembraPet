FROM node:18-alpine

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install --production

# Copia arquivos do servidor
COPY server.js ./
COPY public ./public

# Cria diretório para APK
RUN mkdir -p apk

# Expõe a porta
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]