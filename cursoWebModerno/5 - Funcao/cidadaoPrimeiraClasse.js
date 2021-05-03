//Função em JS é First-Class Object (Citizens)
//Higher-order function

//criar de forma literal
function func1() {

}
//armazenar em uma variavel
const func2 = function () {

}
//armazenar em um array
const array = [function(a, b) { return ( a + b ) }, func1, func2]
console.log(array[0](2, 3))

//armazenar em um atributo de objeto
const obj = {}
obj.falar = function (nome) { return `Olá ${nome} é um prazer te conhecer!`}
console.log(obj.falar('Diogo'))

//passar função como parametro
function run(func) {
    func()
}
run(function () { console.log('Executando...')})

//uma função pode retornar/conter uma função
function soma (a, b) {
    return(
        function (c) {
            console.log(a + b + c)
        }
    )
}

soma(4, 6)(1)

const soma2 = soma(4, 6)
soma2(5)