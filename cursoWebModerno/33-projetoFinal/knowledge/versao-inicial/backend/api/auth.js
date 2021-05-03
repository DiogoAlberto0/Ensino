const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    //função para validar usuario e senha e gerar um token unico usado para acessar as apis
    const singin = async (req, res) => {
        // se email ou senha não forem enviado
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuario e senha')
        } else{
            //guardando usuario do email na variavel
            const userFromDb = await app.db('users')
                .where('email', req.body.email)
                .first()

                // se não retornar um usuario
                if(!userFromDb) return res.status(400).send('Usuario não encontrado')
    
                //comparando a senha passada pelo usuario com a senha cryptografada no banco de dados
                const isMath = bcrypt.compareSync(req.body.password, userFromDb.password)
    
                //se não for igual
                if(!isMath) return res.status(401).send('Senha não confere')
    
                //pegando a data atual em milesegundos e transformando pra segundos
                const now = Math.floor(Date.now() / 1000)
    
                // informações usadas para a construção do token
                const payload = {
                    id: userFromDb.id,
                    name: userFromDb.name,
                    email: userFromDb.email,
                    admin: userFromDb.admin,
                    iat: now,
                    exp: now + (60 * 60 * 24 * 3)
                }
    
                return res.json({
                    ...payload,
                    // gerando token apartir do payload e a chave se autenticação do atquivo .env
                    //usando o modulo 'jwt-simole'
                    token: jwt.encode(payload, authSecret)
                })

        }

    }

    // dunção para validar se o token enviado é valido
    const validateToken = async (req, res) => {
        // armazenando os dados enviados pelo usuario no corpo da requisição
        const userData = req.body || null


        try {
            // se o usuario tiver enviado os parametros no corpo
            if(userData) {
                // usando o jwt para decodificar o token enviado pelo usuario
                // e colocando em uma constante
                const token = jwt.decode(userData.token, authSecret)

                //se a data de expiração do token for maior que a data atual
                if(new Date(token.exp * 1000) > new Date()) {
                    // faça:
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send('Acesso negado!')
    }

    return { singin, validateToken}
}