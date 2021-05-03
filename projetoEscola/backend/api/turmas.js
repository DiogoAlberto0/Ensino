module.exports = app => {

    const {existsOrError} = app.api.validation

    const save = (req, res) => {
        const classe = {...req.body}
        try {
            existsOrError(classe.serie, 'Informar a série')
            existsOrError(classe.year, 'Informar o ano')
            existsOrError(classe.period, 'Informar o periodo')
            existsOrError(classe.professorId, 'Informar o professor')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        app.db('turmas')
            .insert({
                serie: classe.serie,
                ano: classe.year,
                periodo: classe.period,
                professorId: classe.professorId,
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err.response))
    }

    const get = async(req, res) => {
        await app.db('turmas')
            .select('id', 'serie', 'ano', 'periodo', 'professorId')
            .then(resp => res.json(resp))
            .catch(err => res.status(500).send(err.response))
    }






    return {save, get}
}