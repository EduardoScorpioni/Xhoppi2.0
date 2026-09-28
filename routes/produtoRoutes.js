import express from 'express';
import {
    mostrarCadastroProduto,
    listarProdutos,
    listarProdutosDados,
    visualizarProduto,
    cadastrarProduto
} from '../controllers/produtoController.js';

const router = express.Router();

router.get('/cadastrar', mostrarCadastroProduto);
router.get('/dados', listarProdutosDados);
router.get('/', listarProdutos);
router.get('/:id', visualizarProduto);
router.post('/', cadastrarProduto);

export default router;
