const express = require('express')

const routes = express.Router()

routes.post('/hello', (req, res) => {
    return res.json({hello: 'World'})
})

module.exports = routes