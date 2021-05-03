let dobro = function() {
    return 2 * a
}
dobro = () => {
    return 2 * a
}

dobro = a => 2 * a

console.log(dobro(Math.PI))

let saudacao = function(nome) {
    return 'Olá ' + nome
}
saudacao = (nome) => `Olá ${nome}, seja bem vindo`

ola = _ => 'Ola '

console.log(saudacao('Diogo'))

console.log(ola())