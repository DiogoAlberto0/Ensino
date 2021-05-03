const { authSecret } = require('../.env')
const passport = require('passport')

const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    // criando um parametro para a estrategia com a chave e o token 
    const params = {
        secretOrKey: authSecret,
        //token : função para prgar o token no header
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    // criando a strategia passando os parametros e uma callback
    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            //onde o id no banco de dados seja igual ao id fo payload
            .where('id', payload.id)
            .first()
            //se usuario existir no banco de dados retorna payload se não FALSE
            .then( user => done(null, user ? {...payload} : false))
            .catch(err => done(err, false))
    })

    
    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}