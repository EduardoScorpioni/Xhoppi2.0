import Usuario from '../models/Usuario.js';

export function mostrarCadastroFuncionario(req, res) {
    res.render('cadastrar-funcionario', {
        titulo: 'Xhopii - Cadastro Funcionário',
        erro: null
    });
}

export async function listarFuncionarios(req, res, next) {
    try {
        const funcionarios = await Usuario.find({ tipo: 'funcionario' })
            .select('nome sobrenome cpf dataNascimento telefone cargo email salario')
            .sort({ nome: 1 })
            .lean();

        res.render('visualizar-funcionario', {
            titulo: 'Xhopii - Ver Funcionários',
            funcionarios
        });
    } catch (erro) {
        next(erro);
    }
}

export async function listarFuncionariosDados(req, res, next) {
    try {
        const funcionarios = await Usuario.find({ tipo: 'funcionario' })
            .select('nome sobrenome cpf dataNascimento telefone cargo email salario -_id')
            .sort({ nome: 1 })
            .lean();

        res.json(funcionarios);
    } catch (erro) {
        next(erro);
    }
}

export async function cadastrarFuncionario(req, res, next) {
    try {
        const {
            inputNomeFunc, inputSobrenomeFunc, inputCPFFunc,
            inputDataNascFunc, inputTelefoneFunc, inputCargoFunc,
            inputSalarioFunc, inputEmailFunc, inputSenha
        } = req.body;

        if (!inputNomeFunc || !inputEmailFunc || !inputSenha) {
            return res.status(400).render('cadastrar-funcionario', {
                titulo: 'Xhopii - Cadastro Funcionário',
                erro: 'Preencha nome, email e senha.'
            });
        }

        const salario = inputSalarioFunc
            ? Number(String(inputSalarioFunc).replace(',', '.'))
            : undefined;

        if (salario !== undefined && (!Number.isFinite(salario) || salario < 0)) {
            return res.status(400).render('cadastrar-funcionario', {
                titulo: 'Xhopii - Cadastro Funcionário',
                erro: 'Informe um salário válido.'
            });
        }

        const emailJaExiste = await Usuario.exists({
            email: inputEmailFunc.toLowerCase()
        });

        if (emailJaExiste) {
            return res.status(409).render('cadastrar-funcionario', {
                titulo: 'Xhopii - Cadastro Funcionário',
                erro: 'Este email já está cadastrado.'
            });
        }

        await Usuario.create({
            tipo: 'funcionario',
            nome: inputNomeFunc,
            sobrenome: inputSobrenomeFunc,
            cpf: inputCPFFunc,
            dataNascimento: inputDataNascFunc || undefined,
            telefone: inputTelefoneFunc,
            cargo: inputCargoFunc,
            salario,
            email: inputEmailFunc,
            senha: inputSenha
        });

        res.redirect('/funcionarios');
    } catch (erro) {
        next(erro);
    }
}
