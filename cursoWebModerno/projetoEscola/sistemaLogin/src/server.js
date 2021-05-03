const express = require('express')
const telaCadastro = require('./cadastro.js')
const app = express()

app.get('/login', (req, res) => {
    res.send(telaCadastro.input)
})
app.listen(3333)