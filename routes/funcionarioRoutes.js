import express from 'express';
import fs from 'node:fs';
import { caminhoData, caminhoViews } from '../utils/pathUtils.js';

const router = express.Router();

router.get('/cadastrar', (req, res) => {
    res.sendFile(caminhoViews('cadastrar-funcionario.html'));
});

router.get('/dados', (req, res) => {
    const texto = fs.readFileSync(caminhoData('usuarios.json'), 'utf8');
    const usuarios = JSON.parse(texto);

    const funcionarios = usuarios
        .filter(usuario => usuario.tipo === 'funcionario')
        .map(usuario => ({
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            cargo: usuario.cargo
        }));

    res.json(funcionarios);
});

router.get('/', (req, res) => {
    res.sendFile(caminhoViews('visualizar-funcionario.html'));
});

router.post('/', (req, res) => {
    const {
        inputNomeFunc, inputSobrenomeFunc, inputCPFFunc,
        inputDataNascFunc, inputTelefoneFunc, inputCargoFunc,
        inputSalarioFunc, inputEmailFunc, inputSenha
    } = req.body;

    if (!inputNomeFunc || !inputEmailFunc || !inputSenha) {
        return res.status(400).send('Preencha nome, email e senha');
    }

    const arquivoUsuarios = caminhoData('usuarios.json');
    const texto = fs.readFileSync(arquivoUsuarios, 'utf8');
    const usuarios = JSON.parse(texto);
    const emailJaExiste = usuarios.some(usuario => usuario.email === inputEmailFunc);

    if (emailJaExiste) {
        return res.status(409).send('Email já existe');
    }

    const novoFuncionario = {
        tipo: 'funcionario',
        nome: inputNomeFunc,
        sobrenome: inputSobrenomeFunc,
        cpf: inputCPFFunc,
        dataNascimento: inputDataNascFunc,
        telefone: inputTelefoneFunc,
        cargo: inputCargoFunc,
        salario: inputSalarioFunc,
        email: inputEmailFunc,
        senha: inputSenha
    };

    usuarios.push(novoFuncionario);
    fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuarios, null, 2), 'utf8');
    res.redirect('/funcionarios');
});

export default router;
