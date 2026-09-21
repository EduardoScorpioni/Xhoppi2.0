const produtosHome = document.getElementById('produtos-home');
const listaProdutos = document.getElementById('lista-produtos');
const areaProdutos = produtosHome || listaProdutos;

fetch('/produtos/dados')
    .then(resposta => resposta.json())
    .then(produtos => {
        if (produtos.length === 0) {
            areaProdutos.textContent = 'Nenhum produto cadastrado.';
            return;
        }

        produtos.forEach(produto => {
            const card = document.createElement('a');
            card.className = produtosHome ? 'produto-item-grid' : 'ver-produto-item-grid';
            card.href = `/produtos/${produto.id}`;

            const detalhes = document.createElement('section');
            if (listaProdutos) detalhes.className = 'ver-produto-detalhes';

            const imagem = document.createElement('img');
            imagem.src = produto.imagem;
            imagem.alt = produto.nome;
            detalhes.appendChild(imagem);

            const nome = document.createElement('p');
            nome.className = 'nome-produto';
            nome.textContent = produto.nome;
            detalhes.appendChild(nome);

            if (listaProdutos) {
                const fabricante = document.createElement('p');
                fabricante.className = 'detalhe-produto';
                fabricante.textContent = `Fabricante: ${produto.fabricante}`;
                detalhes.appendChild(fabricante);

                const descricao = document.createElement('p');
                descricao.className = 'detalhe-produto';
                descricao.textContent = produto.descricao;
                detalhes.appendChild(descricao);
            }

            const informacoes = document.createElement('section');
            informacoes.className = produtosHome ? 'produto-item-info' : 'ver-produto-item-info';

            const valor = document.createElement('p');
            valor.className = 'valor-produto';
            valor.textContent = Number(produto.valor).toLocaleString('pt-BR', {
                style: 'currency', currency: 'BRL'
            });
            informacoes.appendChild(valor);

            const quantidade = document.createElement('p');
            quantidade.className = 'disponiveis-produto';
            quantidade.textContent = `${produto.quantidade} disponíveis`;
            informacoes.appendChild(quantidade);

            detalhes.appendChild(informacoes);
            card.appendChild(detalhes);
            areaProdutos.appendChild(card);
        });
    })
    .catch(() => {
        areaProdutos.textContent = 'Erro ao carregar produtos.';
    });
