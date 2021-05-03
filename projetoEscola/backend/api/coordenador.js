const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const {encryptPassword} = app.api.encrypt

    const get = async(req, res) => {
        await app.db('coordenador')
            .select('id','name','cpf','telefone', 'email', 'cargoId')
            .then(coordenadores => res.json(coordenadores))
            .catch(err => res.status(500).send(err))

    }
    const save = async(req, res) => {
        const coordenador = {...req.body}
        if(req.params.id) coordenador.id = req.params.id

        try {
            existsOrError(coordenador.name, 'Nome não Informado')
            existsOrError(coordenador.cpf, 'CPF não Informado')
            existsOrError(coordenador.email, 'Email não Informado')
            existsOrError(coordenador.tel, 'Telefone não Informado')
            existsOrError(coordenador.diretorId, 'Informar o diretor responsável')
            existsOrError(coordenador.password, 'Senha não Informado')
            existsOrError(coordenador.confirmPassword, 'Confirmar senha')

            equalsOrError(coordenador.password, coordenador.confirmPassword, 'Senhas não conferem')


        } catch(msg) {
            return res.status(400).send(msg)
        }
        coordenador.password = encryptPassword(coordenador.password)


        const cargoId = await app.db('cargos')
        .select('id')
        .where('name', 'coordenador')
        .first()

        if(req.params.id) {
            app.db('coordenador')
                .update({
                    name: coordenador.name,
                    cpf: coordenador.cpf,
                    telefone: coordenador.tel,
                    email: coordenador.email,
                    password: coordenador.password,
                    diretorId: coordenador.diretorId,
                    cargoId: cargoId.id
                })
                .where('id', coordenador.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('coordenador')
            .insert({
                name: coordenador.name,
                cpf: coordenador.cpf,
                telefone: coordenador.tel,
                email: coordenador.email,
                password: coordenador.password,
                diretorId: coordenador.diretorId,
                cargoId: cargoId.id

            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }
    return {get, save}
}