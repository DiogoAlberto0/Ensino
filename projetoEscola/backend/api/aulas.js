module.exports = app => {
    const save = async(req, res) => {

        const { existsOrError } = app.api.validation

        const aula = {...req.body}
        try {
            existsOrError(aula.title, 'Informe um titulo.')
            existsOrError(aula.description, 'Informe uma descrição.')
            existsOrError(aula.videoUrl, 'Informe o link do video')
            existsOrError(aula.turmaId, 'Informe a turma')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(req.params.id) {
            app.db('aulas')
                .update({
                    title: aula.title,
                    description: aula.description,
                    videoUrl: aula.videoUrl,
                    turmaId: aula.turmaId
                })
                .where('id', req.params.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('aulas')
            .insert({
                title: aula.title,
                description: aula.description,
                videoUrl: aula.videoUrl,
                turmaId: aula.turmaId
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const getByTurma = async(req, res) => {
        await app.db('aulas')
            .select()
            .where('turmaId', req.params.turmaId)
            .then(resp => res.json(resp))
            .catch(err => res.status(500).send(err))
    }





    return {save, getByTurma}
}