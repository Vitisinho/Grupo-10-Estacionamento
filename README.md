# Grupo-10-Estacionamento
Projeto Final — Integração de Sistemas de Software — Estacionamento

N

1. Inicializar o projeto

Bash
npm init -y
Isso vai fazer o Node criar aquele arquivo package.json padrão, mas "zerado" (sem as bibliotecas e sem os nossos atalhos).

2. Instalar as dependências principais

Bash
npm install express axios

3. Instalar as dependências de desenvolvimento

Bash
npm install --save-dev jest supertest nodemon

4. A troca manual (O detalhe importante)

Por padrão, o Node cria o script de teste assim:

JSON
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}

Ele terá que apagar essa linha e trocar exatamente por isso aqui:

JSON
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest"
}

Rodar o projeto e teste:

npm run dev
npm test
