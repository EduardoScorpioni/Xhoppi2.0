const listaFuncionarios = document.getElementById('lista-funcionarios');

fetch('/funcionarios/dados')
    .then(resposta => resposta.json())
    .then(funcionarios => {
        if (funcionarios.length === 0) {
            const item = document.createElement('li');
            item.textContent = 'Nenhum funcionário cadastrado.';
            listaFuncionarios.appendChild(item);
            return;
        }

        funcionarios.forEach(funcionario => {
            const item = document.createElement('li');
            item.textContent = `${funcionario.nome} ${funcionario.sobrenome || ''} — ${funcionario.cargo || 'Cargo não informado'}`;
            listaFuncionarios.appendChild(item);
        });
    })
    .catch(() => {
        listaFuncionarios.textContent = 'Erro ao carregar funcionários.';
    });
