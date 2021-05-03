module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const get = async (req, res) => {
        await app.db('cargos')
            .select('id', 'name')
            .then(cargos => res.json(cargos))
            .catch(err => res.status(500).send(err))

    }
    const save = async (req, res) => {
        const cargo = {...req.body}
        try {
            existsOrError(cargo.name, 'Nome não Informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(req.params.id) {
            cargo.id = req.params.id
            await app.db('cargos')
                .update({
                    name: cargo.name
                })
                .where('id', cargo.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('cargos')
            .insert({
                name: cargo.name
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }
    return {get, save}
}