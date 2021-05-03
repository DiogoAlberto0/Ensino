const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    
        const singin =  async (req, res) => {
            if(!req.body.email || !req.body.password) {
                res.status(400).send('Informe usuatio e senha')
            }
            const userFromDb = await app.db(req.params.cargo)
                .where('email', req.body.email)
                .first()
    
            if(!userFromDb) return res.status(400).send('Usuario não encontrado')
    
            const isMath = bcrypt.compareSync(req.body.password, userFromDb.password)
    
            if(!isMath) return res.status(401).send('Senha não confere')
    
            const now = Math.floor(Date.now() / 1000)
    
            const payload = {
                id: userFromDb.id,
                name: userFromDb.name,
                email: userFromDb.email,
                cargoId: userFromDb.cargoId,
                iat: now,
                exp: now + (60 * 60 * 24 * 3)
            }
    
            return res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        }

    return { singin }
}