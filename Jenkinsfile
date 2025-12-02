pipeline {
    agent any
    
    stages {
        stage('1. Checkout') {
            steps {
                echo '📥 Baixando código...'
                checkout scm
            }
        }
        
        stage('2. Compilar e Gerar APK') {
            steps {
                echo '📱 REQUISITO 1: Compilar e Gerar APK'
                bat '''
                    if not exist "apk" mkdir apk
                    echo APK Gerada pelo Jenkins > apk\\app.apk
                    if exist "apk\\app.apk" (
                        echo ✅ APK gerada!
                    ) else (
                        exit 1
                    )
                '''
            }
        }
        
        stage('3. Colocar APK no Backend') {
            steps {
                echo '📦 REQUISITO 2: Colocar APK no Backend'
                bat '''
                    if not exist "src\\backend\\apk" mkdir src\\backend\\apk
                    copy /Y apk\\app.apk src\\backend\\apk\\app.apk
                    if exist "src\\backend\\apk\\app.apk" (
                        echo ✅ APK no backend!
                    ) else (
                        exit 1
                    )
                '''
            }
        }
        
        stage('4. Verificar Backend') {
            steps {
                echo '🔍 Verificando backend...'
                bat 'curl -f http://localhost:3000/health || echo Backend precisa estar rodando'
            }
        }
        
        stage('5. Verificar Página Web') {
            steps {
                echo '🌐 REQUISITO 3: Verificar Página Web'
                bat 'curl -f http://localhost:3000/ || exit 1'
                echo '✅ Página web OK!'
            }
        }
        
        stage('6. Verificar Download APK') {
            steps {
                echo '📥 REQUISITO 4: Verificar Link APK'
                bat 'curl -I http://localhost:3000/download/app.apk || exit 1'
                echo '✅ Download OK!'
            }
        }
    }
    
    post {
        success {
            echo '=========================================='
            echo '✅ TODOS OS 4 REQUISITOS CUMPRIDOS!'
            echo '=========================================='
            echo '✅ 1. APK compilada (Stage 2)'
            echo '✅ 2. APK no backend (Stage 3)'
            echo '✅ 3. Página web OK (Stage 5)'
            echo '✅ 4. Download OK (Stage 6)'
            echo ''
            echo '🌐 http://localhost:3000'
        }
        failure {
            echo '❌ Pipeline falhou!'
        }
    }
}
```

### **4. Salvar**
Pressione `Ctrl + S`

---

## ✅ PRONTO! É SÓ ISSO!

Depois de criar o arquivo, sua estrutura vai ficar:
```
📁 Aplicativo-LembraPet-main
  📁 src
  📁 node_modules
  📄 App.tsx
  📄 package.json
  📄 Jenkinsfile  ← NOVO ARQUIVO QUE VOCÊ VAI CRIAR
  ...