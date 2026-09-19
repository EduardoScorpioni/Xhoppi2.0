import express from 'express';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import __dirname from '../utils/pathUtils.js';

const staticMiddleware = express.static(path.join(__dirname, 'assets'));

const urlencodedMiddleware = express.urlencoded({ extended: true });
const jsonMiddleware = express.json();

const securityMiddleware = helmet();
const compressionMiddleware = compression();

const rateLimitMiddleware = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Muitas requisicoes, tente novamente em 10 minutos.',
  standardHeaders: true,
  legacyHeaders: false
});

const loginRateLimitMiddleware = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'Muitas tentativas de login. Tente novamente em 10 minutos.',
  standardHeaders: true,
  legacyHeaders: false
});

const logFile = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const morganMiddleware = morgan(
  ':remote-addr - :date[iso] ":method :url HTTP/:http-version" :status ":user-agent"',
  { stream: logFile }
);

export {
  staticMiddleware,
  urlencodedMiddleware,
  jsonMiddleware,
  securityMiddleware,
  compressionMiddleware,
  rateLimitMiddleware,
  loginRateLimitMiddleware,
  morganMiddleware
};
