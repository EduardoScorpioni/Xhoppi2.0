import mongoose from 'mongoose';

export async function conectarBanco() {
    const enderecoMongo = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/xhoppi';

    await mongoose.connect(enderecoMongo, {
        serverSelectionTimeoutMS: 10000
    });

    console.log('MongoDB conectado com sucesso');
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB desconectado');
});

mongoose.connection.on('error', (erro) => {
    console.error('Erro na conexão com o MongoDB:', erro.message);
});
