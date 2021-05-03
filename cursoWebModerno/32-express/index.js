const express = require('express')
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')

const app = express()
// >>>>>>>>>>/produtos<<<<<<<<<<
require('./api/produtos')(app, ' com parametros!')

// >>>>>>>>>>/usuario<<<<<<<<<<
app.get('/usuario', usuarioApi.obter)
app.post('/usuario', usuarioApi.salvar)



//  >>>>>>>>>>/corpo<<<<<<<<<<
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/corpo', (req, res) => {
    //let corpo = ''
    //req.on('data', function(parte) {
    //    corpo += parte
    //})
    //req.on('end', function() {
    res.send(req.body.id + ')' + req.body.nome)    
    //})
})

//  >>>>>>>>>> /clientes <<<<<<<<<<
//      >>>>>/relatorio<<<<<
app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo = ${req.query.completo} ano = ${req.query.ano}`)
})
//      >>>>>/id<<<<<
app.get('/clientes/:id', (req, res, next) => {
    res.send(`Cliente ${req.params.id} selecionado`)
    next()
})

// >>>>>>>> /products <<<<<<<<<
app.get('/products', (req, res, next) => {
    console.log('Durante...')
    res.json({
        data: [
            {id: 1,nome: 'Iphone', preco: 2500.00},
            {id: 2,nome: 'PlayStation 4', preco: 2100.00},
            {id: 3,nome: 'Mobilete', preco: 1900.00}
        ],
        count:3,
        skip:0,
        limit: 3,
        status: 200
    })
    next()
})
app.use('/products', (req, res) => {
    console.log('Depois...')
})

//  >>>>>>>>>> Qualquer requisição <<<<<<<<<<
app.use((req, res, next) => {
    res.send('Página Não encontrada!')
    next()
})

app.use(saudacao('Diogo'))


app.use((req, res, next) => {
    console.log('Antes')
    next()
})
// >>>>>>> Executando na porta 3000 <<<<<<<<
app.listen(3000, () => {
    console.log("API executando!...")
})