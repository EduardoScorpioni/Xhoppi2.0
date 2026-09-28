import express from 'express';
import { mostrarHome } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', mostrarHome);

export default router;
