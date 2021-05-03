const sequence = {
    _id: 1,
    get id() { return this._id++ }
}

const produtos = {}

function salvarProduto(produto) {
    if (!produto.id) produtos.id = sequence.id
    produtos[produto.id] = produto
    return produtos
}

function getProduto(id) {
    return produtos[id] || {}
}

function getProdutos() {
    return Object.values(produtos)
}

function excluirProdutos(id) {
    const produto = produtos[id]
    delete produto
    return produto
}
module.exports = { salvarProduto, getProduto, getProdutos, excluirProdutos }