import express from 'express';
import fs from 'node:fs';
import { caminhoData, caminhoViews } from '../utils/pathUtils.js';
import { limiteLogin } from '../middlewares/middlewares.js';

const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(caminhoViews('login.html'));
});

router.post('/login', limiteLogin, (req, res) => {
    const { inputEmailLog, inputSenhaLog } = req.body;
    const texto = fs.readFileSync(caminhoData('usuarios.json'), 'utf8');
    const usuarios = JSON.parse(texto);

    const encontrado = usuarios.find(usuario =>
        usuario.email === inputEmailLog && usuario.senha === inputSenhaLog
    );

    if (encontrado) {
        return res.redirect('/');
    }

    res.status(401).send('DADOS INVÁLIDOS. <a href="/login">Voltar ao login</a>');
});

router.get('/recuperar-senha', (req, res) => {
    res.sendFile(caminhoViews('recuperar-senha.html'));
});

router.post('/recuperar-senha', (req, res) => {
    const { inputEmailLog } = req.body;

    if (!inputEmailLog) {
        return res.status(400).send('Informe o email');
    }

    res.send('Solicitação recebida. O envio de email ainda não está configurado neste projeto. <a href="/login">Voltar ao login</a>');
});

export default router;
