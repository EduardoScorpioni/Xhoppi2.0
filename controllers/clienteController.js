import Usuario from '../models/Usuario.js';

export function mostrarCadastroCliente(req, res) {
    res.render('cadastrar-cliente', {
        titulo: 'Xhopii - Cadastro Cliente',
        erro: null
    });
}

export async function listarClientes(req, res, next) {
    try {
        const clientes = await Usuario.find({ tipo: 'cliente' })
            .select('nome sobrenome cpf dataNascimento telefone email')
            .sort({ nome: 1 })
            .lean();

        res.render('visualizar-cliente', {
            titulo: 'Xhopii - Ver Clientes',
            clientes
        });
    } catch (erro) {
        next(erro);
    }
}

export async function listarClientesDados(req, res, next) {
    try {
        const clientes = await Usuario.find({ tipo: 'cliente' })
            .select('nome sobrenome cpf dataNascimento telefone email -_id')
            .sort({ nome: 1 })
            .lean();

        res.json(clientes);
    } catch (erro) {
        next(erro);
    }
}

export async function cadastrarCliente(req, res, next) {
    try {
        const {
            nome, sobrenome, cpf, dataNascimento,
            telefone, email, senha
        } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).render('cadastrar-cliente', {
                titulo: 'Xhopii - Cadastro Cliente',
                erro: 'Preencha nome, email e senha.'
            });
        }

        const emailJaExiste = await Usuario.exists({ email: email.toLowerCase() });

        if (emailJaExiste) {
            return res.status(409).render('cadastrar-cliente', {
                titulo: 'Xhopii - Cadastro Cliente',
                erro: 'Este email já está cadastrado.'
            });
        }

        await Usuario.create({
            tipo: 'cliente',
            nome,
            sobrenome,
            cpf,
            dataNascimento: dataNascimento || undefined,
            telefone,
            email,
            senha
        });

        res.redirect('/login');
    } catch (erro) {
        next(erro);
    }
}
