import Usuario from '../models/Usuario.js';

export function mostrarLogin(req, res) {
    res.render('login', {
        titulo: 'Xhopii - Login',
        erro: null
    });
}

export async function processarLogin(req, res, next) {
    try {
        const { inputEmailLog, inputSenhaLog } = req.body;

        const usuario = await Usuario.findOne({
            email: inputEmailLog?.toLowerCase(),
            senha: inputSenhaLog
        });

        if (!usuario) {
            return res.status(401).render('login', {
                titulo: 'Xhopii - Login',
                erro: 'Email ou senha inválidos.'
            });
        }

        res.redirect('/');
    } catch (erro) {
        next(erro);
    }
}

export function mostrarRecuperacao(req, res) {
    res.render('recuperar-senha', {
        titulo: 'Xhopii - Recuperar Senha'
    });
}

export function processarRecuperacao(req, res) {
    const { inputEmailLog } = req.body;

    if (!inputEmailLog) {
        return res.status(400).render('erro', {
            titulo: 'Campo obrigatório',
            status: 400,
            mensagem: 'Informe o email para continuar.'
        });
    }

    res.render('mensagem', {
        titulo: 'Solicitação recebida',
        mensagem: `A solicitação para ${inputEmailLog} foi recebida.`,
        link: '/login',
        textoLink: 'Voltar ao login'
    });
}
