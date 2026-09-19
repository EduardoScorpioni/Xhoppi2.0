import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import __dirname from './utils/pathUtils.js';
import {
  staticMiddleware,
  urlencodedMiddleware,
  jsonMiddleware,
  securityMiddleware,
  compressionMiddleware,
  rateLimitMiddleware,
  loginRateLimitMiddleware,
  morganMiddleware
} from './middlewares/middlewares.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const usuarios = [
  {
    email: 'admin@xhopii.com',
    senha: '123456'
  },
  {
    email: 'cliente@xhopii.com',
    senha: '123456'
  }
];

app.use(staticMiddleware);
app.use(urlencodedMiddleware);
app.use(jsonMiddleware);
app.use(securityMiddleware);
app.use(compressionMiddleware);
app.use(rateLimitMiddleware);
app.use(morganMiddleware);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', loginRateLimitMiddleware, (req, res) => {
  const email = req.body.inputEmailLog || req.body.email || req.body.login;
  const senha = req.body.inputSenhaLog || req.body.senha;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.email === email && usuario.senha === senha;
  });

  if (usuarioEncontrado) {
    return res.redirect('/');
  }

  return res.status(401).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="/css/style.css">
      <link rel="icon" href="/img/logo.png" type="image/png">
      <title>Xhopii - Login invalido</title>
    </head>
    <body>
      <section class="conteudo-login">
        <section class="conteudo-login-info">
          <h1>Dados invalidos</h1>
          <p>Email/login ou senha informados estao incorretos.</p>
          <p><a href="/login">Voltar para o login</a></p>
        </section>
      </section>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Servidor ativo rodando na porta ${port}`);
});
