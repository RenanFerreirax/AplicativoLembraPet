#!/bin/bash

echo "🚀 Iniciando build da APK do Lembra Pet..."

# Navega para o diretório do app
cd Aplicativo-LembraPet-main || exit 1

# Instala dependências
echo "📦 Instalando dependências..."
npm install

# Método 1: Build com Expo (mais simples)
echo "📱 Gerando build com Expo..."

# Instala Expo CLI globalmente
npm install -g expo-cli

# Exporta o projeto
npx expo export --platform android

# Método 2: Build nativo (se você tiver Android SDK instalado)
# Descomente as linhas abaixo se quiser usar build nativo

# echo "🔧 Gerando APK com Gradle..."
# cd android
# chmod +x gradlew
# ./gradlew assembleRelease
# cd ..

# Cria diretório para APK
mkdir -p ../apk

# Método 1: Copia do Expo export
# cp -r dist ../apk/

# Método 2: Copia APK do Gradle
# if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
#     cp android/app/build/outputs/apk/release/app-release.apk ../apk/app.apk
#     echo "✅ APK gerada com sucesso!"
#     ls -lh ../apk/app.apk
# else
#     echo "❌ Erro ao gerar APK"
#     exit 1
# fi

echo "✅ Build finalizado!"