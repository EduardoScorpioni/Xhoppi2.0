import express from "express";
import path from 'path';
import fs from 'node:fs';
import helmet from 'helmet';

const app = express()
const port = 3000

const pathAbsolute = new URL(".", import.meta.url).pathname;
const __dirname = pathAbsolute.slice(1);

app.use(helmet())
app.use(express.static(path.join(__dirname, 'assets')))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const filePath = (path.join(__dirname, 'views', 'home.html'))
    res.sendFile(filePath);
})

app.get('/login', (req, res) => {
    const caminhoLogin = (path.join(__dirname, 'views', 'login.html'))
    res.sendFile(caminhoLogin);
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
        res.status(401).send('DADOS INVALIDOS')
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
