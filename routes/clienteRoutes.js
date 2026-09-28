import express from 'express';
import {
    mostrarCadastroCliente,
    listarClientes,
    listarClientesDados,
    cadastrarCliente
} from '../controllers/clienteController.js';

const router = express.Router();

router.get('/cadastrar', mostrarCadastroCliente);
router.get('/dados', listarClientesDados);
router.get('/', listarClientes);
router.post('/', cadastrarCliente);

export default router;
