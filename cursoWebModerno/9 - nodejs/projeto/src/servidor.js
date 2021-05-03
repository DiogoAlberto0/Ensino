const porta = 3003

const express = require('express')

const app = express()

const bacoDeDados = require('./bancoDeDados')

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true}))

app.get('/produtos', (req, res) => {
    res.send(bacoDeDados.getProdutos())
})

app.get('/produtos/:id', (req, res) => {
    res.send(bacoDeDados.getProduto(req.params.id))
})

app.post('/produtos', (req, res) => {
    const produtos = bacoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produtos) //JSON
})

app.delete('/produtos/:id', (req, res) => {
    const produto = bacoDeDados.excluirProdutos(req.params.id)
    res.send(produto)
})


app.listen(porta, () => {
    console.log(`Servidor está conectado na porta: ${porta}`)
})