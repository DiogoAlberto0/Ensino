const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const {encryptPassword} = app.api.encrypt
    const get = (req, res) => {
        app.db('diretor')
            .select('id','name','cpf','telefone', 'email', 'cargoId')
            .then(diretores => res.json(diretores))
            .catch(err => res.status(500).send(err))

    }
    const save = async(req, res) => {
        const diretor = {...req.body}
        if(req.params.id) diretor.id = req.params.id

        try {
            existsOrError(diretor.name, 'Nome não Informado')
            existsOrError(diretor.cpf, 'CPF não Informado')
            existsOrError(diretor.email, 'Email não Informado')
            existsOrError(diretor.tel, 'Telefone não Informado')
            existsOrError(diretor.password, 'Senha não Informado')
            existsOrError(diretor.confirmPassword, 'Confirmar senha')

            equalsOrError(diretor.password, diretor.confirmPassword, 'Senhas não conferem')


        } catch(msg) {
            return res.status(400).send(msg)
        }
        diretor.password = encryptPassword(diretor.password)


        const cargoId = await app.db('cargos')
            .select('id')
            .where('name', 'diretor')
            .first()
        if(req.params.id) {
            app.db('diretor')
                .update({
                    name: diretor.name,
                    cpf: diretor.cpf,
                    telefone: diretor.tel,
                    email: diretor.email,
                    password: diretor.password,
                    cargoId: cargoId.id
                })
                .where('id', diretor.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('diretor')
            .insert({
                name: diretor.name,
                cpf: diretor.cpf,
                telefone: diretor.tel,
                email: diretor.email,
                password: diretor.password,
                cargoId: cargoId.id
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }
    return {get, save}
}