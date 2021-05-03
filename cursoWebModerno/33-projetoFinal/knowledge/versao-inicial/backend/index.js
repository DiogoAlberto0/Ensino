// Import do express
const express = require('express')
const app = express()
//Import do consign
const consign = require('consign')
//Import do arquivo db
const db = require('./config/db')


// atribuindo a conexão do knex a variavel db dentro de app
app.db = db

consign()
    .then('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

// iniciando na portea :3000
const port = 3000
app.listen(port, () => {
    console.log('Backend Executando! na porta :', port)
})