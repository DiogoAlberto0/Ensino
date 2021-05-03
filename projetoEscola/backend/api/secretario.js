const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const {encryptPassword} = app.api.encrypt

    const save = async(req, res) => {
        const secretario = {...req.body}

        if(!secretario.id) secretario.id = req.params.id

        try {
            existsOrError(secretario.name, 'Nome não informado')
            existsOrError(secretario.cpf, 'CPF não informado')
            existsOrError(secretario.telefone, 'Telefone não informado')
            existsOrError(secretario.email, 'Email não informado')
            existsOrError(secretario.password, 'Senha não informado')
            existsOrError(secretario.confirmPassword, 'Conirmar senha')
            equalsOrError(secretario.password, secretario.confirmPassword, 'Senhas não conferem')
            existsOrError(secretario.diretorId, 'Selecionar diretor responsavel')

        } catch (msg) {
            res.status(400).send(msg)

        }

        secretario.password = encryptPassword(secretario.password)
        delete secretario.confirmPassword


        const cargoId = await app.db('cargos')
        .select('id')
        .where('name', 'secretario')
        .first()

        if(!secretario.id) {
            app.db('secretario')
                .insert({
                    name: secretario.name,
                    cpf: secretario.cpf,
                    telefone: secretario.telefone,
                    email: secretario.email,
                    password: secretario.password,
                    diretorId: secretario.diretorId,
                    cargoId: cargoId.id
                })
                .then(_ => res.status(204).send(_))
                .catch(err => res.status(500).send(err))

        } else {
            app.db('secretario')
                .update({
                    id: 1,
                    name: secretario.name,
                    cpf: secretario.cpf,
                    telefone: secretario.telefone,
                    email: secretario.email,
                    password: secretario.password,
                    diretorId: secretario.diretorId,
                    cargoId: cargoId.id
                })
                .where('id', secretario.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }

    const get = async(req, res) => {
        await app.db('secretario')
            .select('id', 'name', 'cpf', 'email', 'diretorId', 'cargoId')
            .then(secretarios => res.json(secretarios))
    }

    return { save, get }
}