# Xhoppi2.0

Projeto acadêmico em Node.js, Express, HTML, CSS e JavaScript.

## Como executar

```bash
npm install
npm start
```

Abra `http://localhost:3000` no navegador.

## Páginas e formulários

- `/` — página inicial com os produtos de `data/produtos.json`.
- `/login` — login com os usuários de `data/usuarios.json`.
- `/clientes/cadastrar` e `/clientes` — cadastro e lista de clientes.
- `/funcionario/cadastrar` e `/funcionarios` — cadastro e lista de funcionários.
- `/produto/cadastrar` e `/produtos` — cadastro e lista de produtos.
- `/produtos/1`, `/produtos/2` etc. — página de cada produto cadastrado.
- `/recuperar-senha` — recebe a solicitação de recuperação.

Os formulários enviam dados por POST. As páginas HTML usam JavaScript para buscar as listas em `/clientes/dados`, `/funcionarios/dados` e `/produtos/dados`. Clientes e funcionários ficam em `data/usuarios.json`, identificados pelo campo `tipo`; produtos ficam em `data/produtos.json`.

As imagens de produto são escolhidas entre as imagens já presentes em `assets/img`. A recuperação de senha só confirma o recebimento da solicitação; o envio de email não está configurado. Os usuários de exemplo são fictícios. Use apenas senhas de teste, pois este exercício grava senhas em texto simples no JSON.

Os itens informativos e redes sociais do rodapé aparecem como texto porque ainda não existem páginas ou integrações para eles. O login por SMS e por redes sociais também não faz parte desta versão.
