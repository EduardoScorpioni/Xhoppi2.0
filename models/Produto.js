import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
        trim: true
    },
    fabricante: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    valor: {
        type: Number,
        required: true,
        min: 0
    },
    quantidade: {
        type: Number,
        required: true,
        min: 0
    },
    imagem: {
        type: String,
        default: '/img/produto1.png'
    }
}, {
    timestamps: true
});

const Produto = mongoose.model('Produto', produtoSchema, 'produtos');

export default Produto;
