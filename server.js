import express from 'express';
import dotenv from 'dotenv';
import { conectarBanco } from './config/database.js';
import { configurarMiddlewares } from './middlewares/middlewares.js';
import { paginaNaoEncontrada, tratarErro } from './middlewares/errorMiddleware.js';
import homeRoutes from './routes/homeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import { pastaViews } from './utils/pathUtils.js';

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', pastaViews);

configurarMiddlewares(app);

app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/produtos', produtoRoutes);

app.use(paginaNaoEncontrada);
app.use(tratarErro);

async function iniciarServidor() {
    try {
        await conectarBanco();

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (erro) {
        console.error('Não foi possível iniciar o servidor:', erro.message);
        process.exitCode = 1;
    }
}

iniciarServidor();
