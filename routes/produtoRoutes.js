import express from 'express';
import fs from 'node:fs';
import { caminhoData, caminhoViews } from '../utils/pathUtils.js';

const router = express.Router();

router.get('/cadastrar', (req, res) => {
    res.sendFile(caminhoViews('cadastrar-produto.html'));
});

router.get('/dados', (req, res) => {
    const texto = fs.readFileSync(caminhoData('produtos.json'), 'utf8');
    const produtos = JSON.parse(texto);
    res.json(produtos);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const texto = fs.readFileSync(caminhoData('produtos.json'), 'utf8');
    const produtos = JSON.parse(texto);
    const produto = produtos.find(item => item.id === id);

    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }

    res.sendFile(caminhoViews('produto.html'));
});

router.get('/', (req, res) => {
    res.sendFile(caminhoViews('ver-produto.html'));
});

router.post('/', (req, res) => {
    const {
        inputNomeProd, inputFabricanteProd, inputDescricaoProd,
        inputValorProd, inputQtdProd, inputFoto
    } = req.body;

    const valor = Number(String(inputValorProd).replace(',', '.'));
    const quantidade = Number(inputQtdProd);

    if (!inputNomeProd || !inputFabricanteProd || !inputDescricaoProd ||
        !inputValorProd || !inputQtdProd || !Number.isFinite(valor) || valor < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        return res.status(400).send('Preencha os dados do produto corretamente');
    }

    const arquivoProdutos = caminhoData('produtos.json');
    const texto = fs.readFileSync(arquivoProdutos, 'utf8');
    const produtos = JSON.parse(texto);
    const imagens = [
        '/img/produto1.png', '/img/produto2.png', '/img/produto3.png',
        '/img/produto4.png', '/img/produto5.png'
    ];
    const maiorId = produtos.reduce((maior, produto) => Math.max(maior, produto.id), 0);

    const novoProduto = {
        id: maiorId + 1,
        nome: inputNomeProd,
        fabricante: inputFabricanteProd,
        descricao: inputDescricaoProd,
        valor,
        quantidade,
        imagem: imagens.includes(inputFoto) ? inputFoto : '/img/produto1.png'
    };

    produtos.push(novoProduto);
    fs.writeFileSync(arquivoProdutos, JSON.stringify(produtos, null, 2), 'utf8');
    res.redirect('/produtos');
});

export default router;
