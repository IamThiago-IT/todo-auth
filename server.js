const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);

server.use('/api', router); // Use '/api' como prefixo para todas as rotas

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server está executando na porta ${port}`);
});
