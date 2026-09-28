import fs from 'node:fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { conectarBanco } from '../config/database.js';
import { caminhoData } from '../utils/pathUtils.js';
import Usuario from '../models/Usuario.js';
import Produto from '../models/Produto.js';

dotenv.config({ quiet: true });

async function importarDados() {
    try {
        await conectarBanco();

        const usuariosJson = JSON.parse(
            fs.readFileSync(caminhoData('usuarios.json'), 'utf8')
        );
        const produtosJson = JSON.parse(
            fs.readFileSync(caminhoData('produtos.json'), 'utf8')
        );

        for (const usuario of usuariosJson) {
            await Usuario.updateOne(
                { email: usuario.email.toLowerCase() },
                {
                    $setOnInsert: {
                        ...usuario,
                        tipo: usuario.tipo || (usuario.nome ? 'cliente' : 'login'),
                        dataNascimento: usuario.dataNascimento || undefined
                    }
                },
                { upsert: true }
            );
        }

        for (const produto of produtosJson) {
            await Produto.updateOne(
                { codigo: produto.id },
                {
                    $setOnInsert: {
                        codigo: produto.id,
                        nome: produto.nome,
                        fabricante: produto.fabricante,
                        descricao: produto.descricao,
                        valor: produto.valor,
                        quantidade: produto.quantidade,
                        imagem: produto.imagem
                    }
                },
                { upsert: true }
            );
        }

        console.log('Dados de exemplo importados com sucesso');
    } catch (erro) {
        console.error('Erro ao importar os dados:', erro.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

importarDados();
