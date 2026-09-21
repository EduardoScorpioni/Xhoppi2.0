# Xhoppi2.0

Projeto acadêmico desenvolvido com Node.js, Express, HTML, CSS e JavaScript.

## Integrantes

- Eduardo Viccino Scorpioni
- Igor Marques da Silva

## Como executar

```bash
npm install
npm start
```

O projeto lê a porta do arquivo `.env`. A configuração padrão é `PORT=3000`.
Abra `http://localhost:3000` no navegador.
O arquivo `.env.example` mostra a configuração necessária para quem clonar o repositório.

## Rotas

| Método | Rota | Função |
| --- | --- | --- |
| GET | `/` | Página inicial e produtos do JSON |
| GET/POST | `/login` | Página e processamento do login |
| GET/POST | `/recuperar-senha` | Formulário de recuperação |
| GET | `/clientes/cadastrar` | Formulário de cliente |
| GET/POST | `/clientes` | Lista e cadastro de clientes |
| GET | `/clientes/dados` | Dados públicos dos clientes em JSON |
| GET | `/funcionarios/cadastrar` | Formulário de funcionário |
| GET/POST | `/funcionarios` | Lista e cadastro de funcionários |
| GET | `/funcionarios/dados` | Dados públicos dos funcionários em JSON |
| GET | `/produtos/cadastrar` | Formulário de produto |
| GET/POST | `/produtos` | Lista e cadastro de produtos |
| GET | `/produtos/dados` | Produtos em JSON |
| GET | `/produtos/:id` | Visualização individual do produto |

Os POSTs aceitam dados de formulários HTML e também JSON enviado pelo Postman.

As listagens continuam em HTML comum, conforme o conteúdo trabalhado em sala. O JavaScript do navegador usa `fetch` para carregar os dados das rotas `/dados`, então o projeto não depende de EJS.

## Estrutura

- `server.js`: inicia o Express e registra os grupos de rotas.
- `routes/`: rotas de autenticação, clientes, funcionários e produtos.
- `middlewares/`: arquivos estáticos, leitura dos formulários e JSON, Helmet, Compression, Morgan e limites de requisição.
- `utils/pathUtils.js`: caminhos absolutos do projeto em ES Modules.
- `data/usuarios.json`: clientes, funcionários e usuários do login.
- `data/produtos.json`: produtos cadastrados.
- `views/`: páginas HTML.
- `assets/`: CSS, JavaScript, fontes e imagens.

## Segurança e logs

- O limite geral aceita até 100 requisições a cada 10 minutos por IP.
- O POST `/login` aceita até 5 tentativas a cada 10 minutos por IP.
- O Morgan grava método, rota, status, IP, data e navegador em `access.log`.
- Helmet adiciona cabeçalhos de segurança e Compression compacta as respostas.

O arquivo `access.log`, o `.env` e `node_modules` não são enviados ao Git.

## Testes no Postman

Teste os GETs da tabela e envie os cadastros com `Body > x-www-form-urlencoded` ou `Body > raw > JSON`. Para testar o limite do login, faça seis POSTs seguidos em `/login`; a sexta resposta deve ter status `429`.

As imagens de produto são escolhidas entre os arquivos presentes em `assets/img`. A recuperação de senha apenas confirma o recebimento porque o projeto não possui serviço de email. O upload de arquivos também ficou fora desta etapa, conforme o conteúdo das aulas.

Os usuários de exemplo são fictícios. Use apenas senhas de teste, pois este exercício acadêmico grava as senhas em texto simples no JSON.
