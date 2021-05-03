const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const { encryptPassword } = app.api.encrypt

    const get = async(req, res) => {
        await app.db('professor')
            .select('id','name','cpf', 'email', 'ativo', 'coordenadorId', 'cargoId')
            .then(professores => res.json(professores))
            .catch(err => res.status(500).send(err))

    }
    const save = async(req, res) => {
        const professor = {...req.body}
        if(req.params.id) professor.id = req.params.id

        try {
            existsOrError(professor.name, 'Nome não Informado')
            existsOrError(professor.cpf, 'CPF não Informado')
            existsOrError(professor.email, 'Email não Informado')
            existsOrError(professor.telefone, 'Telefone não informado')
            existsOrError(professor.password, 'Senha não Informado')
            existsOrError(professor.confirmPassword, 'Confirmar senha')
            equalsOrError(professor.password, professor.confirmPassword, 'Senhas não conferem')
            existsOrError(professor.coordenadorId, 'Selecionar coordenador responsavel')



        } catch(msg) {
            return res.status(400).send(msg)
        }
        professor.password = encryptPassword(professor.password)

        const cargoId = await app.db('cargos')
        .select('id')
        .where('name', 'secretario')
        .first()

        if(req.params.id) {
            app.db('professor')
                .update({
                    name: professor.name,
                    cpf: professor.cpf,
                    email: professor.email,
                    telefone: professor.telefone,
                    password: professor.password,
                    coordenadorId: professor.coordenadorId,
                    ativo: professor.ativo,
                    cargoId: cargoId.id
                })
                .where('id', professor.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('professor')
            .insert({
                name: professor.name,
                cpf: professor.cpf,
                email: professor.email,
                telefone: professor.telefone,
                password: professor.password,
                coordenadorId: professor.coordenadorId,
                ativo: professor.ativo,
                cargoId: cargoId.id
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }
    const getAtivos = async(req, res) => {
        await app.db('professor')
        .select('id','name','cpf', 'email', 'telefone', 'ativo', 'coordenadorId', 'cargoId')
        .where('ativo', true)
        .then(professoresA => res.json(professoresA))
        .catch(err => res.status(500).send(err))
    }
    return {get, save, getAtivos}
}