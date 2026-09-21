const lista = document.getElementById('lista-clientes');

fetch('/clientes/dados')
    .then(resposta => resposta.json())
    .then(clientes => {
        if (clientes.length === 0) {
            const item = document.createElement('li');
            item.textContent = 'Nenhum cliente cadastrado.';
            lista.appendChild(item);
            return;
        }

        clientes.forEach(cliente => {
            const item = document.createElement('li');
            item.textContent = `${cliente.nome} ${cliente.sobrenome || ''}`.trim();
            lista.appendChild(item);
        });
    })
    .catch(() => {
        lista.textContent = 'Erro ao carregar clientes.';
    });