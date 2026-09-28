export function paginaNaoEncontrada(req, res) {
    res.status(404).render('erro', {
        titulo: 'Página não encontrada',
        status: 404,
        mensagem: 'A página solicitada não existe.'
    });
}

export function tratarErro(erro, req, res, next) {
    if (res.headersSent) {
        return next(erro);
    }

    console.error(erro);

    const valorDuplicado = erro?.code === 11000;
    const status = valorDuplicado ? 409 : 500;
    const mensagem = valorDuplicado
        ? 'Já existe um cadastro com essa informação.'
        : 'Ocorreu um erro interno. Tente novamente.';

    res.status(status).render('erro', {
        titulo: 'Erro',
        status,
        mensagem
    });
}
