import path from 'node:path';
import { fileURLToPath } from 'node:url';

const arquivoAtual = fileURLToPath(import.meta.url);
const pastaUtils = path.dirname(arquivoAtual);

export const raizProjeto = path.resolve(pastaUtils, '..');
export const pastaViews = path.join(raizProjeto, 'views');

export function caminhoData(nomeArquivo) {
    return path.join(raizProjeto, 'data', nomeArquivo);
}
