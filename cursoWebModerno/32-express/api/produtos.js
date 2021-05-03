module.exports = (app, text) => {
    function salvar(req, res) {
        res.send('Produto > Salvar' + text)
    }
    function obter(req, res) {
        res.send('Produto > Obter' + text)
    }

    app.post('/produtos', salvar)
    app.get('/produtos', obter)
}