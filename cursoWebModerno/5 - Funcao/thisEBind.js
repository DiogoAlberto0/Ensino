const Pessoa = {
    saudacao: ' Bom Dia!!',
    falar(nome) {
        console.log(this.saudacao)
    }
}
Pessoa.falar()

const falar = Pessoa.falar
falar() // conflito entre paradigmas: funcional e OO

const falarDePessoa = Pessoa.falar.bind(Pessoa)
falarDePessoa()