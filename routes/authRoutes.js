import express from 'express';
import {
    mostrarLogin,
    processarLogin,
    mostrarRecuperacao,
    processarRecuperacao
} from '../controllers/authController.js';
import { limiteLogin } from '../middlewares/middlewares.js';

const router = express.Router();

router.get('/login', mostrarLogin);
router.post('/login', limiteLogin, processarLogin);
router.get('/recuperar-senha', mostrarRecuperacao);
router.post('/recuperar-senha', processarRecuperacao);

export default router;
