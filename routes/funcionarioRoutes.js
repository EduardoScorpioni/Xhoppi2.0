import express from 'express';
import {
    mostrarCadastroFuncionario,
    listarFuncionarios,
    listarFuncionariosDados,
    cadastrarFuncionario
} from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/cadastrar', mostrarCadastroFuncionario);
router.get('/dados', listarFuncionariosDados);
router.get('/', listarFuncionarios);
router.post('/', cadastrarFuncionario);

export default router;
