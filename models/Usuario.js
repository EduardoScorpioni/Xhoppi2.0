import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['cliente', 'funcionario', 'login'],
        default: 'cliente'
    },
    nome: {
        type: String,
        trim: true
    },
    sobrenome: {
        type: String,
        trim: true
    },
    cpf: {
        type: String,
        trim: true
    },
    dataNascimento: Date,
    telefone: {
        type: String,
        trim: true
    },
    cargo: {
        type: String,
        trim: true
    },
    salario: {
        type: Number,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

export default Usuario;
