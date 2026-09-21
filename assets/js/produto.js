const idProduto = Number(window.location.pathname.split('/').pop());

fetch('/produtos/dados')
    .then(resposta => resposta.json())
    .then(produtos => {
        const produto = produtos.find(item => item.id === idProduto);

        if (!produto) {
            document.getElementById('detalhe-nome').textContent = 'Produto não encontrado';
            return;
        }

        const imagem = document.getElementById('detalhe-imagem');
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;

        document.getElementById('detalhe-nome').textContent = produto.nome;
        document.getElementById('detalhe-fabricante').textContent = `Fabricante: ${produto.fabricante}`;
        document.getElementById('detalhe-descricao').textContent = produto.descricao;
        document.getElementById('detalhe-valor').textContent = Number(produto.valor).toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
        });
        document.getElementById('detalhe-quantidade').textContent = `${produto.quantidade} disponíveis`;
    })
    .catch(() => {
        document.getElementById('detalhe-nome').textContent = 'Erro ao carregar produto';
    });
