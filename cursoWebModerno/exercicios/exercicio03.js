function pow2(a, b){
    let resultado
    while(b > 0) {
        b--
        resultado = a * a
    }
    return resultado
}
console.log(pow2(10, 2))