## Plataforma de Rastreamento de Veículos - Back-end

Este projeto é a parte de back-end de uma plataforma de rastreamento de veículos, desenvolvida utilizando Node.js, Express e Sequelize. Ele fornece uma API para autenticação, cadastro e gerenciamento de veículos, e registro de localizações em tempo real.
Tecnologias Utilizadas
- Node.js
- Express
- Sequelize (com PostgreSQL)
- JWT para autenticação
- Socket.io para comunicação em tempo real
- Yup para validação de dados
- Axios para requisições HTTP
- Nominatim (OpenStreetMap) para geocodificação

## Funcionalidades
- Autenticação de Usuário (Login/Logout)
- Cadastro e Gerenciamento de Usuários
- Cadastro e Gerenciamento de Veículos
- Registro e Atualização de Localizações de Veículos
- Comunicação em Tempo Real via WebSockets

## Como Executar o Projeto
1) Clone o Repositório:
- git clone
- cd Repositorio back-end
  2) Instale as Dependências:
     - npm install
3) Configure as Variáveis de Ambiente:
  - Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente
4) Inicie o Servidor:
     - npm start
5) Acesse a API:http://localhost:3001
  
