function getNumeroAleatorio (min, max) {
    const valor = Math.random() * ( max - min ) + min
    return(Math.floor(valor))
}

let numero = 0
do {
    numero = getNumeroAleatorio(0, 10)
    console.log(`O valor escolhido foi o: ${numero}!`)
}while ( numero != 0 ) 
console.log('Ate a próxima!')