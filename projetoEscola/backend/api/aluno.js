module.exports = app => {

    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const {encryptPassword} = app.api.encrypt

    const get = async (req, res) => {
        await app.db('aluno')
            .select('id', 'name', 'cpfOuCn', 'login', 'tipoSanguineo', 'planoDeSaude', 'hospital', 'buscarI', 'buscarII', 'paiId', 'turmaId', 'cargoId')
            .then(resp => res.json(resp))
            .catch(err => res.status(500).send(resp.data))
    }

    const save = async(req, res) => {
        const aluno = {...req.body}
        try {
            existsOrError(aluno.name, 'Informe o nome.')
            existsOrError(aluno.cpfOuCn, 'Informe o CPF/Certidão de nascimento.')
            existsOrError(aluno.login, 'Informe o login.')
            existsOrError(aluno.tipoSanguineo, 'Informe o tipo sanguineo.')
            existsOrError(aluno.hospital, 'Informe o hospital.')
            existsOrError(aluno.buscarI, 'Informe uma pessoa que possa buscar.')
            existsOrError(aluno.paiId, 'Informe o ID do pai.')
            existsOrError(aluno.turmaID, 'Informe o ID da turma.')
            existsOrError(aluno.password, 'Informe a senha')
            existsOrError(aluno.confirmPassword, 'Confirmar a senha.')

            equalsOrError(aluno.password, aluno.confirmPassowrd, 'Senhas não conferem')
        }
        catch(msg) {
            return res.status(400).send(msg)
        }

        aluno.password = encryptPassword(aluno.password)
        delete aluno.confirmPassowrd
        
        const cargoId = await app.db('cargos')
        .select('id')
        .where('name', 'secretario')
        .first()

        if(req.params.id) {
            app.db('aluno')
                .update({
                    name: aluno.name,
                    cpfOuCn: aluno.cpfOuCn,
                    login: aluno.login, 
                    tipoSanguineo: aluno.tipoSanguineo, 
                    planoDeSaude: aluno.planoDeSaude, 
                    hospital: aluno.hospital, 
                    buscarI: aluno.buscarI, 
                    buscarII: aluno.buscarII || 'buscarI', 
                    paiId: aluno.paiId, 
                    turmaId: aluno.turmaId, 
                    cargoId: cargoId.id,
                    password: aluno.password
                })
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err.response))
        } else {
            app.db('aluno')
                .insert({
                    name: aluno.name,
                    cpfOuCn: aluno.cpfOuCn,
                    login: aluno.login, 
                    tipoSanguineo: aluno.tipoSanguineo, 
                    planoDeSaude: aluno.planoDeSaude, 
                    hospital: aluno.hospital, 
                    buscarI: aluno.buscarI, 
                    buscarII: aluno.buscarII || 'buscarI', 
                    paiId: aluno.paiId, 
                    turmaId: aluno.turmaId, 
                    cargoId: cargoId.id,
                    password: aluno.password 
                })
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err.response))
        }
    }

    const getByTurma = async(req, res) => {
        const turma = {...req.params.turmaid}
        await app.db('alunos')
            .select('id', 'name', 'cpfOuCn', 'login', 'tipoSanguineo', 'planoDeSaude', 'hospital', 'buscarI', 'buscarII', 'paiId', 'turmaId', 'cargoId')
            .where('turmaId', turma)
            .then(resp => res.status(204).send(resp))
            .catch(err => res.status(500).send(err.response))
    }





    return { get, save, getByTurma }
}