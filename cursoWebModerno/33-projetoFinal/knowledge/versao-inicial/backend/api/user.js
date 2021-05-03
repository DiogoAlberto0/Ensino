// import do modulo para criptografia de senhas
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistOrError, equalsOrError } = app.api.validation
    
    // função para encriptografar a senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // função para salvar um novo usuario ou alterar no banco de dados
    const save = async (req, res) => {
        const user = { ...req.body }
        
        if(req.params.id) user.id = req.params.id


        // fazendo as validações das informações enviadas pelo usuario
        try {
            existsOrError(user.name, 'Nome não informado!')
            existsOrError(user.email, 'E-mail não informado!')
            existsOrError(user.password, 'Senha não informada!')
            existsOrError(user.confirmPassword, 'Confirmação de senha invalida!')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem!')

            const userFromDB = await app.db('users').where({email: user.email}).first()

            if(!user.id) {
                notExistOrError(userFromDB, 'Usuario ja cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        // encriptografando a senha enviada pelo usuari
        user.password = encryptPassword(user.password)
        delete confirmPassword

        // se o id tiver no parametro da requisição (alterar usuario)
        if(user.id) {
            // acessando a tabela users do banco de dados
            app.db('users')
                .update({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    admin: user.admin? user.admin : false
                }) //alterando o usuario
                .where({id: user.id}) // onde o email no db é igual ao informado pelo usuario
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } 
        // se o id não tiver nos parametros da requisição (usuario novo)
        else {
            app.db('users')
                //inserindo novo usuario
                .insert({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    admin: user.admin
                }) 
                .then(_ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        }
    }
    const get = (req, res) => {
        //pegando id name email e admin de todos os usuarios
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        // armazenando o id enviado pelo usuario na variavel USER
        const user = {...req.params}
        //selecionando a tabela usuarios
        app.db('users')
            // colunas selecionadas
            .select('id', 'name', 'email', 'admin')
            //onde o id da tabela seja igual ao enviado pelo usuario
            .where({id: user.id})
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }
    const countUsers = (req, res) => {
        app.db('users')
            .count('id')
            .then(users => res.json(users))
            .catch(err => res.status(500).send('errou' + err) )
    }
    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where('userId', req.params.id)
            notExistOrError(articles, 'Usuário tem artigos.')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        await app.db('users')
            .update({
                deletedAt: new Date()
            })
            .where('id', req.params.id)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }
    return { save, get, getById, countUsers, remove }
}