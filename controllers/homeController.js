import Produto from '../models/Produto.js';

export async function mostrarHome(req, res, next) {
    try {
        const produtos = await Produto.find().sort({ codigo: 1 }).lean();

        res.render('home', {
            titulo: 'Xhopii - Home',
            produtos
        });
    } catch (erro) {
        next(erro);
    }
}
