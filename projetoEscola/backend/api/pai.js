module.exports = app => {
    
    const {existsOrError, equalsOrError} = app.api.validation

    const {encryptPassword} = app.api.encrypt
    
    const save = async(req, res) => {
        const pai = {...req.body}
        try {
            existsOrError(pai.name, 'Informar o nome.')
            existsOrError(pai.cpf, 'Informar o cpf.')
            existsOrError(pai.email, 'Informar o email.')
            existsOrError(pai.end, 'Informar o endereço.')
            existsOrError(pai.telI, 'Informar o telefone principal.')
            existsOrError(pai.password, 'Informar a senha.')
            existsOrError(pai.confirmPassword, 'Confirmar a senha.')

            equalsOrError(pai.password, pai.confirmPassword, 'Senhas não conferem')
        }
        catch(msg) {
            return res.status(400).send(msg)
        }

        const cargoId = await app.db('cargos')
            .select('id')
            .where('name', 'pai')
            .first()

        pai.password = encryptPassword(pai.password)
        delete pai.confirmPassword

        if(req.params.id) {
            await app.db('pai')
                .update({
                    name: pai.name,
                    cpf: pai.cpf,
                    email: pai.email,
                    password: pai.password,
                    end: pai.end,
                    endTrab: pai.endTrab || 'autonomo',
                    cargoId: cargoId.id,
                    telI: pai.telI,
                    telII: pai.telII
                })
                .where('id', req.params.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else {
            await app.db('pai')
            .insert({
                name: pai.name,
                cpf: pai.cpf,
                email: pai.email,
                password: pai.password,
                end: pai.end,
                endTrab: pai.endTrab ? pai.endTrab : 'autonomo',
                cargoId: cargoId.id,
                telI: pai.telI,
                telII: pai.telII || pai.telI
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        await app.db('pai')
            .select('id', 'name', 'cpf', 'email', 'end', 'endTrab', 'telI', 'telII')
            .then(resp => res.json(resp))
            .catch(err => res.status(500).send(err))
    }




    return {save, get}
}