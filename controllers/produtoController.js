import Produto from '../models/Produto.js';

export function mostrarCadastroProduto(req, res) {
    res.render('cadastrar-produto', {
        titulo: 'Xhopii - Cadastro Produto',
        erro: null
    });
}

export async function listarProdutos(req, res, next) {
    try {
        const produtos = await Produto.find().sort({ codigo: 1 }).lean();

        res.render('ver-produto', {
            titulo: 'Xhopii - Ver Produtos',
            produtos
        });
    } catch (erro) {
        next(erro);
    }
}

export async function listarProdutosDados(req, res, next) {
    try {
        const produtos = await Produto.find()
            .select('codigo nome fabricante descricao valor quantidade imagem -_id')
            .sort({ codigo: 1 })
            .lean();

        res.json(produtos);
    } catch (erro) {
        next(erro);
    }
}

export async function visualizarProduto(req, res, next) {
    try {
        const codigo = Number(req.params.id);

        if (!Number.isInteger(codigo) || codigo < 1) {
            return res.status(404).render('erro', {
                titulo: 'Produto não encontrado',
                status: 404,
                mensagem: 'O código do produto é inválido.'
            });
        }

        const produto = await Produto.findOne({ codigo }).lean();

        if (!produto) {
            return res.status(404).render('erro', {
                titulo: 'Produto não encontrado',
                status: 404,
                mensagem: 'O produto informado não existe.'
            });
        }

        res.render('produto', {
            titulo: `Xhopii - ${produto.nome}`,
            produto
        });
    } catch (erro) {
        next(erro);
    }
}

export async function cadastrarProduto(req, res, next) {
    try {
        const {
            inputNomeProd, inputFabricanteProd, inputDescricaoProd,
            inputValorProd, inputQtdProd, inputFoto
        } = req.body;

        const valor = Number(String(inputValorProd).replace(',', '.'));
        const quantidade = Number(inputQtdProd);

        if (!inputNomeProd || !inputFabricanteProd || !inputDescricaoProd ||
            !Number.isFinite(valor) || valor < 0 ||
            !Number.isInteger(quantidade) || quantidade < 0) {
            return res.status(400).render('cadastrar-produto', {
                titulo: 'Xhopii - Cadastro Produto',
                erro: 'Preencha os dados do produto corretamente.'
            });
        }

        const ultimoProduto = await Produto.findOne().sort({ codigo: -1 }).lean();
        const proximoCodigo = ultimoProduto ? ultimoProduto.codigo + 1 : 1;
        const imagensPermitidas = [
            '/img/produto1.png', '/img/produto2.png', '/img/produto3.png',
            '/img/produto4.png', '/img/produto5.png'
        ];

        await Produto.create({
            codigo: proximoCodigo,
            nome: inputNomeProd,
            fabricante: inputFabricanteProd,
            descricao: inputDescricaoProd,
            valor,
            quantidade,
            imagem: imagensPermitidas.includes(inputFoto)
                ? inputFoto
                : '/img/produto1.png'
        });

        res.redirect('/produtos');
    } catch (erro) {
        next(erro);
    }
}
