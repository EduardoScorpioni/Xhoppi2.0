import express from 'express';
import fs from 'node:fs';
import { caminhoData, caminhoViews } from '../utils/pathUtils.js';

const router = express.Router();

router.get('/cadastrar', (req, res) => {
    res.sendFile(caminhoViews('cadastrar-cliente.html'));
});

router.get('/dados', (req, res) => {
    const texto = fs.readFileSync(caminhoData('usuarios.json'), 'utf8');
    const usuarios = JSON.parse(texto);

    const clientes = usuarios
        .filter(usuario => usuario.nome && usuario.tipo !== 'funcionario')
        .map(usuario => ({
            nome: usuario.nome,
            sobrenome: usuario.sobrenome
        }));

    res.json(clientes);
});

router.get('/', (req, res) => {
    res.sendFile(caminhoViews('visualizar-cliente.html'));
});

router.post('/', (req, res) => {
    const {
        nome, sobrenome, cpf, dataNascimento,
        telefone, email, senha
    } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send('Preencha nome, email e senha');
    }

    const arquivoUsuarios = caminhoData('usuarios.json');
    const texto = fs.readFileSync(arquivoUsuarios, 'utf8');
    const usuarios = JSON.parse(texto);
    const emailJaExiste = usuarios.some(usuario => usuario.email === email);

    if (emailJaExiste) {
        return res.status(409).send('Email já existe');
    }

    const novoUsuario = {
        tipo: 'cliente',
        nome, sobrenome, cpf, dataNascimento,
        telefone, email, senha
    };

    usuarios.push(novoUsuario);
    fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuarios, null, 2), 'utf8');
    res.redirect('/login');
});

export default router;
