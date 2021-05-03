const express = require('express')
const consign = require('consign')
const db = require('./config/db')
const app = express()

app.db = db

consign()
    .include('./config/middlewares.js')
    .include('./api/validation.js')
    .include('./api/auth.js')
    .include('./config/passport.js')
    .include('./api/encrypt.js')
    .include('./api/diretora.js')
    .include('./api/coordenador.js')
    .include('./api/secretario.js')
    .include('./api/professor.js')
    .include('./api/cargo.js')
    .include('./api/turmas.js')
    .include('./api/pai.js')
    .include('./api/aulas.js')
    .include('./config/routes.js')
    .into(app)

const port = 3000
app.listen(port, () => {
    console.log(`Backend Executando http://localhost:${port}`)
})