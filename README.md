# Listas de Tarefas com Auth

## objetivo

O aplicativo permite que os usuários autenticados criem várias listas de tarefas com títulos personalizados. Cada lista pode conter várias tarefas, que podem ser adicionadas, editadas e marcadas como concluídas. Além disso, os usuários podem criar, editar e excluir suas listas.

## Funcionalidades

- Autenticação de usuários usando json-server-auth.
- Criação, edição e exclusão de listas de tarefas.
- Adição, edição e marcação de tarefas como concluídas.

## Pré-requisitos

- Node.js (versão >= 12)
- Expo CLI (instalado globalmente)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/IamThiago-IT/todo-auth.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd todo-list-app
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Executando o aplicativo

1. Inicie o servidor JSON:

   ```bash
   json-server db.json -m ./node_modules/json-server-auth
   ```

2. Inicie o aplicativo Expo:

   ```bash
   npm start
   ```

3. Use um emulador iOS/Android ou o aplicativo Expo Go para visualizar o aplicativo em execução.

## Estrutura de arquivos

- `api/api.js`: configuração da API para se comunicar com o servidor JSON.
- `screens/AuthScreen.js`: tela de autenticação do usuário.
- `screens/TodoListScreen.js`: tela principal com a lista de tarefas.
- `App.js`: arquivo principal que configura as rotas e a navegação.
- `db.json`: arquivo JSON usado como banco de dados simulado.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou correções, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
