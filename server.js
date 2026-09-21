import express from 'express';
import dotenv from 'dotenv';
import { configurarMiddlewares } from './middlewares/middlewares.js';
import authRoutes from './routes/authRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import { caminhoViews } from './utils/pathUtils.js';

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

configurarMiddlewares(app);

app.get('/', (req, res) => {
    res.sendFile(caminhoViews('home.html'));
});

app.use(authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/produtos', produtoRoutes);

app.use((req, res) => {
    res.status(404).send('Página não encontrada. <a href="/">Voltar para a home</a>');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
