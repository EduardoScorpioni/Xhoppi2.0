# Xhoppi2.0

Projeto acadêmico desenvolvido com Node.js, Express, EJS e MongoDB.

## Integrantes

- Eduardo Viccino Scorpioni
- Igor Marques da Silva

## O que foi preservado

O HTML, o CSS, as fontes e as imagens seguem o projeto original de `xhopii.zip`. As páginas foram renomeadas para `.ejs` para receber os dados consultados no MongoDB. As mudanças nos links servem somente para ligar os formulários e o menu às rotas existentes.

## Preparação

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` a partir de `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/xhoppi
```

3. Inicie o MongoDB.

4. Importe os dados de exemplo dos arquivos JSON para o banco:

```bash
npm run seed
```

5. Inicie o projeto:

```bash
npm start
```

6. Abra `http://localhost:3000`.

O comando `npm run seed` pode ser executado novamente. Ele usa `upsert`, então não duplica usuários com o mesmo email nem produtos com o mesmo código.

## MongoDB neste computador

Este computador usa Windows 10 22H2 e está com o MongoDB Community Server 6.0.29 instalado. O serviço `MongoDB` inicia automaticamente com o Windows e atende localmente em `127.0.0.1:27017`.

O MongoDB 6.0 foi escolhido porque o MongoDB 8.3 não executa neste sistema. A versão 6.0 já encerrou seu período oficial de suporte e deve ser usada somente para este projeto acadêmico local. Para um projeto publicado, use uma versão mantida em um sistema operacional compatível ou o MongoDB Atlas.

## Estrutura MVC

```text
config/         conexão com o MongoDB
controllers/    regras das páginas, consultas e cadastros
models/         schemas do Mongoose
routes/         endereços GET e POST
views/          páginas EJS e partials reutilizáveis
middlewares/    configuração do Express e tratamento de erros
assets/         CSS, fontes e imagens originais
data/           dados de exemplo usados somente pelo seed
scripts/        importação inicial dos dados
server.js       inicialização da aplicação
```

O caminho de uma requisição é:

```text
Navegador -> rota -> controller -> model -> MongoDB
                                 -> view EJS -> HTML
```

## Rotas

| Método | Rota | Função |
| --- | --- | --- |
| GET | `/` | Exibe a home com produtos do MongoDB |
| GET/POST | `/login` | Exibe e processa o login |
| GET/POST | `/recuperar-senha` | Exibe e processa a recuperação |
| GET | `/clientes/cadastrar` | Exibe o cadastro de cliente |
| GET/POST | `/clientes` | Lista ou cadastra clientes |
| GET | `/clientes/dados` | Retorna clientes em JSON |
| GET | `/funcionarios/cadastrar` | Exibe o cadastro de funcionário |
| GET/POST | `/funcionarios` | Lista ou cadastra funcionários |
| GET | `/funcionarios/dados` | Retorna funcionários em JSON |
| GET | `/produtos/cadastrar` | Exibe o cadastro de produto |
| GET/POST | `/produtos` | Lista ou cadastra produtos |
| GET | `/produtos/dados` | Retorna produtos em JSON |
| GET | `/produtos/:id` | Exibe um produto pelo código |

## Como o EJS funciona aqui

- `<%= valor %>` mostra um valor escapado no HTML.
- `<% codigo %>` executa JavaScript sem imprimir.
- `<%- include(...) %>` inclui um partial.
- `res.render('home', { produtos })` abre `views/home.ejs` e envia a variável `produtos`.

Os arquivos `views/partials/head.ejs`, `header.ejs` e `footer.ejs` evitam repetir as partes comuns. Quando o EJS termina de renderizar, o navegador recebe HTML normal.

## Como o MongoDB funciona aqui

- `config/database.js` abre a conexão.
- Os schemas em `models/` descrevem usuários e produtos.
- Os controllers usam `find`, `findOne`, `exists` e `create`.
- O Mongoose grava os documentos nas coleções `usuarios` e `produtos`.
- Os arquivos em `data/` não são alterados durante o uso do site; eles servem apenas para a primeira importação.

## Limites para testes

- Limite geral: 10.000 requisições a cada 10 minutos por IP.
- Login: 1.000 tentativas a cada 10 minutos por IP.

## Observação acadêmica

As senhas continuam em texto simples para manter o conteúdo no nível atual do trabalho. Em um sistema real, elas precisam ser transformadas com hash e o login precisa usar sessão.
