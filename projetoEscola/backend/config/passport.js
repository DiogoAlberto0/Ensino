const { authSecret } = require('../.env')

const passport = require('passport')

const passportJwt = require('passport-jwt')

const { Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        const infos = {...payload}
        switch (infos.cargoId) {
            case 1:
                infos.cargoId = 'diretor'
                break
            case 2:
                infos.cargoId = 'coordenador'
                break
            case 3:
                infos.cargoId = 'secretario'
                break
            case 4:
                infos.cargoId = 'professor'
                break
            case 5:
                infos.cargoId = 'aluno'
                break
            case 6:
                infos.cargoId = 'pai'
                break
            case 7:
                infos.cargoId = 'diretor'
        }
        
        app.db(`${infos.cargoId}`)
            .where('id', payload.id)
            .first()
            .then( user => done(null, user ? {...payload} : false))
            .catch(err => done('err', false))
    })

    passport.use(strategy)

    return {authenticate: () => passport.authenticate('jwt', {session:false})}
}