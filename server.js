import express from "express";
import path from 'path';
import fs from 'node:fs';
import helmet from 'helmet';

const app = express()
const port = process.env.PORT || 3000

const pathAbsolute = new URL(".", import.meta.url).pathname;
const __dirname = pathAbsolute.slice(1);

app.use(helmet())
app.use(express.static(path.join(__dirname, 'assets')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    const filePath = (path.join(__dirname, 'views', 'home.html'))
    res.sendFile(filePath);
})

app.get('/login', (req, res) => {
    const caminhoLogin = (path.join(__dirname, 'views', 'login.html'))
    res.sendFile(caminhoLogin);
})

app.get('/clientes/cadastrar', (req, res) => {
    const filePath = (path.join(__dirname, 'views', 'cadastrar-cliente.html'));
    res.sendFile(filePath);
})

app.get('/clientes', (req, res) => {
    const filePath = (path.join(__dirname, 'views', 'visualizar-cliente.html'))
    res.sendFile(filePath)
})

app.get('/clientes/dados', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'usuarios.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const usuarios = JSON.parse(texto);

    const clientes = usuarios
        .filter(usuario => usuario.nome && usuario.tipo !== 'funcionario')
        .map(usuario => ({
            nome: usuario.nome,
            sobrenome: usuario.sobrenome
        }));

    res.json(clientes);
});

app.post('/clientes', (req, res) => {
    const {
        nome, sobrenome, cpf, dataNascimento,
        telefone, email, senha
    } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send('Preencha nome, email e senha');
    }

    const caminho = path.join(__dirname, 'data', 'usuarios.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const usuarios = JSON.parse(texto);

    const novoUsuario = {
        tipo: 'cliente',
        nome, sobrenome, cpf, dataNascimento,
        telefone, email, senha
    };

    const emailJaExiste = usuarios.some(usuario => usuario.email === email);

    if(emailJaExiste){
        res.status(409).send("Email já Existe")
    }else{
        usuarios.push(novoUsuario);

        fs.writeFileSync(
            caminho,
            JSON.stringify(usuarios, null, 2),
            'utf8'
        );

        res.redirect('/login');
    }

});

app.get('/funcionario/cadastrar', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'cadastrar-funcionario.html');
    res.sendFile(filePath);
})

app.get('/funcionarios', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'visualizar-funcionario.html');
    res.sendFile(filePath);
})

app.get('/funcionarios/dados', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'usuarios.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const usuarios = JSON.parse(texto);

    const funcionarios = usuarios
        .filter(usuario => usuario.tipo === 'funcionario')
        .map(usuario => ({
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            cargo: usuario.cargo
        }));

    res.json(funcionarios);
})

app.post('/funcionarios', (req, res) => {
    const {
        inputNomeFunc, inputSobrenomeFunc, inputCPFFunc,
        inputDataNascFunc, inputTelefoneFunc, inputCargoFunc,
        inputSalarioFunc, inputEmailFunc, inputSenha
    } = req.body;

    if (!inputNomeFunc || !inputEmailFunc || !inputSenha) {
        return res.status(400).send('Preencha nome, email e senha');
    }

    const caminho = path.join(__dirname, 'data', 'usuarios.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const usuarios = JSON.parse(texto);
    const emailJaExiste = usuarios.some(usuario => usuario.email === inputEmailFunc);

    if (emailJaExiste) {
        return res.status(409).send('Email já existe');
    }

    const novoFuncionario = {
        tipo: 'funcionario',
        nome: inputNomeFunc,
        sobrenome: inputSobrenomeFunc,
        cpf: inputCPFFunc,
        dataNascimento: inputDataNascFunc,
        telefone: inputTelefoneFunc,
        cargo: inputCargoFunc,
        salario: inputSalarioFunc,
        email: inputEmailFunc,
        senha: inputSenha
    };

    usuarios.push(novoFuncionario);
    fs.writeFileSync(caminho, JSON.stringify(usuarios, null, 2), 'utf8');
    res.redirect('/funcionarios');
})

app.get('/produto/cadastrar', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'cadastrar-produto.html');
    res.sendFile(filePath);
})

app.get('/produtos', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'ver-produto.html');
    res.sendFile(filePath);
})

app.get('/produtos/dados', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'produtos.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const produtos = JSON.parse(texto);
    res.json(produtos);
})

app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const caminho = path.join(__dirname, 'data', 'produtos.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const produtos = JSON.parse(texto);
    const produto = produtos.find(item => item.id === id);

    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }

    const filePath = path.join(__dirname, 'views', 'produto.html');
    res.sendFile(filePath);
})

app.post('/produtos', (req, res) => {
    const {
        inputNomeProd, inputFabricanteProd, inputDescricaoProd,
        inputValorProd, inputQtdProd, inputFoto
    } = req.body;

    const valor = Number(String(inputValorProd).replace(',', '.'));
    const quantidade = Number(inputQtdProd);

    if (!inputNomeProd || !inputFabricanteProd || !inputDescricaoProd ||
        !inputValorProd || !inputQtdProd || !Number.isFinite(valor) || valor < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        return res.status(400).send('Preencha os dados do produto corretamente');
    }

    const caminho = path.join(__dirname, 'data', 'produtos.json');
    const texto = fs.readFileSync(caminho, 'utf8');
    const produtos = JSON.parse(texto);
    const imagens = [
        '/img/produto1.png', '/img/produto2.png', '/img/produto3.png',
        '/img/produto4.png', '/img/produto5.png'
    ];

    const novoProduto = {
        id: produtos.length + 1,
        nome: inputNomeProd,
        fabricante: inputFabricanteProd,
        descricao: inputDescricaoProd,
        valor,
        quantidade,
        imagem: imagens.includes(inputFoto) ? inputFoto : '/img/produto1.png'
    };

    produtos.push(novoProduto);
    fs.writeFileSync(caminho, JSON.stringify(produtos, null, 2), 'utf8');
    res.redirect('/produtos');
})

app.get('/recuperar-senha', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'recuperar-senha.html');
    res.sendFile(filePath);
})

app.post('/recuperar-senha', (req, res) => {
    const { inputEmailLog } = req.body;

    if (!inputEmailLog) {
        return res.status(400).send('Informe o email');
    }

    res.send('Solicitação recebida. O envio de email ainda não está configurado neste projeto. <a href="/login">Voltar ao login</a>');
})

app.post('/login', (req, res) => {
    const {inputEmailLog, inputSenhaLog} = req.body;
    const caminho = path.join(__dirname, 'data', 'usuarios.json')
    const texto = fs.readFileSync(caminho, 'utf8');
    const usuarios = JSON.parse(texto)

    console.log(`Usuarios carregados: ${usuarios.length}`)

    const encontrado = usuarios.find(usuario => 
        usuario.email === inputEmailLog && usuario.senha === inputSenhaLog
    )
    if(!!encontrado){
        res.redirect('/')
    }else{
        res.status(401).send('DADOS INVALIDOS. <a href="/login">Voltar ao login</a>')
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
