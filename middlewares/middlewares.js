import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { raizProjeto } from '../utils/pathUtils.js';

const limiteGeral = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Muitas requisições. Tente novamente em alguns minutos.'
});

export const limiteLogin = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Muitas tentativas de login. Tente novamente em 10 minutos.'
});

export function configurarMiddlewares(app) {
    const caminhoLog = path.join(raizProjeto, 'access.log');
    const arquivoLog = fs.createWriteStream(caminhoLog, { flags: 'a' });

    app.use(morgan(':date[iso] :remote-addr :method :url :status ":user-agent"', {
        stream: arquivoLog
    }));
    app.use(helmet());
    app.use(compression());
    app.use(limiteGeral);
    app.use(express.static(path.join(raizProjeto, 'assets')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}
