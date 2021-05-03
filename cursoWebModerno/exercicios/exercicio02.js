const triangulo = (a, b, c) => {
    const equilatero = (a == b && a == c)
    const isosceles = (a == b || a == c || c == b)
    const escaleno = (a != b && a != c)
    let triangulo = null

    if(equilatero) triangulo = 'Equilatero'
    else if(isosceles) triangulo = 'Isosceles'
    else if(escaleno) triangulo = 'Escaleno'

    console.log(`O triangulo é ${triangulo}`)
}
triangulo(3, 2, 1)
triangulo(3, 2, 2)
triangulo(2, 2, 2)
triangulo(1, 2, 3)
triangulo(2, 2, 3)
